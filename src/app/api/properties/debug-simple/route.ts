/**
 * Simple Debug Endpoint - Get Raw Entry Samples
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = 'https://www.amanaliving.com.au/retirement-villages/locations/moline-village';
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });

    const html = await response.text();
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
    const nextData = JSON.parse(nextDataMatch[1]);
    
    const urqlState = nextData.props?.urqlState;
    const largestEntry = Object.entries(urqlState).reduce((prev, curr) => 
      JSON.stringify(curr[1]).length > JSON.stringify(prev[1]).length ? curr : prev
    );

    const data = largestEntry[1].data;
    
    // Get first few entries that actually exist
    const samples = [];
    const keys = Object.keys(data).slice(0, 5);
    
    for (const key of keys) {
      const entry = data[key];
      samples.push({
        key,
        type: typeof entry,
        isObject: typeof entry === 'object' && entry !== null,
        hasKeys: typeof entry === 'object' && entry !== null ? Object.keys(entry).length : 0,
        firstLevel: typeof entry === 'object' && entry !== null ? 
          Object.keys(entry).slice(0, 5) : entry
      });
    }

    return NextResponse.json({
      success: true,
      totalEntries: Object.keys(data).length,
      samples
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}