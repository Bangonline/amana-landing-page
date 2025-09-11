/**
 * Properties API - Retrieve properties from Edge Config
 * 
 * This endpoint serves properties that have been synced from Amana Living
 * and stored in Vercel Edge Config for fast global access.
 */

import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';
import { PropertyCache, PropertyFilters, Property, VillageSlug } from '@/types/property';
import AmanaPropertyExtractor from '@/lib/property-extractor';

/**
 * GET /api/properties
 * 
 * Query parameters:
 * - village: 'moline' | 'riverside' | 'all' (default: 'all')
 * - status: 'available' | 'sold' | 'reserved' (default: all)
 * - type: 'apartment' | 'villa' (default: all)
 * - minPrice: number
 * - maxPrice: number
 * - beds: number
 * - baths: number
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  try {
    console.log('📊 Fetching properties from Edge Config...');
    
    // Get properties from Edge Config
    let cache = await get('properties') as PropertyCache | null;
    
    // If no cache data, try to extract directly (for development)
    if (!cache) {
      console.warn('⚠️ No properties found in Edge Config, extracting directly...');
      
      try {
        const extractResult = await AmanaPropertyExtractor.extractAllProperties();
        
        if (!extractResult.success) {
          console.error('❌ Direct extraction failed:', extractResult.error);
          return NextResponse.json({
            success: false,
            error: 'No properties data available',
            message: 'Properties extraction failed'
          }, { status: 404 });
        }

        // Organize properties by village for filtering
        const organizedProperties = {
          moline: extractResult.properties.filter(p => p.village === 'moline'),
          riverside: extractResult.properties.filter(p => p.village === 'riverside')
        };

        // Create temporary cache object
        cache = {
          properties: organizedProperties,
          metadata: {
            lastSync: new Date().toISOString(),
            totalCount: extractResult.properties.length,
            syncDuration: 0,
            version: '1.0.0'
          }
        };

        console.log(`✅ Direct extraction: ${extractResult.properties.length} properties`);
      } catch (error) {
        console.error('❌ Direct extraction error:', error);
        return NextResponse.json({
          success: false,
          error: 'Failed to extract properties',
          message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
      }
    }

    // Parse filters from query parameters
    const filters = parseFilters(searchParams);
    console.log('🔍 Applying filters:', filters);

    // Get properties based on village filter
    let properties: Property[] = [];
    
    if (!filters.village || filters.village.includes('moline')) {
      properties.push(...cache.properties.moline);
    }
    if (!filters.village || filters.village.includes('riverside')) {
      properties.push(...cache.properties.riverside);
    }

    // Apply additional filters
    const filteredProperties = applyFilters(properties, filters);
    
    console.log(`✅ Returning ${filteredProperties.length} properties (${properties.length} total available)`);

    return NextResponse.json({
      success: true,
      properties: filteredProperties,
      total: filteredProperties.length,
      filters,
      metadata: {
        lastSync: cache.metadata.lastSync,
        totalAvailable: cache.metadata.totalCount,
        syncDuration: cache.metadata.syncDuration
      }
    });

  } catch (error) {
    console.error('❌ Error fetching properties:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch properties'
    }, { status: 500 });
  }
}

/**
 * Parse URL search parameters into PropertyFilters
 */
function parseFilters(searchParams: URLSearchParams): PropertyFilters {
  const filters: PropertyFilters = {};

  // Village filter
  const village = searchParams.get('village');
  if (village && village !== 'all') {
    if (village === 'moline' || village === 'riverside') {
      filters.village = [village as VillageSlug];
    } else if (village.includes(',')) {
      // Multiple villages: "moline,riverside"
      filters.village = village.split(',')
        .map(v => v.trim())
        .filter(v => v === 'moline' || v === 'riverside') as VillageSlug[];
    }
  }

  // Status filter
  const status = searchParams.get('status');
  if (status) {
    filters.status = status.split(',').map(s => s.trim()) as any[];
  }

  // Property type filter
  const type = searchParams.get('type');
  if (type) {
    filters.type = type.split(',').map(t => t.trim()) as any[];
  }

  // Price range filter
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice || maxPrice) {
    filters.priceRange = [
      minPrice ? parseInt(minPrice) : 0,
      maxPrice ? parseInt(maxPrice) : Infinity
    ];
  }

  // Bedroom filter
  const beds = searchParams.get('beds');
  if (beds) {
    filters.bedrooms = beds.split(',').map(b => parseInt(b.trim())).filter(b => !isNaN(b));
  }

  // Bathroom filter
  const baths = searchParams.get('baths');
  if (baths) {
    filters.bathrooms = baths.split(',').map(b => parseInt(b.trim())).filter(b => !isNaN(b));
  }

  return filters;
}

/**
 * Apply filters to property list
 */
function applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
  let filtered = [...properties];

  // Village filter (already applied in main function)
  // Status filter
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter(p => filters.status!.includes(p.status));
  }

  // Type filter
  if (filters.type && filters.type.length > 0) {
    filtered = filtered.filter(p => filters.type!.includes(p.type));
  }

  // Price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  // Bedroom filter
  if (filters.bedrooms && filters.bedrooms.length > 0) {
    filtered = filtered.filter(p => filters.bedrooms!.includes(p.bedrooms));
  }

  // Bathroom filter
  if (filters.bathrooms && filters.bathrooms.length > 0) {
    filtered = filtered.filter(p => filters.bathrooms!.includes(p.bathrooms));
  }

  // Sort by price (ascending) by default
  filtered.sort((a, b) => a.price - b.price);

  return filtered;
}