/**
 * Test Property Extraction (without Edge Config dependency)
 * 
 * This endpoint tests the property extraction logic without requiring
 * Edge Config to be fully configured.
 */

import { NextRequest, NextResponse } from 'next/server';
import AmanaPropertyExtractor from '@/lib/property-extractor';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const village = searchParams.get('village') as 'moline' | 'riverside' | null;
  
  try {
    console.log('🧪 Testing property extraction...');
    
    let result;
    if (village && (village === 'moline' || village === 'riverside')) {
      console.log(`Testing extraction for ${village} village only`);
      const properties = await AmanaPropertyExtractor.extractVillageProperties(village);
      result = {
        success: true,
        count: properties.length,
        properties: properties,
        villages: [village],
        timestamp: new Date().toISOString()
      };
    } else {
      console.log('Testing extraction for all villages');
      result = await AmanaPropertyExtractor.extractAllProperties();
    }

    // Return detailed information for debugging
    return NextResponse.json({
      ...result,
      debug: {
        propertiesFound: result.success ? result.properties.length : 0,
        sampleProperty: result.success && result.properties.length > 0 ? 
          result.properties[0] : null,
        extractionMethod: '__NEXT_DATA__ parsing',
        villages: result.success ? result.villages : []
      }
    });

  } catch (error) {
    console.error('❌ Test extraction failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      debug: {
        extractionMethod: '__NEXT_DATA__ parsing',
        step: 'Property extraction failed'
      }
    }, { status: 500 });
  }
}