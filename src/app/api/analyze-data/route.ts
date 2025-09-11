import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const village = searchParams.get('village') || 'moline-village';

  try {
    const url = `https://www.amanaliving.com.au/retirement-villages/locations/${village}`;
    console.log(`Analyzing __NEXT_DATA__ from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Extract __NEXT_DATA__
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
    
    if (!nextDataMatch) {
      return NextResponse.json({ 
        success: false, 
        error: 'No __NEXT_DATA__ found' 
      });
    }

    const nextData = JSON.parse(nextDataMatch[1]);
    
    // Analyze the structure without returning massive data
    const analysis = {
      dataSize: nextDataMatch[1].length,
      mainKeys: Object.keys(nextData),
      propsKeys: nextData.props ? Object.keys(nextData.props) : null,
      urqlKeys: nextData.props?.urqlState ? Object.keys(nextData.props.urqlState) : null,
      urqlEntryInfo: nextData.props?.urqlState ? 
        Object.entries(nextData.props.urqlState).map(([key, value]: [string, any]) => ({
          key,
          size: JSON.stringify(value).length,
          hasData: !!value?.data,
          dataKeys: value?.data ? Object.keys(value.data) : null
        })) : null
    };

    return NextResponse.json({
      success: true,
      village,
      analysis,
      // Return a sample of the largest urql entry data keys for inspection
      sampleData: nextData.props?.urqlState ? 
        (() => {
          const entries = Object.entries(nextData.props.urqlState);
          const largest = entries.reduce((prev, curr) => 
            JSON.stringify(curr[1]).length > JSON.stringify(prev[1]).length ? curr : prev
          );
          const largestValue = largest[1] as any;
          return {
            largestKey: largest[0],
            dataStructure: largestValue?.data ? exploreStructure(largestValue.data, 3) : null
          };
        })() : null
    });
  } catch (error) {
    console.error('Analysis failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper function to explore object structure without returning huge data
function exploreStructure(obj: any, maxDepth: number, currentDepth = 0): any {
  if (currentDepth >= maxDepth || !obj || typeof obj !== 'object') {
    return typeof obj;
  }

  if (Array.isArray(obj)) {
    return {
      type: 'array',
      length: obj.length,
      sampleItem: obj.length > 0 ? exploreStructure(obj[0], maxDepth, currentDepth + 1) : null
    };
  }

  const result: any = { type: 'object', keys: [] };
  for (const [key, value] of Object.entries(obj)) {
    result.keys.push({
      key,
      type: typeof value,
      structure: exploreStructure(value, maxDepth, currentDepth + 1)
    });
    
    // Limit the number of keys we explore
    if (result.keys.length >= 10) {
      result.truncated = true;
      break;
    }
  }
  
  return result;
}