/**
 * Enhanced property types for dynamic property feed from Amana Living main site
 */

export interface PropertyImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
  width?: number;
  height?: number;
}

export interface PropertyFeature {
  name: string;
  icon?: string;
  description?: string;
}

export interface PropertyContact {
  name?: string;
  phone?: string;
  email?: string;
}

export type PropertyStatus = 'available' | 'sold' | 'reserved' | 'coming-soon' | 'under-contract';
export type PropertyType = 'apartment' | 'villa' | 'townhouse' | 'studio';
export type VillageSlug = 'moline' | 'riverside';

export interface Property {
  // Core identifiers
  id: string;                    // Unique identifier (e.g., "moline-apt-308")
  propertyNumber: string;        // Display name (e.g., "Apartment 308")
  village: VillageSlug;          // Village identifier
  
  // Property details
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  floorArea?: number;           // Square meters
  
  // Pricing & availability
  price: number;                // Numeric value for calculations
  priceDisplay: string;         // Formatted display string (e.g., "$360,000")
  status: PropertyStatus;
  statusMessage?: string;       // Custom status text (e.g., "This won't last long!")
  
  // Content
  title: string;                // Full descriptive title
  description: string;          // Property description
  images: PropertyImage[];      // Property images
  features: PropertyFeature[];  // Key features and amenities
  
  // URLs and links
  detailsUrl?: string;         // Link to full property details
  packageUrl?: string;         // Link to package details
  
  // Contact information
  contact?: PropertyContact;
  
  // Metadata
  dateAdded?: string;          // ISO date string
  lastUpdated: string;         // ISO date string
  sourceUrl: string;           // Original URL where data was scraped from
}

// API response types
export interface PropertySyncResult {
  success: boolean;
  count: number;
  properties: Property[];
  villages: VillageSlug[];
  timestamp: string;
  errors?: string[];
}

export interface PropertySyncError {
  success: false;
  error: string;
  village?: VillageSlug;
  timestamp: string;
}

// Filter and search types
export interface PropertyFilters {
  village?: VillageSlug[];
  status?: PropertyStatus[];
  type?: PropertyType[];
  priceRange?: [number, number];
  bedrooms?: number[];
  bathrooms?: number[];
}

export interface PropertySearchResult {
  properties: Property[];
  total: number;
  filters: PropertyFilters;
  lastUpdated: string;
}

// Edge Config storage format
export interface PropertyCache {
  properties: {
    moline: Property[];
    riverside: Property[];
  };
  metadata: {
    lastSync: string;
    totalCount: number;
    syncDuration: number;
    version: string;
  };
}

// Raw data types from __NEXT_DATA__ (these will vary based on actual structure)
export interface RawPropertyData {
  [key: string]: any;
}

export interface NextDataUrqlEntry {
  data: {
    [key: string]: RawPropertyData;
  };
  operation?: any;
  error?: any;
}