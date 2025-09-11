/**
 * Property extractor using __NEXT_DATA__ from Amana Living website
 * This is much more reliable than HTML scraping as it uses the actual data
 * that Next.js uses to render the page.
 */

export interface ScrapedProperty {
  id: string;
  title: string;
  price: string;
  priceNumeric: number;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  description: string;
  status: 'available' | 'sold' | 'reserved';
  images: Array<{
    url: string;
    alt?: string;
    isPrimary?: boolean;
  }>;
  village: string;
  propertyType: 'apartment' | 'villa';
  features?: string[];
  lastUpdated: string;
}

interface NextDataStructure {
  props: {
    urqlState?: Record<string, any>;
    store?: any;
    initialMobxState?: any;
    [key: string]: any;
  };
  query: { uid: string };
  buildId: string;
}

export class PropertyExtractor {
  private static readonly VILLAGE_URLS = {
    'moline': 'https://www.amanaliving.com.au/retirement-villages/locations/moline-village',
    'riverside': 'https://www.amanaliving.com.au/retirement-villages/locations/riverside-village'
  };

  /**
   * Extract properties from a specific village
   */
  static async extractVillageProperties(village: 'moline' | 'riverside'): Promise<ScrapedProperty[]> {
    const url = this.VILLAGE_URLS[village];
    if (!url) throw new Error(`Unknown village: ${village}`);

    try {
      console.log(`Fetching data for ${village} village...`);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      return this.extractPropertiesFromHtml(html, village);
    } catch (error) {
      console.error(`Error extracting properties from ${village}:`, error);
      throw error;
    }
  }

  /**
   * Extract all properties from both villages
   */
  static async extractAllProperties(): Promise<ScrapedProperty[]> {
    const [molineProperties, riversideProperties] = await Promise.allSettled([
      this.extractVillageProperties('moline'),
      this.extractVillageProperties('riverside')
    ]);

    const properties: ScrapedProperty[] = [];

    if (molineProperties.status === 'fulfilled') {
      properties.push(...molineProperties.value);
    } else {
      console.error('Failed to extract Moline properties:', molineProperties.reason);
    }

    if (riversideProperties.status === 'fulfilled') {
      properties.push(...riversideProperties.value);
    } else {
      console.error('Failed to extract Riverside properties:', riversideProperties.reason);
    }

    return properties;
  }

  /**
   * Extract __NEXT_DATA__ from HTML and parse properties
   */
  private static extractPropertiesFromHtml(html: string, village: string): ScrapedProperty[] {
    // Extract __NEXT_DATA__ script
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
    
    if (!nextDataMatch) {
      throw new Error('Could not find __NEXT_DATA__ in page HTML');
    }

    try {
      const nextData: NextDataStructure = JSON.parse(nextDataMatch[1]);
      console.log(`Found __NEXT_DATA__ for ${village}, size: ${nextDataMatch[1].length} chars`);
      
      return this.parsePropertiesFromNextData(nextData, village);
    } catch (error) {
      console.error('Failed to parse __NEXT_DATA__:', error);
      throw new Error('Invalid JSON in __NEXT_DATA__');
    }
  }

  /**
   * Parse properties from the extracted Next.js data
   */
  private static parsePropertiesFromNextData(nextData: NextDataStructure, village: string): ScrapedProperty[] {
    const properties: ScrapedProperty[] = [];

    // Check urqlState (GraphQL cache) first
    if (nextData.props?.urqlState) {
      properties.push(...this.extractFromUrqlState(nextData.props.urqlState, village));
    }

    // Check store data
    if (nextData.props?.store) {
      properties.push(...this.extractFromStore(nextData.props.store, village));
    }

    // Check initialMobxState
    if (nextData.props?.initialMobxState) {
      properties.push(...this.extractFromMobxState(nextData.props.initialMobxState, village));
    }

    console.log(`Extracted ${properties.length} properties from ${village}`);
    return this.deduplicateProperties(properties);
  }

  /**
   * Extract properties from urqlState (GraphQL cache)
   */
  private static extractFromUrqlState(urqlState: Record<string, any>, village: string): ScrapedProperty[] {
    const properties: ScrapedProperty[] = [];

    for (const [key, cacheEntry] of Object.entries(urqlState)) {
      if (!cacheEntry?.data) continue;

      try {
        const extractedProps = this.searchForPropertyData(cacheEntry.data, village);
        properties.push(...extractedProps);
      } catch (error) {
        // Continue with other cache entries if one fails
        console.warn(`Failed to extract from urql cache entry ${key}:`, error);
      }
    }

    return properties;
  }

  /**
   * Extract properties from store data
   */
  private static extractFromStore(store: any, village: string): ScrapedProperty[] {
    if (!store || typeof store !== 'object') return [];
    
    try {
      return this.searchForPropertyData(store, village);
    } catch (error) {
      console.warn('Failed to extract from store:', error);
      return [];
    }
  }

  /**
   * Extract properties from MobX state
   */
  private static extractFromMobxState(mobxState: any, village: string): ScrapedProperty[] {
    if (!mobxState || typeof mobxState !== 'object') return [];
    
    try {
      return this.searchForPropertyData(mobxState, village);
    } catch (error) {
      console.warn('Failed to extract from MobX state:', error);
      return [];
    }
  }

  /**
   * Recursively search for property data in any object structure
   */
  private static searchForPropertyData(data: any, village: string, depth = 0): ScrapedProperty[] {
    if (depth > 10) return []; // Prevent infinite recursion
    if (!data || typeof data !== 'object') return [];

    const properties: ScrapedProperty[] = [];

    // Look for array of properties
    if (Array.isArray(data)) {
      for (const item of data) {
        if (this.looksLikeProperty(item)) {
          const property = this.parseProperty(item, village);
          if (property) properties.push(property);
        } else {
          properties.push(...this.searchForPropertyData(item, village, depth + 1));
        }
      }
    } 
    // Look for object containing properties
    else {
      for (const [key, value] of Object.entries(data)) {
        // Check if this looks like a property object
        if (this.looksLikeProperty(value)) {
          const property = this.parseProperty(value, village);
          if (property) properties.push(property);
        }
        // Check if key suggests property data
        else if (this.isPropertyKey(key) && Array.isArray(value)) {
          for (const item of value) {
            if (this.looksLikeProperty(item)) {
              const property = this.parseProperty(item, village);
              if (property) properties.push(property);
            }
          }
        }
        // Recurse into nested objects
        else if (value && typeof value === 'object') {
          properties.push(...this.searchForPropertyData(value, village, depth + 1));
        }
      }
    }

    return properties;
  }

  /**
   * Check if an object looks like a property
   */
  private static looksLikeProperty(obj: any): boolean {
    if (!obj || typeof obj !== 'object') return false;

    const objStr = JSON.stringify(obj).toLowerCase();
    const hasPropertyIndicators = (
      objStr.includes('apartment') || 
      objStr.includes('villa') || 
      objStr.includes('bedroom') || 
      objStr.includes('bathroom') ||
      objStr.includes('price') ||
      objStr.includes('sold') ||
      objStr.includes('available')
    );

    // Must have some property indicators and some structure
    return hasPropertyIndicators && Object.keys(obj).length > 2;
  }

  /**
   * Check if a key suggests property data
   */
  private static isPropertyKey(key: string): boolean {
    const lowerKey = key.toLowerCase();
    return (
      lowerKey.includes('property') ||
      lowerKey.includes('listing') ||
      lowerKey.includes('unit') ||
      lowerKey.includes('apartment') ||
      lowerKey.includes('villa') ||
      lowerKey.includes('available')
    );
  }

  /**
   * Parse a property object into our standard format
   */
  private static parseProperty(data: any, village: string): ScrapedProperty | null {
    try {
      // Extract basic info - this will need to be adapted based on actual data structure
      const title = this.extractText(data, ['title', 'name', 'heading', 'propertyName']);
      const price = this.extractText(data, ['price', 'cost', 'amount']);
      const description = this.extractText(data, ['description', 'desc', 'content', 'text']);
      
      // Extract numbers
      const bedrooms = this.extractNumber(data, ['bedroom', 'bed', 'beds']);
      const bathrooms = this.extractNumber(data, ['bathroom', 'bath', 'baths']);
      const carSpaces = this.extractNumber(data, ['car', 'parking', 'garage']);
      
      // Extract status
      const status = this.extractStatus(data);
      
      // Extract images
      const images = this.extractImages(data);

      if (!title || !price) return null; // Must have at least title and price

      // Create property ID
      const id = `${village}-${this.createSlug(title)}`;

      return {
        id,
        title,
        price,
        priceNumeric: this.parsePrice(price),
        bedrooms: bedrooms || 0,
        bathrooms: bathrooms || 0,
        carSpaces: carSpaces || 0,
        description: description || '',
        status,
        images,
        village,
        propertyType: title.toLowerCase().includes('villa') ? 'villa' : 'apartment',
        features: this.extractFeatures(data),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.warn('Failed to parse property:', error);
      return null;
    }
  }

  /**
   * Helper methods for data extraction
   */
  private static extractText(data: any, keys: string[]): string | null {
    for (const key of keys) {
      const value = this.findValueByKey(data, key);
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
    return null;
  }

  private static extractNumber(data: any, keys: string[]): number | null {
    for (const key of keys) {
      const value = this.findValueByKey(data, key);
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const num = parseInt(value);
        if (!isNaN(num)) return num;
      }
    }
    return null;
  }

  private static extractStatus(data: any): 'available' | 'sold' | 'reserved' {
    const statusText = JSON.stringify(data).toLowerCase();
    if (statusText.includes('sold')) return 'sold';
    if (statusText.includes('reserved')) return 'reserved';
    return 'available';
  }

  private static extractImages(data: any): Array<{ url: string; alt?: string; isPrimary?: boolean }> {
    const images: Array<{ url: string; alt?: string; isPrimary?: boolean }> = [];
    
    // Recursive search for image URLs
    const findImages = (obj: any): void => {
      if (!obj || typeof obj !== 'object') return;
      
      if (Array.isArray(obj)) {
        obj.forEach(findImages);
      } else {
        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === 'string' && (value.includes('.jpg') || value.includes('.png') || value.includes('.webp'))) {
            images.push({ url: value, isPrimary: images.length === 0 });
          } else if (value && typeof value === 'object') {
            findImages(value);
          }
        }
      }
    };

    findImages(data);
    return images;
  }

  private static extractFeatures(data: any): string[] {
    // This would need to be customized based on actual data structure
    return [];
  }

  private static findValueByKey(obj: any, searchKey: string): any {
    if (!obj || typeof obj !== 'object') return null;
    
    // Direct key match
    for (const [key, value] of Object.entries(obj)) {
      if (key.toLowerCase().includes(searchKey.toLowerCase())) {
        return value;
      }
    }
    
    // Recursive search
    for (const value of Object.values(obj)) {
      if (value && typeof value === 'object') {
        const result = this.findValueByKey(value, searchKey);
        if (result !== null) return result;
      }
    }
    
    return null;
  }

  private static parsePrice(priceStr: string): number {
    const numStr = priceStr.replace(/[^0-9]/g, '');
    return parseInt(numStr) || 0;
  }

  private static createSlug(text: string): string {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private static deduplicateProperties(properties: ScrapedProperty[]): ScrapedProperty[] {
    const seen = new Set<string>();
    return properties.filter(property => {
      const key = `${property.village}-${property.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

// Export default function for easy imports
export default PropertyExtractor;