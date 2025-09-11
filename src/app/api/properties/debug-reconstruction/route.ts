/**
 * Debug JSON Reconstruction
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = 'https://www.amanaliving.com.au/retirement-villages/locations/moline-village';
    console.log(`🔍 Testing JSON reconstruction from: ${url}`);
    
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
    const dataEntries = Object.entries(data);
    
    // Check if it's character array format
    const isCharacterArray = dataEntries.length > 100 && 
                            dataEntries.every(([key, value]) => 
                              typeof key === 'string' && 
                              /^\d+$/.test(key) && 
                              typeof value === 'string' && 
                              value.length <= 2
                            );

    if (isCharacterArray) {
      console.log(`🧩 Confirmed character array with ${dataEntries.length} entries`);
      
      // Reconstruct the full JSON to analyze structure
      const sortedEntries = dataEntries.sort(([a], [b]) => parseInt(a) - parseInt(b));
      const fullJson = sortedEntries.map(([, value]) => value).join('');
      
      try {
        const parsedData = JSON.parse(fullJson);
        console.log('✅ Successfully parsed reconstructed JSON');
        
        // Look for property-related data
        const findPropertyData = (obj: any, path = '', depth = 0): any[] => {
          const results = [];
          
          if (depth > 8 || !obj || typeof obj !== 'object') return results;
          
          if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
              results.push(...findPropertyData(item, `${path}[${index}]`, depth + 1));
            });
          } else {
            // Look for common property-related keys
            const objStr = JSON.stringify(obj).toLowerCase();
            const propertyKeywords = ['apartment', 'villa', 'property', 'unit', 'bedroom', 'bathroom', 'price', 'available', 'sold'];
            const matchedKeywords = propertyKeywords.filter(keyword => objStr.includes(keyword));
            
            if (matchedKeywords.length >= 2) {
              results.push({
                path,
                matchedKeywords,
                objectKeys: Object.keys(obj).slice(0, 10),
                sampleData: typeof obj === 'object' ? Object.fromEntries(
                  Object.entries(obj).slice(0, 3).map(([k, v]) => [
                    k, 
                    typeof v === 'string' && v.length > 50 ? `${v.substring(0, 50)}...` : v
                  ])
                ) : obj
              });
            }
            
            // Recursively search nested objects
            for (const [key, value] of Object.entries(obj)) {
              results.push(...findPropertyData(value, path ? `${path}.${key}` : key, depth + 1));
            }
          }
          
          return results;
        };
        
        const propertyLikeData = findPropertyData(parsedData);
        
        return NextResponse.json({
          success: true,
          isCharacterArray,
          totalEntries: dataEntries.length,
          reconstructionSuccess: true,
          fullDataSize: fullJson.length,
          topLevelKeys: Object.keys(parsedData),
          propertyLikeEntries: propertyLikeData.length,
          samples: propertyLikeData.slice(0, 5) // First 5 property-like entries
        });
        
      } catch (parseError) {
        return NextResponse.json({
          success: true,
          isCharacterArray,
          totalEntries: dataEntries.length,
          reconstructionSuccess: false,
          parseError: parseError instanceof Error ? parseError.message : 'Parse failed',
          first200chars: fullJson.substring(0, 200)
        });
      }
    } else {
      return NextResponse.json({
        success: true,
        isCharacterArray: false,
        message: 'Data is not in character array format'
      });
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}