/**
 * Debug Data Structure Endpoint
 * 
 * This endpoint examines the raw __NEXT_DATA__ structure to help
 * fine-tune the property detection logic.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const village = searchParams.get('village') || 'moline-village';
  
  try {
    const url = `https://www.amanaliving.com.au/retirement-villages/locations/${village}`;
    console.log(`🔍 Debugging data structure from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Extract __NEXT_DATA__
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
    
    if (!nextDataMatch) {
      return NextResponse.json({ 
        success: false, 
        error: 'No __NEXT_DATA__ found' 
      });
    }

    const nextData = JSON.parse(nextDataMatch[1]);
    
    // Get the largest urql cache entry
    const urqlState = nextData.props?.urqlState;
    if (!urqlState) {
      return NextResponse.json({
        success: false,
        error: 'No urqlState found'
      });
    }

    const entries = Object.entries(urqlState);
    const largestEntry = entries.reduce((prev, curr) => {
      const prevSize = JSON.stringify(prev[1]).length;
      const currSize = JSON.stringify(curr[1]).length;
      return currSize > prevSize ? curr : prev;
    });

    const [cacheKey, cacheData] = largestEntry;
    const data = cacheData.data;

    // Sample some entries to understand structure
    const sampleEntries = [];
    const entryKeys = Object.keys(data).slice(0, 10); // First 10 entries
    
    for (const key of entryKeys) {
      const entry = data[key];
      if (entry && typeof entry === 'object') {
        const entryStr = JSON.stringify(entry).toLowerCase();
        const hasPropertyKeywords = 
          entryStr.includes('apartment') || 
          entryStr.includes('villa') || 
          entryStr.includes('bedroom') || 
          entryStr.includes('bathroom') ||
          entryStr.includes('price') ||
          entryStr.includes('sold');

        sampleEntries.push({
          key,
          hasPropertyKeywords,
          size: JSON.stringify(entry).length,
          topLevelKeys: Object.keys(entry),
          sample: hasPropertyKeywords ? entry : 'No property keywords'
        });
      }
    }

    return NextResponse.json({
      success: true,
      village,
      analysis: {
        totalDataSize: nextDataMatch[1].length,
        urqlCacheKey: cacheKey,
        urqlCacheSize: JSON.stringify(cacheData).length,
        totalEntries: Object.keys(data).length,
        sampleEntries
      }
    });

  } catch (error) {
    console.error('Debug failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}