/**
 * Production Property Sync API
 * 
 * This endpoint extracts properties from Amana Living using __NEXT_DATA__
 * and stores them in Vercel Edge Config for fast global access.
 * 
 * Usage:
 * - GET /api/properties/sync - Trigger manual sync
 * - POST /api/properties/sync - Automated sync (called by cron)
 */

import { NextRequest, NextResponse } from 'next/server';
import AmanaPropertyExtractor from '@/lib/property-extractor';
import { PropertyCache, Property } from '@/types/property';

// Environment variables for Edge Config
const EDGE_CONFIG_ID = process.env.EDGE_CONFIG;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

/**
 * Manual sync trigger (GET)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const force = searchParams.get('force') === 'true';
  
  return handleSync(force, 'manual');
}

/**
 * Automated sync (POST) - called by Vercel cron
 */
export async function POST(request: NextRequest) {
  // Verify request is from Vercel cron
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return handleSync(false, 'automated');
}

/**
 * Handle the sync process
 */
async function handleSync(force: boolean, trigger: 'manual' | 'automated') {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  
  console.log(`🚀 Starting ${trigger} property sync at ${timestamp}`);
  
  try {
    // Check if we need to sync (unless forced)
    if (!force && trigger === 'automated') {
      const lastSync = await getLastSyncTime();
      if (lastSync && isRecentSync(lastSync)) {
        console.log(`⏭️ Skipping sync - last sync was recent: ${lastSync}`);
        return NextResponse.json({
          success: true,
          skipped: true,
          message: 'Sync skipped - recent sync detected',
          lastSync,
          timestamp
        });
      }
    }

    // Extract properties from Amana Living
    console.log('📊 Extracting properties from Amana Living...');
    const extractResult = await AmanaPropertyExtractor.extractAllProperties();
    
    if (!extractResult.success) {
      console.error('❌ Property extraction failed:', (extractResult as any).error);
      return NextResponse.json(extractResult, { status: 500 });
    }

    const { properties, errors } = extractResult;
    console.log(`✅ Extracted ${properties.length} properties`);
    
    if (errors && errors.length > 0) {
      console.warn('⚠️ Extraction completed with warnings:', errors);
    }

    // Organize properties by village
    const organizedProperties = organizePropertiesByVillage(properties);
    
    // Create cache object
    const cache: PropertyCache = {
      properties: organizedProperties,
      metadata: {
        lastSync: timestamp,
        totalCount: properties.length,
        syncDuration: Date.now() - startTime,
        version: '1.0.0'
      }
    };

    // Store in Edge Config
    console.log('💾 Storing properties in Edge Config...');
    const stored = await storeInEdgeConfig(cache);
    
    if (!stored) {
      console.error('❌ Failed to store in Edge Config');
      return NextResponse.json({
        success: false,
        error: 'Failed to store properties in Edge Config',
        timestamp
      }, { status: 500 });
    }

    const duration = Date.now() - startTime;
    console.log(`🎉 Sync completed successfully in ${duration}ms`);

    // Log sync metrics
    await logSyncMetrics({
      trigger,
      duration,
      propertyCount: properties.length,
      villages: Object.keys(organizedProperties),
      errors: errors || [],
      timestamp
    });

    return NextResponse.json({
      success: true,
      count: properties.length,
      villages: Object.keys(organizedProperties),
      duration,
      errors: errors && errors.length > 0 ? errors : undefined,
      timestamp,
      trigger
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('💥 Sync failed:', error);
    
    await logSyncError({
      trigger,
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp
    });

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown sync error',
      duration,
      timestamp,
      trigger
    }, { status: 500 });
  }
}

/**
 * Organize properties by village
 */
function organizePropertiesByVillage(properties: Property[]) {
  const organized = {
    moline: [] as Property[],
    riverside: [] as Property[]
  };

  for (const property of properties) {
    if (property.village === 'moline') {
      organized.moline.push(property);
    } else if (property.village === 'riverside') {
      organized.riverside.push(property);
    }
  }

  return organized;
}

/**
 * Store properties in Vercel Edge Config
 */
async function storeInEdgeConfig(cache: PropertyCache): Promise<boolean> {
  if (!EDGE_CONFIG_ID || !VERCEL_TOKEN) {
    console.warn('⚠️ Edge Config not configured - storing in memory only');
    // In development, just return true
    return true;
  }

  try {
    const response = await fetch(
      `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'upsert',
              key: 'properties',
              value: cache
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Edge Config API error:', error);
      return false;
    }

    console.log('✅ Successfully stored in Edge Config');
    return true;

  } catch (error) {
    console.error('❌ Error storing in Edge Config:', error);
    return false;
  }
}

/**
 * Get last sync time from Edge Config
 */
async function getLastSyncTime(): Promise<string | null> {
  if (!EDGE_CONFIG_ID || !VERCEL_TOKEN) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/item/properties`,
      {
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`
        }
      }
    );

    if (!response.ok) {
      return null;
    }

    const cache: PropertyCache = await response.json();
    return cache.metadata?.lastSync || null;

  } catch (error) {
    console.warn('⚠️ Error getting last sync time:', error);
    return null;
  }
}

/**
 * Check if last sync was recent (within 4 hours)
 */
function isRecentSync(lastSync: string): boolean {
  const lastSyncTime = new Date(lastSync).getTime();
  const fourHoursAgo = Date.now() - (4 * 60 * 60 * 1000);
  
  return lastSyncTime > fourHoursAgo;
}

/**
 * Log sync metrics (could be enhanced with analytics service)
 */
async function logSyncMetrics(metrics: {
  trigger: string;
  duration: number;
  propertyCount: number;
  villages: string[];
  errors: string[];
  timestamp: string;
}) {
  console.log('📈 Sync Metrics:', {
    trigger: metrics.trigger,
    duration: `${metrics.duration}ms`,
    properties: metrics.propertyCount,
    villages: metrics.villages.join(', '),
    errorCount: metrics.errors.length,
    timestamp: metrics.timestamp
  });

  // TODO: Send to analytics service (Vercel Analytics, Mixpanel, etc.)
}

/**
 * Log sync errors
 */
async function logSyncError(error: {
  trigger: string;
  duration: number;
  error: string;
  timestamp: string;
}) {
  console.error('🚨 Sync Error:', error);
  
  // TODO: Send to error monitoring service (Sentry, LogRocket, etc.)
  // TODO: Send alert notifications
}