# Dynamic Property Feed System

This system automatically extracts property listings from the main Amana Living website using their **__NEXT_DATA__** structure and serves them through a fast, cached API. It specifically targets the Moline Village page at https://www.amanaliving.com.au/retirement-villages/locations/moline-village.

## 🚀 How It Works

1. **Data Extraction**: Uses the `__NEXT_DATA__` JSON embedded in Amana Living's Next.js pages
2. **Smart Parsing**: Analyzes the urql GraphQL cache to find property data, with special handling for character array reconstruction
3. **Intelligent Detection**: Uses property keywords (apartment, villa, bedroom, price, sold) to identify relevant data
4. **Global Storage**: Stores properties in Vercel Edge Config for instant worldwide access
5. **Automatic Sync**: Updates every 6 hours via Vercel cron jobs (configurable in `vercel.json`)
6. **React Integration**: Provides hooks and components for easy frontend integration

## 📋 Features

- ✅ **Real-time Property Data** from amanaliving.com.au
- ✅ **High-Quality Images** automatically extracted
- ✅ **Rich Property Details** (pricing, bedrooms, bathrooms, features)
- ✅ **Status Tracking** (available, sold, reserved)
- ✅ **Fast Global CDN** via Vercel Edge Config
- ✅ **Error Handling** and fallback states
- ✅ **TypeScript Support** with full type safety
- ✅ **Backward Compatibility** with existing components

## 🛠️ Setup & Configuration

### 1. Environment Variables

Add these to your Vercel project settings:

```bash
# Required for Edge Config storage
EDGE_CONFIG="ecfg_your_edge_config_id"
VERCEL_TOKEN="your_vercel_token"

# Optional: Secure cron jobs
CRON_SECRET="your_random_secret"
```

### 2. Vercel Edge Config

Create an Edge Config in your Vercel dashboard and add the ID to `EDGE_CONFIG`.

### 3. Deploy

The `vercel.json` file is already configured for automated syncing every 6 hours.

## 📖 Usage Examples

### Basic Property Display

```tsx
import { DynamicPropertySection } from '@/components/ui/DynamicPropertySection';

export default function VillagePage() {
  return (
    <div>
      <DynamicPropertySection
        village="moline"
        title="AVAILABLE UNITS"
        subtitle="View available units at Moline Village"
        maxProperties={6}
      />
    </div>
  );
}
```

### Using React Hooks

```tsx
import { useVillageProperties, usePropertyStats } from '@/hooks/useProperties';

function PropertyStats() {
  const { properties, loading, error } = useVillageProperties('moline');
  const { stats } = usePropertyStats('moline');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{stats.total} Properties Available</h2>
      <p>Average Price: ${stats.averagePrice.toLocaleString()}</p>
      <p>{stats.apartments} Apartments, {stats.villas} Villas</p>
    </div>
  );
}
```

### Advanced Filtering

```tsx
import { useFilteredProperties } from '@/hooks/useProperties';

function FilteredProperties() {
  const { properties } = useFilteredProperties({
    village: ['moline'],
    status: ['available'],
    priceRange: [300000, 600000],
    bedrooms: [2, 3]
  });

  return (
    <div>
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

## 🔧 API Endpoints

### GET /api/properties
Retrieve properties with optional filtering

**Query Parameters:**
- `village`: 'moline' | 'riverside' | 'all'
- `status`: 'available' | 'sold' | 'reserved' | 'coming-soon' | 'under-contract'
- `type`: 'apartment' | 'villa' | 'townhouse' | 'studio'
- `minPrice`, `maxPrice`: number
- `beds`, `baths`: number

**Example:**
```bash
GET /api/properties?village=moline&status=available&beds=2
```

**Response:**
```json
{
  "success": true,
  "properties": [...],
  "total": 15,
  "filters": {...},
  "metadata": {
    "lastSync": "2024-01-15T10:30:00Z",
    "totalAvailable": 25,
    "syncDuration": 1250
  }
}
```

### GET /api/properties/sync
Trigger manual property sync

**Query Parameters:**
- `force`: 'true' to bypass cache

**Example:**
```bash
GET /api/properties/sync?force=true
```

**Response:**
```json
{
  "success": true,
  "count": 25,
  "villages": ["moline", "riverside"],
  "duration": 1250,
  "timestamp": "2024-01-15T10:30:00Z",
  "trigger": "manual"
}
```

### Debug Endpoints

#### GET /api/properties/debug-data
Analyze the raw `__NEXT_DATA__` structure to understand data organization

#### GET /api/properties/debug-reconstruction
Test JSON reconstruction from character arrays found in urql cache

## 🏗️ Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Amana Living      │    │   Property          │    │   Vercel Edge       │
│   __NEXT_DATA__     │───▶│   Extractor         │───▶│   Config            │
│   urql GraphQL Cache│    │   Character Array   │    │   Global Storage    │
│                     │    │   Reconstruction    │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
                                      │                           │
                                      ▼                           ▼
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Vercel Cron       │    │   Next.js API       │    │   React Components  │
│   (Every 6 hours)   │───▶│   Routes            │◀───│   & Hooks           │
│   vercel.json       │    │   /api/properties   │    │   DynamicSection    │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

### Data Flow

1. **Source**: Moline Village page `__NEXT_DATA__` contains urql GraphQL cache
2. **Detection**: System identifies character arrays in cache data
3. **Reconstruction**: Reassembles JSON from character entries using numeric keys
4. **Parsing**: Searches reconstructed data for property-like objects
5. **Storage**: Organized properties stored in Vercel Edge Config
6. **Serving**: Global CDN serves cached properties instantly
7. **Frontend**: React hooks and components consume live property data

## 📊 Data Structure

### Property Interface

```typescript
interface Property {
  id: string;                    // Unique identifier
  propertyNumber: string;        // Display name (e.g., "Apartment 308")
  village: 'moline' | 'riverside';
  
  // Property details
  type: 'apartment' | 'villa' | 'townhouse' | 'studio';
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  
  // Pricing & availability
  price: number;                 // Numeric value
  priceDisplay: string;          // Formatted string (e.g., "$360,000")
  status: 'available' | 'sold' | 'reserved' | 'coming-soon';
  statusMessage?: string;        // Custom status text
  
  // Content
  title: string;                 // Full descriptive title
  description: string;
  images: PropertyImage[];
  features: PropertyFeature[];
  
  // Metadata
  lastUpdated: string;           // ISO date string
  sourceUrl: string;             // Original URL
}
```

## 🔄 Migration Guide

### From Static to Dynamic Properties

**Before (Static):**
```tsx
const properties = [
  {
    title: 'APARTMENT 308',
    price: '$360,000',
    beds: 2,
    baths: 1,
    carSpaces: 1,
    description: 'Beautiful apartment...',
    isSold: false
  }
];

return (
  <div>
    {properties.map((property, index) => (
      <PropertyCard key={index} {...property} />
    ))}
  </div>
);
```

**After (Dynamic):**
```tsx
import { useVillageProperties } from '@/hooks/useProperties';

function PropertiesSection() {
  const { properties, loading } = useVillageProperties('moline');
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

### PropertyCard Compatibility

The `PropertyCard` component supports both old and new interfaces:

```tsx
// Old way (still works)
<PropertyCard
  title="Apartment 308"
  price="$360,000"
  beds={2}
  baths={1}
  carSpaces={1}
  description="Beautiful apartment"
/>

// New way (recommended)
<PropertyCard property={propertyObject} />
```

## 🚨 Troubleshooting

### No Properties Found
1. Check if Edge Config is configured: `EDGE_CONFIG` environment variable
2. Trigger manual sync: `GET /api/properties/sync?force=true`
3. Check Vercel function logs for extraction errors
4. Verify the source URL is accessible: https://www.amanaliving.com.au/retirement-villages/locations/moline-village

### Sync Failures
1. **Character Array Detection**: Check if urql cache format has changed
2. **JSON Reconstruction**: Use debug endpoint to test reconstruction: `/api/properties/debug-reconstruction`
3. **Property Keywords**: Verify property detection logic still matches current content
4. **Network Issues**: Check if Amana Living site is blocking requests
5. **Data Structure**: Use `/api/properties/debug-data` to analyze current structure

### Performance Issues
1. Properties are cached globally via Edge Config (ultra-fast)
2. Sync only runs every 6 hours (configurable in `vercel.json`)
3. React hooks include built-in caching and error states
4. Edge Config provides < 50ms response times globally

### Debug Process
1. **Check Data Source**: Visit the Moline Village page manually
2. **Test Extraction**: Use `/api/properties/debug-data?village=moline-village`
3. **Test Reconstruction**: Use `/api/properties/debug-reconstruction`
4. **Trigger Sync**: Use `/api/properties/sync?force=true`
5. **Verify Storage**: Check if properties appear in `/api/properties`

## 🎯 Benefits Over Original Approach

### Instead of Brittle HTML Scraping:
✅ **Uses structured JSON data** (`__NEXT_DATA__`)  
✅ **Immune to CSS changes** (uses actual page data)  
✅ **Complete property information** (images, features, status)  
✅ **Reliable extraction** (same data Next.js uses)  

### Instead of Basic Cron + Edge Config:
✅ **Smart caching strategy** (Edge Config + API)  
✅ **Rich data model** (comprehensive property interface)  
✅ **Error resilience** (fallbacks and retry logic)  
✅ **Developer experience** (TypeScript, hooks, components)  

## 📈 System Capabilities

### Current Implementation
- ✅ **Live Moline Village Data**: Extracts properties from https://www.amanaliving.com.au/retirement-villages/locations/moline-village
- ✅ **Advanced JSON Reconstruction**: Handles character array format in urql GraphQL cache
- ✅ **Intelligent Property Detection**: Uses keyword matching (apartment, villa, bedroom, price, sold)
- ✅ **Global Edge Storage**: Vercel Edge Config for <50ms worldwide response times
- ✅ **Automated Sync**: Every 6 hours via Vercel cron jobs
- ✅ **React Integration**: Hooks (`useProperties`, `useVillageProperties`) and components (`DynamicPropertySection`)
- ✅ **Debug Tools**: Data structure analysis and reconstruction testing endpoints
- ✅ **Error Handling**: Comprehensive error states and fallback mechanisms
- ✅ **TypeScript**: Full type safety with detailed property interfaces

### Production Features
- **Reliability**: Character array reconstruction ensures data extraction even with complex cache formats
- **Performance**: Edge Config provides instant global access to property data
- **Scalability**: Can easily extend to other villages by adding configurations
- **Monitoring**: Built-in sync metrics and error logging
- **Flexibility**: Supports filtering by village, status, type, price range, bedrooms, bathrooms

### Technical Highlights
1. **Smart Extraction**: Automatically detects and reconstructs fragmented JSON from character arrays
2. **Fault Tolerance**: Graceful handling of extraction failures with detailed error reporting
3. **Real-time Updates**: Properties stay synchronized with main website automatically
4. **Developer Experience**: Rich TypeScript types, React hooks, and debug endpoints
5. **Production Ready**: Comprehensive error handling, logging, and monitoring

This system provides a production-ready, scalable solution for dynamic property listings that automatically stays in sync with the main Amana Living website.