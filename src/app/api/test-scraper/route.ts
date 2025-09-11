import { NextRequest, NextResponse } from 'next/server';
import PropertyExtractor from '../../../../lib/scraper/property-extractor';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const village = searchParams.get('village') as 'moline' | 'riverside' | null;

  try {
    console.log('Testing property extraction...');
    
    let properties;
    if (village && (village === 'moline' || village === 'riverside')) {
      properties = await PropertyExtractor.extractVillageProperties(village);
    } else {
      properties = await PropertyExtractor.extractAllProperties();
    }

    return NextResponse.json({
      success: true,
      count: properties.length,
      properties: properties,
      extractedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Property extraction failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      extractedAt: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { village } = body;

    console.log(`Testing extraction for specific village: ${village}`);
    
    const properties = await PropertyExtractor.extractVillageProperties(village);

    return NextResponse.json({
      success: true,
      village,
      count: properties.length,
      properties,
      extractedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Property extraction failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      extractedAt: new Date().toISOString()
    }, { status: 500 });
  }
}