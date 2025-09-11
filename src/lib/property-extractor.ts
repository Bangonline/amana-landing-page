/**
 * Production __NEXT_DATA__ Property Extractor for Amana Living
 * 
 * This extractor pulls property data directly from the __NEXT_DATA__ JSON
 * embedded in Amana Living's Next.js pages, ensuring we get the exact same
 * data that powers their property listings.
 */

import { 
  Property, 
  PropertyImage, 
  PropertyFeature, 
  PropertyStatus, 
  PropertyType, 
  VillageSlug, 
  RawPropertyData,
  NextDataUrqlEntry,
  PropertySyncResult,
  PropertySyncError 
} from '@/types/property';

export class AmanaPropertyExtractor {
  private static readonly VILLAGE_CONFIG = {
    moline: {
      slug: 'moline-village',
      url: 'https://www.amanaliving.com.au/retirement-villages/locations/moline-village',
      displayName: 'Moline Village'
    },
    riverside: {
      slug: 'collier-park', 
      url: 'https://www.amanaliving.com.au/retirement-villages/locations/collier-park',
      displayName: 'Collier Park'
    }
  } as const;

  private static readonly REQUEST_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-AU,en;q=0.9,en-US;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  };

  /**
   * Extract properties from all villages
   */
  static async extractAllProperties(): Promise<PropertySyncResult | PropertySyncError> {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();
    const allProperties: Property[] = [];
    const errors: string[] = [];

    try {
      console.log('🏡 Starting property extraction from all villages...');

      for (const [villageKey, config] of Object.entries(this.VILLAGE_CONFIG)) {
        try {
          console.log(`📍 Extracting from ${config.displayName}...`);
          const villageProperties = await this.extractVillageProperties(villageKey as VillageSlug);
          allProperties.push(...villageProperties);
          console.log(`✅ Found ${villageProperties.length} properties in ${config.displayName}`);
        } catch (error) {
          const errorMsg = `Failed to extract from ${config.displayName}: ${error instanceof Error ? error.message : 'Unknown error'}`;
          console.error(`❌ ${errorMsg}`);
          errors.push(errorMsg);
        }
      }

      const duration = Date.now() - startTime;
      console.log(`🎉 Extraction completed in ${duration}ms. Total properties: ${allProperties.length}`);

      return {
        success: true,
        count: allProperties.length,
        properties: allProperties,
        villages: Object.keys(this.VILLAGE_CONFIG) as VillageSlug[],
        timestamp,
        errors: errors.length > 0 ? errors : undefined
      };

    } catch (error) {
      console.error('💥 Critical error during property extraction:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown extraction error',
        timestamp
      };
    }
  }

  /**
   * Extract properties from a specific village
   */
  static async extractVillageProperties(village: VillageSlug): Promise<Property[]> {
    const config = this.VILLAGE_CONFIG[village];
    if (!config) {
      throw new Error(`Unknown village: ${village}`);
    }

    try {
      // Fetch the village page
      console.log(`🌐 Fetching ${config.url}...`);
      const response = await fetch(config.url, {
        headers: this.REQUEST_HEADERS,
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText} for ${config.url}`);
      }

      const html = await response.text();
      console.log(`📄 Retrieved ${Math.round(html.length / 1024)}KB of HTML`);

      // Extract and parse __NEXT_DATA__
      const nextData = this.extractNextData(html);
      console.log(`📊 Found __NEXT_DATA__ with ${Math.round(JSON.stringify(nextData).length / 1024)}KB of data`);

      // Extract properties from the structured data and HTML
      const properties = this.parsePropertiesFromNextData(nextData, village, config.url, html);
      console.log(`🏠 Parsed ${properties.length} properties from ${config.displayName}`);

      return properties;

    } catch (error) {
      console.error(`💥 Error extracting from ${config.displayName}:`, error);
      throw error;
    }
  }

  /**
   * Extract __NEXT_DATA__ from HTML
   */
  private static extractNextData(html: string): any {
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
    
    if (!nextDataMatch || !nextDataMatch[1]) {
      throw new Error('Could not find __NEXT_DATA__ script in HTML');
    }

    try {
      return JSON.parse(nextDataMatch[1]);
    } catch (error) {
      throw new Error(`Failed to parse __NEXT_DATA__ JSON: ${error instanceof Error ? error.message : 'Parse error'}`);
    }
  }

  /**
   * Parse properties from both __NEXT_DATA__ structure and HTML content
   */
  private static parsePropertiesFromNextData(nextData: any, village: VillageSlug, sourceUrl: string, html?: string): Property[] {
    let properties: Property[] = [];

    try {
      // First try to get properties from urqlState (GraphQL cache)
      const urqlState = nextData?.props?.urqlState;
      if (urqlState) {
        console.log('🔍 Searching in urqlState...');
        properties = this.extractFromUrqlState(urqlState, village, sourceUrl);
      }

      // If no properties found in urqlState, try to parse from HTML
      if (properties.length === 0 && html) {
        console.log('🔍 No properties found in urqlState, parsing from HTML...');
        properties = this.parsePropertiesFromHTML(html, village, sourceUrl);
      }

      console.log(`✨ Final result: found ${properties.length} properties`);
      return properties;

    } catch (error) {
      console.error('💥 Error parsing properties:', error);
      throw new Error(`Failed to parse properties: ${error instanceof Error ? error.message : 'Parse error'}`);
    }
  }

  /**
   * Extract properties from urqlState
   */
  private static extractFromUrqlState(urqlState: Record<string, any>, village: VillageSlug, sourceUrl: string): Property[] {
    const properties: Property[] = [];

    // Find the largest cache entry (contains all the data)
    const entries = Object.entries(urqlState);
    if (entries.length === 0) {
      console.warn('⚠️ No urql cache entries found');
      return properties;
    }

    const largestEntry = entries.reduce((prev, curr) => {
      const prevSize = JSON.stringify(prev[1]).length;
      const currSize = JSON.stringify(curr[1]).length;
      return currSize > prevSize ? curr : prev;
    });

    console.log(`🔍 Using urql cache entry ${largestEntry[0]} (${Math.round(JSON.stringify(largestEntry[1]).length / 1024)}KB)`);

    const cacheData = largestEntry[1] as NextDataUrqlEntry;
    if (!cacheData.data) {
      console.warn('⚠️ No data in largest urql cache entry');
      return properties;
    }

    // Check if the data is stored as character strings that need reconstruction
    const dataEntries = Object.entries(cacheData.data);
    const isCharacterArray = dataEntries.length > 100 && 
                            dataEntries.every(([key, value]: [string, any]) => 
                              typeof key === 'string' && 
                              /^\d+$/.test(key) && 
                              typeof value === 'string' && 
                              value.length <= 2
                            );

    if (isCharacterArray) {
      console.log(`🧩 Detected character array format with ${dataEntries.length} entries. Reconstructing JSON...`);
      
      // Sort by numeric key and reconstruct the JSON string
      const sortedEntries = dataEntries.sort(([a], [b]) => parseInt(a) - parseInt(b));
      const reconstructedJson = sortedEntries.map(([, value]) => value).join('');
      
      try {
        const parsedData = JSON.parse(reconstructedJson);
        console.log(`✅ Successfully reconstructed ${Math.round(reconstructedJson.length / 1024)}KB JSON`);
        
        // Now search through the reconstructed data for properties
        return this.findPropertiesInReconstructedData(parsedData, village, sourceUrl);
        
      } catch (error) {
        console.error('❌ Failed to parse reconstructed JSON:', error);
        console.log(`📋 First 200 chars: ${reconstructedJson.substring(0, 200)}...`);
        return properties;
      }
    } else {
      // Original logic for when data is already properly structured
      let propertyCount = 0;
      let checkedEntries = 0;
      
      for (const [key, item] of Object.entries(cacheData.data)) {
        checkedEntries++;
        
        if (this.looksLikeProperty(item)) {
          try {
            const property = this.parsePropertyFromRawData(item, village, sourceUrl);
            if (property) {
              properties.push(property);
              propertyCount++;
            }
          } catch (error) {
            console.warn(`⚠️ Failed to parse property from entry ${key}:`, error);
          }
        }

        // Log progress every 100 entries
        if (checkedEntries % 100 === 0) {
          console.log(`🔄 Checked ${checkedEntries} entries, found ${propertyCount} properties so far...`);
        }
      }

      console.log(`✨ urqlState result: found ${propertyCount} properties from ${checkedEntries} entries`);
      return properties;
    }
  }

  /**
   * Parse properties directly from HTML content
   */
  private static parsePropertiesFromHTML(html: string, village: VillageSlug, sourceUrl: string): Property[] {
    const properties: Property[] = [];

    try {
      // Look for property cards in the HTML
      const cardPattern = /<div class="styles_cardItem__[^"]*"[^>]*>(.*?)<\/div><\/div><\/div>/gs;
      const matches = html.match(cardPattern) || [];

      console.log(`🔍 Found ${matches.length} potential property cards in HTML`);

      for (let i = 0; i < matches.length; i++) {
        const cardHtml = matches[i];
        
        try {
          const property = this.parsePropertyFromCardHTML(cardHtml, village, sourceUrl);
          if (property) {
            properties.push(property);
            console.log(`✅ Parsed property: ${property.title} - ${property.priceDisplay}`);
          }
        } catch (error) {
          console.warn(`⚠️ Failed to parse property card ${i + 1}:`, error);
        }
      }

      return properties;
    } catch (error) {
      console.error('💥 Error parsing properties from HTML:', error);
      return properties;
    }
  }

  /**
   * Parse a single property from HTML card content
   */
  private static parsePropertyFromCardHTML(cardHtml: string, village: VillageSlug, sourceUrl: string): Property | null {
    try {
      // Extract title
      const titleMatch = cardHtml.match(/<h3><a[^>]*>([^<]+)<\/a><\/h3>/);
      const title = titleMatch ? titleMatch[1].trim() : '';

      // Extract price
      const priceMatch = cardHtml.match(/<span class="styles_price__[^"]*">([^<]+)<\/span>/);
      const priceDisplay = priceMatch ? priceMatch[1].trim() : '';

      // Extract bedrooms, bathrooms, car spaces from property icons
      const bedroomsMatch = cardHtml.match(/<span>(\d+)<\/span>\s*<svg[^>]*viewBox="0 0 22 17"[^>]*>.*?icon - bed/s);
      const bathroomsMatch = cardHtml.match(/<span>(\d+)<\/span>\s*<svg[^>]*viewBox="0 0 25 21"[^>]*>.*?icon - bathtub/s);
      const carSpacesMatch = cardHtml.match(/<span>(\d+)<\/span>\s*<svg[^>]*viewBox="0 0 30 22"[^>]*>.*?car/s);

      const bedrooms = bedroomsMatch ? parseInt(bedroomsMatch[1]) : 0;
      const bathrooms = bathroomsMatch ? parseInt(bathroomsMatch[1]) : 0;
      const carSpaces = carSpacesMatch ? parseInt(carSpacesMatch[1]) : 0;

      // Extract URL for more details
      const urlMatch = cardHtml.match(/<a[^>]*href="([^"]*)"[^>]*>/);
      const propertyUrl = urlMatch ? urlMatch[1] : '';

      // Extract image
      const imageMatch = cardHtml.match(/<img[^>]*src="([^"]*)"[^>]*>/);
      const imageUrl = imageMatch ? imageMatch[1] : '';

      if (!title || !priceDisplay) {
        return null;
      }

      // Parse price to numeric value
      const priceNumeric = this.parsePrice(priceDisplay);

      // Determine property type
      const propertyType = this.determinePropertyType(title, { title });

      // Determine status from title or other indicators
      const status = title.toLowerCase().includes('sold') ? 'sold' : 'available';

      // Extract property number
      const propertyNumber = this.extractPropertyNumber(title) || title.replace(/[^\w\s]/g, '').trim();

      // Create unique ID
      const id = this.createPropertyId(village, title, priceNumeric);

      const property: Property = {
        id,
        propertyNumber,
        village,
        type: propertyType,
        bedrooms,
        bathrooms,
        carSpaces,
        price: priceNumeric,
        priceDisplay,
        status,
        title,
        description: title, // Use title as description for now
        images: imageUrl ? [{
          url: imageUrl,
          isPrimary: true,
          alt: title
        }] : [],
        features: [],
        lastUpdated: new Date().toISOString(),
        sourceUrl: propertyUrl ? `${sourceUrl.split('/').slice(0, 3).join('/')}${propertyUrl}` : sourceUrl,
        detailsUrl: propertyUrl ? `https://www.amanaliving.com.au${propertyUrl}` : this.VILLAGE_CONFIG[village].url,
        packageUrl: propertyUrl ? `https://www.amanaliving.com.au${propertyUrl}` : this.VILLAGE_CONFIG[village].url
      };

      return property;

    } catch (error) {
      console.warn('⚠️ Error parsing property from card HTML:', error);
      return null;
    }
  }

  /**
   * Find properties in reconstructed data from character array
   */
  private static findPropertiesInReconstructedData(data: any, village: VillageSlug, sourceUrl: string): Property[] {
    const properties: Property[] = [];
    
    try {
      console.log(`🔍 Searching for properties in reconstructed data structure...`);
      
      // Recursively search through the data structure
      const searchForProperties = (obj: any, path = '', depth = 0): void => {
        if (depth > 10) return; // Prevent infinite recursion
        
        if (!obj || typeof obj !== 'object') return;
        
        if (Array.isArray(obj)) {
          obj.forEach((item, index) => {
            searchForProperties(item, `${path}[${index}]`, depth + 1);
          });
        } else {
          // Check if current object looks like a property
          if (this.looksLikeProperty(obj)) {
            try {
              const property = this.parsePropertyFromRawData(obj, village, sourceUrl);
              if (property) {
                properties.push(property);
                console.log(`🏠 Found property: ${property.title} at ${path}`);
              }
            } catch (error) {
              console.warn(`⚠️ Failed to parse property at ${path}:`, error);
            }
          }
          
          // Recursively search nested objects
          for (const [key, value] of Object.entries(obj)) {
            searchForProperties(value, path ? `${path}.${key}` : key, depth + 1);
          }
        }
      };
      
      searchForProperties(data);
      
      console.log(`✅ Found ${properties.length} properties in reconstructed data`);
      return properties;
      
    } catch (error) {
      console.error('💥 Error searching reconstructed data:', error);
      return properties;
    }
  }

  /**
   * Determine if an object looks like property data
   */
  private static looksLikeProperty(item: any): boolean {
    if (!item || typeof item !== 'object') return false;

    const itemStr = JSON.stringify(item).toLowerCase();
    
    // Must contain property-related keywords
    const hasPropertyKeywords = (
      itemStr.includes('apartment') || 
      itemStr.includes('villa') || 
      itemStr.includes('bedroom') || 
      itemStr.includes('bathroom') ||
      itemStr.includes('property')
    );

    // Must contain pricing information
    const hasPricing = (
      itemStr.includes('price') ||
      itemStr.includes('cost') ||
      itemStr.includes('$') ||
      itemStr.includes('dollar')
    );

    // Must contain status information
    const hasStatus = (
      itemStr.includes('sold') ||
      itemStr.includes('available') ||
      itemStr.includes('reserved') ||
      itemStr.includes('status')
    );

    // Should have reasonable complexity (not just a simple string/number)
    const hasComplexity = Object.keys(item).length >= 3;

    return hasPropertyKeywords && (hasPricing || hasStatus) && hasComplexity;
  }

  /**
   * Parse a raw data object into a Property
   */
  private static parsePropertyFromRawData(data: RawPropertyData, village: VillageSlug, sourceUrl: string): Property | null {
    try {
      // Extract basic information using flexible key matching
      const title = this.extractValue(data, ['title', 'name', 'heading', 'propertyName', 'displayName']) || '';
      const price = this.extractValue(data, ['price', 'cost', 'amount', 'value']) || '';
      const description = this.extractValue(data, ['description', 'desc', 'content', 'text', 'summary']) || '';

      // If no title or price, this probably isn't a valid property
      if (!title || !price) return null;

      // Extract numeric values
      const bedrooms = this.extractNumber(data, ['bedroom', 'bed', 'beds', 'bedrooms']) || 0;
      const bathrooms = this.extractNumber(data, ['bathroom', 'bath', 'baths', 'bathrooms']) || 0;
      const carSpaces = this.extractNumber(data, ['car', 'parking', 'garage', 'carSpaces', 'parkingSpaces']) || 0;

      // Extract and parse pricing
      const priceNumeric = this.parsePrice(price);
      const priceDisplay = typeof price === 'string' ? price : `$${priceNumeric.toLocaleString()}`;

      // Determine property type
      const propertyType = this.determinePropertyType(title, data);

      // Determine status
      const status = this.determineStatus(data);
      const statusMessage = this.extractValue(data, ['statusMessage', 'message', 'badge', 'label']);

      // Extract images
      const images = this.extractImages(data);

      // Extract features
      const features = this.extractFeatures(data);

      // Extract URL for property details
      const propertyUrl = this.extractValue(data, ['url', 'href', 'link', 'detailsUrl', 'propertyUrl']);

      // Create unique ID
      const id = this.createPropertyId(village, title, priceNumeric);

      // Extract property number (Apartment 308 -> "308")
      const propertyNumber = this.extractPropertyNumber(title) || title;

      const property: Property = {
        id,
        propertyNumber,
        village,
        type: propertyType,
        bedrooms,
        bathrooms,
        carSpaces,
        price: priceNumeric,
        priceDisplay,
        status,
        statusMessage: statusMessage || undefined,
        title,
        description,
        images,
        features,
        lastUpdated: new Date().toISOString(),
        sourceUrl,
        detailsUrl: propertyUrl ? `https://www.amanaliving.com.au${propertyUrl}` : this.VILLAGE_CONFIG[village].url,
        packageUrl: propertyUrl ? `https://www.amanaliving.com.au${propertyUrl}` : this.VILLAGE_CONFIG[village].url
      };

      return property;

    } catch (error) {
      console.warn('⚠️ Error parsing property data:', error);
      return null;
    }
  }

  /**
   * Helper methods for data extraction
   */
  private static extractValue(data: any, keys: string[]): string | null {
    return this.findByKeys(data, keys, (value) => 
      typeof value === 'string' ? value.trim() : null
    );
  }

  private static extractNumber(data: any, keys: string[]): number | null {
    return this.findByKeys(data, keys, (value) => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const num = parseInt(value.replace(/\D/g, ''));
        return isNaN(num) ? null : num;
      }
      return null;
    });
  }

  private static findByKeys<T>(data: any, keys: string[], transform: (value: any) => T | null): T | null {
    if (!data || typeof data !== 'object') return null;

    // Direct key matching
    for (const key of keys) {
      for (const [dataKey, value] of Object.entries(data)) {
        if (dataKey.toLowerCase().includes(key.toLowerCase())) {
          const result = transform(value);
          if (result !== null) return result;
        }
      }
    }

    // Recursive search in nested objects
    for (const value of Object.values(data)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const result = this.findByKeys(value, keys, transform);
        if (result !== null) return result;
      }
    }

    return null;
  }

  private static parsePrice(priceStr: string | number): number {
    if (typeof priceStr === 'number') return priceStr;
    if (typeof priceStr === 'string') {
      const cleaned = priceStr.replace(/[^\d]/g, '');
      return parseInt(cleaned) || 0;
    }
    return 0;
  }

  private static determinePropertyType(title: string, data: any): PropertyType {
    const titleLower = title.toLowerCase();
    const dataStr = JSON.stringify(data).toLowerCase();
    
    if (titleLower.includes('villa') || dataStr.includes('villa')) return 'villa';
    if (titleLower.includes('townhouse') || dataStr.includes('townhouse')) return 'townhouse';
    if (titleLower.includes('studio') || dataStr.includes('studio')) return 'studio';
    return 'apartment'; // Default
  }

  private static determineStatus(data: any): PropertyStatus {
    const dataStr = JSON.stringify(data).toLowerCase();
    
    if (dataStr.includes('sold')) return 'sold';
    if (dataStr.includes('reserved')) return 'reserved';
    if (dataStr.includes('under contract') || dataStr.includes('undercontract')) return 'under-contract';
    if (dataStr.includes('coming soon') || dataStr.includes('comingsoon')) return 'coming-soon';
    
    return 'available'; // Default
  }

  private static extractImages(data: any): PropertyImage[] {
    const images: PropertyImage[] = [];
    
    const findImages = (obj: any, depth = 0): void => {
      if (depth > 5 || !obj || typeof obj !== 'object') return;
      
      if (Array.isArray(obj)) {
        obj.forEach(item => findImages(item, depth + 1));
      } else {
        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === 'string' && this.isImageUrl(value)) {
            images.push({
              url: value,
              isPrimary: images.length === 0,
              alt: `Property image ${images.length + 1}`
            });
          } else if (value && typeof value === 'object') {
            findImages(value, depth + 1);
          }
        }
      }
    };

    findImages(data);
    return images;
  }

  private static isImageUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
    const urlLower = url.toLowerCase();
    
    return imageExtensions.some(ext => urlLower.includes(ext)) ||
           urlLower.includes('image') ||
           urlLower.includes('photo') ||
           urlLower.includes('picture');
  }

  private static extractFeatures(data: any): PropertyFeature[] {
    // This could be enhanced based on actual data structure
    const features: PropertyFeature[] = [];
    
    // Look for common feature keywords
    const dataStr = JSON.stringify(data).toLowerCase();
    const commonFeatures = [
      { keyword: 'balcony', name: 'Balcony', icon: '🏞️' },
      { keyword: 'garden', name: 'Garden', icon: '🌿' },
      { keyword: 'garage', name: 'Garage', icon: '🚗' },
      { keyword: 'renovated', name: 'Recently Renovated', icon: '🔨' },
      { keyword: 'view', name: 'Great Views', icon: '👁️' },
      { keyword: 'air conditioning', name: 'Air Conditioning', icon: '❄️' }
    ];

    for (const feature of commonFeatures) {
      if (dataStr.includes(feature.keyword)) {
        features.push({
          name: feature.name,
          icon: feature.icon
        });
      }
    }

    return features;
  }

  private static extractPropertyNumber(title: string): string | null {
    // Extract apartment/villa number from title (e.g., "Apartment 308" -> "308")
    const match = title.match(/(?:apartment|apt|villa|unit)\s*(\d+)/i);
    return match ? match[1] : null;
  }

  private static createPropertyId(village: VillageSlug, title: string, price: number): string {
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    return `${village}-${slug}-${price}`;
  }
}

export default AmanaPropertyExtractor;