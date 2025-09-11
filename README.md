# Amana Living Retirement Village Landing Pages

A modern, responsive website built with Next.js 15, TypeScript, and Tailwind CSS for Amana Living retirement villages featuring an **advanced real-time property extraction system** that automatically syncs with amanaliving.com.au.

## 🏘️ Key Features

### 🏠 Dynamic Property System
- **Real-time Property Data**: Automatically extracts apartments from amanaliving.com.au using `__NEXT_DATA__` structure
- **Smart JSON Reconstruction**: Advanced character array reconstruction from urql GraphQL cache
- **Intelligent Property Detection**: Uses keyword matching (apartment, villa, bedroom, price, sold) to identify properties
- **Global Edge Storage**: Properties stored in Vercel Edge Config for <50ms worldwide access
- **Automated Sync**: Updates every 6 hours via Vercel cron jobs (configurable)
- **Rich Property Details**: Pricing, bedrooms, bathrooms, features, status, and high-quality images

### 🎨 Landing Pages & Design
- **Two Complete Village Sites**: Moline Village and Collier Park
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Modern Components**: Reusable UI components with dynamic property support
- **Clean Design System**: Minimalist aesthetic based on Figma wireframes
- **SEO Optimized**: Proper meta tags and semantic HTML

### ⚡ Performance & Development
- **Next.js 15**: App Router with Turbopack for ultra-fast builds
- **React 19**: Latest React features and concurrent rendering
- **TypeScript**: Full type safety with comprehensive property interfaces
- **Fast Performance**: Optimized for Vercel deployment with Edge Config
- **Developer Experience**: Rich hooks, components, and debug tools

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
project-root/
├── src/
│   ├── app/                           # Next.js 15 App Router
│   │   ├── (landing-pages)/          # Route groups for villages
│   │   │   ├── location-1/           # Moline Village landing page
│   │   │   │   └── page.tsx
│   │   │   └── location-2/           # Collier Park landing page
│   │   │       └── page.tsx
│   │   ├── api/                      # API routes and server functions
│   │   │   ├── analyze-data/         # Data analysis endpoint
│   │   │   ├── properties/           # Property API ecosystem
│   │   │   │   ├── route.ts          # Main properties API with filtering
│   │   │   │   ├── sync/             # Property sync trigger
│   │   │   │   ├── debug-data/       # Debug data structure analysis
│   │   │   │   ├── debug-reconstruction/ # Test JSON reconstruction
│   │   │   │   ├── debug-simple/     # Simple debug endpoint
│   │   │   │   └── test-extraction/  # Test property extraction
│   │   │   └── test-scraper/         # Scraper testing endpoint
│   │   ├── favicon.ico
│   │   ├── globals.css               # Global Tailwind styles
│   │   └── layout.tsx                # Root layout component
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── DynamicPropertySection.tsx  # Smart property loader
│   │   │   ├── PropertyCard.tsx      # Enhanced property display
│   │   │   ├── AmenityTag.tsx        # Feature tags
│   │   │   ├── Button.tsx            # Consistent buttons
│   │   │   ├── Card.tsx              # Base card component
│   │   │   ├── FAQAccordion.tsx      # Collapsible FAQ
│   │   │   ├── Hero.tsx              # Hero sections
│   │   │   ├── ImageGallery.tsx      # Property image viewer
│   │   │   ├── LocationCard.tsx      # Village overview cards
│   │   │   ├── Map.tsx               # Interactive maps
│   │   │   ├── ServicesGrid.tsx      # Service/amenity grids
│   │   │   └── Testimonial.tsx       # Resident testimonials
│   │   ├── sections/                 # Page section components
│   │   └── layout/                   # Layout and navigation
│   │       ├── AmanaHeader.tsx       # Brand header
│   │       ├── Breadcrumb.tsx        # Navigation breadcrumbs
│   │       └── Header.tsx            # Main site header
│   ├── hooks/
│   │   └── useProperties.ts          # Property data React hooks
│   ├── lib/
│   │   ├── property-extractor.ts     # Advanced property extraction
│   │   ├── utils.ts                  # Utility functions (clsx, etc.)
│   │   └── design-tokens.ts          # Design system constants
│   └── types/
│       ├── index.ts                  # General TypeScript definitions
│       └── property.ts               # Property-specific interfaces
├── lib/                              # Root-level utilities
│   └── scraper/
│       └── property-extractor.ts     # Alternative extraction implementation
├── public/                           # Static assets
│   ├── images/
│   │   └── icons/                    # SVG icons for amenities
│   └── *.svg                         # Logo and brand assets
├── vercel.json                       # Vercel deployment and cron config
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # Project documentation
```

## 🎨 Design System

The project follows a clean, minimalist design system based on the provided Figma wireframes:

- **Colors**: Black text on white background with gray accents
- **Typography**: Clear hierarchy with bold headings and readable body text
- **Components**: Consistent spacing, rounded corners, and hover effects
- **Icons**: Simple, monochromatic icons for amenities and features

## 📱 Pages

### Home Page (`/`)
- Navigation to both village locations
- Overview of each village with key features

### Moline Village (`/location-1`)
- Hero section with village description and amenities
- Village overview with detailed information
- Available units showcase
- Resident testimonials
- Location and nearby amenities
- Lifestyle and services grid
- Additional services section
- FAQ accordion
- Tour booking section

### Collier Park (`/location-2`)
- Similar structure to Moline Village
- Unique content and styling for the second location
- Modern amenities and services focus

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15.5.2** - React framework with App Router and Turbopack
- **React 19.1.0** - Latest React features and concurrent rendering
- **TypeScript 5.9.2** - Type-safe JavaScript with strict configuration

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework with latest features
- **PostCSS** - CSS processing with Tailwind integration
- **Clsx + Tailwind Merge** - Dynamic class name composition

### Infrastructure & Performance
- **Vercel Edge Config** - Global property storage for <50ms response times
- **Vercel Cron Jobs** - Automated property syncing every 6 hours
- **Vercel Platform** - Deployment with automatic optimizations

### Development Tools
- **ESLint 9** - Code linting with Next.js configuration
- **Turbopack** - Ultra-fast bundler for development and production
- **TypeScript Strict Mode** - Maximum type safety and error prevention

## 🚀 Deployment

The project is optimized for Vercel deployment with Edge Config:

### Environment Variables Required:
```bash
# Vercel Edge Config for property storage
EDGE_CONFIG="ecfg_your_edge_config_id"
VERCEL_TOKEN="your_vercel_token"

# Required: Secure cron jobs (configured as Vercel secret)
CRON_SECRET="@cron_secret"  # References Vercel secret named "cron_secret"
```

### Setting Up CRON_SECRET:

1. **Generate a secure random secret:**
   ```bash
   openssl rand -hex 32
   ```

2. **Add to Vercel project:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add a new secret with name: `cron-secret` (without @ symbol)
   - Use the generated random string as the value
   - Select all environments (Production, Preview, Development)

3. **Verify configuration:**
   - The `vercel.json` file references this secret as `@cron-secret`
   - This ensures secure authentication for cron job endpoints

### ⚠️ Important: Vercel Plan Limitations

This project includes advanced features that have different capabilities based on your Vercel plan:

#### Cron Job Limitations
| Plan | Cron Jobs | Schedule Restrictions |
|------|-----------|----------------------|
| **Hobby** | 2 jobs max | Once per day only |
| **Pro** | 40 jobs max | Unlimited frequency |
| **Enterprise** | 100 jobs max | Unlimited frequency |

**Current Configuration**: 
- **CRON_SECRET**: ✅ Properly configured as Vercel secret for secure authentication
- **Production**: Cron jobs are **disabled** in `vercel.json` to ensure deployment on Hobby plan
- **Originally designed**: Every 6 hours sync (`0 */6 * * *`) - requires Pro plan or higher

#### Plan Recommendations

**For Hobby Plan Users:**
- ✅ All features work except automated sync
- ✅ Manual sync available via `/api/properties/sync?force=true`
- ✅ Add daily cron job: `"schedule": "0 2 * * *"` (runs once at 2 AM)

**For Pro Plan Users:**
- ✅ Enable automated sync by uncommenting cron job in `vercel.json`
- ✅ Configure sync frequency: every 6 hours recommended
- ✅ Unlimited cron job invocations

#### Enabling Automated Sync (Pro Plan)

To enable the 6-hour property sync on Pro plan, update `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/properties/sync",
      "schedule": "0 */6 * * *"
    }
  ],
  "env": {
    "CRON_SECRET": "@cron-secret"
  }
}
```

#### TypeScript Configuration Notes

**ES2018 Target Required**: The project uses modern regex features (dotAll flag `s`) that require ES2018+:
- ✅ `tsconfig.json` is configured with `"target": "ES2018"`
- ⚠️ If you encounter regex compilation errors, verify this setting

### Deployment Steps:
1. Create a Vercel Edge Config in your dashboard
2. Set up environment variables
3. Choose your deployment strategy based on plan:
   - **Hobby**: Deploy as-is (cron disabled)
   - **Pro/Enterprise**: Enable cron jobs in `vercel.json`
4. Push your code to GitHub
5. Connect your repository to Vercel
6. Deploy and verify functionality

### Common Deployment Issues & Solutions

#### Issue: "All checks have failed" / Deployment Errors
**Root Causes & Solutions:**

1. **Cron Job Plan Violation**
   ```bash
   # Error: Hobby plan with >1 daily cron job
   # Solution: Remove or modify cron schedule in vercel.json
   ```

2. **TypeScript Compilation Errors**
   ```bash
   # Error: Regex flag 's' requires ES2018+
   # Solution: Verify tsconfig.json target is ES2018+
   ```

3. **ESLint Strict Errors**
   ```bash
   # Error: @typescript-eslint/no-explicit-any violations
   # Solution: Configuration set to warnings instead of errors
   ```

4. **Repository Mismatch**
   ```bash
   # Error: Vercel monitoring wrong repository
   # Solution: Ensure git remote matches Vercel project repository
   git remote -v  # Check current remote
   git remote set-url origin git@github.com:YourUsername/your-repo.git
   ```

#### Manual Deployment Triggers
If automated deployment fails, trigger manually:

```bash
# Force a new commit to trigger deployment
echo "# Deploy trigger $(date)" >> README.md
git add README.md
git commit -m "trigger: manual deployment"
git push origin main
```

#### Monitoring Deployment Status
- **Vercel Dashboard**: Monitor builds and function logs
- **GitHub Actions**: Check repository webhook delivery
- **Edge Config**: Verify property data storage
- **API Testing**: Test endpoints after successful deployment

## 💻 Usage Examples

### Quick Start with Dynamic Properties

```tsx
import { DynamicPropertySection } from '@/components/ui/DynamicPropertySection';

export default function VillagePage() {
  return (
    <div>
      {/* Automatic property loading with fallback states */}
      <DynamicPropertySection
        village="moline"
        title="AVAILABLE UNITS"
        subtitle="Live properties from Amana Living"
        maxProperties={6}
      />
    </div>
  );
}
```

### Using React Hooks for Custom Components

```tsx
import { useVillageProperties, usePropertyStats } from '@/hooks/useProperties';
import { PropertyCard } from '@/components/ui/PropertyCard';

function CustomPropertySection() {
  const { properties, loading, error } = useVillageProperties('moline');
  const { stats } = usePropertyStats('moline');

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{stats.total} Properties Available</h2>
      <p>Average Price: ${stats.averagePrice?.toLocaleString()}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
```

### Advanced Filtering

```tsx
import { useFilteredProperties } from '@/hooks/useProperties';

function FilteredProperties() {
  const { properties, loading } = useFilteredProperties({
    village: ['moline'],
    status: ['available'],
    priceRange: [300000, 600000],
    bedrooms: [2, 3]
  });

  return (
    <div>
      <h3>Filtered Results ({properties.length} properties)</h3>
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

## 🔌 API Reference

### GET /api/properties
Retrieve properties with comprehensive filtering options.

**Query Parameters:**
- `village`: `'moline'` | `'riverside'` | `'all'` (default: 'all')
- `status`: `'available'` | `'sold'` | `'reserved'` | `'coming-soon'` | `'under-contract'`
- `type`: `'apartment'` | `'villa'` | `'townhouse'` | `'studio'`
- `minPrice`, `maxPrice`: number (price filtering)
- `beds`, `baths`: number (room filtering)
- `limit`: number (max results, default: 50)

**Examples:**
```bash
# Get all available properties in Moline Village
GET /api/properties?village=moline&status=available

# Find 2-bedroom apartments under $500k
GET /api/properties?type=apartment&beds=2&maxPrice=500000

# Get first 10 properties for pagination
GET /api/properties?limit=10
```

**Response:**
```json
{
  "success": true,
  "properties": [
    {
      "id": "moline-apt-308",
      "propertyNumber": "Apartment 308",
      "village": "moline",
      "type": "apartment",
      "bedrooms": 2,
      "bathrooms": 1,
      "carSpaces": 1,
      "price": 360000,
      "priceDisplay": "$360,000",
      "status": "available",
      "title": "Spacious 2-bedroom apartment",
      "description": "Beautiful apartment with modern amenities...",
      "images": [
        {
          "url": "https://...",
          "alt": "Apartment 308 living room",
          "width": 800,
          "height": 600
        }
      ],
      "features": [
        { "name": "Air Conditioning", "icon": "❄️" },
        { "name": "Balcony", "icon": "🏗️" }
      ],
      "lastUpdated": "2024-01-15T10:30:00Z",
      "sourceUrl": "https://www.amanaliving.com.au/..."
    }
  ],
  "total": 15,
  "filters": {
    "village": "moline",
    "status": "available"
  },
  "metadata": {
    "lastSync": "2024-01-15T10:30:00Z",
    "totalAvailable": 25,
    "syncDuration": 1250
  }
}
```

### GET /api/properties/sync
Trigger manual property synchronization.

**Query Parameters:**
- `force`: `'true'` to bypass cache and force fresh extraction

**Response:**
```json
{
  "success": true,
  "count": 25,
  "villages": ["moline", "riverside"],
  "duration": 1250,
  "timestamp": "2024-01-15T10:30:01Z",
  "trigger": "manual"
}
```

### Debug Endpoints

#### GET /api/properties/debug-data
Analyze the raw `__NEXT_DATA__` structure to understand data organization.

#### GET /api/properties/debug-reconstruction
Test JSON reconstruction from character arrays found in urql cache.

## 📝 Customization

### Adding New Villages
1. Update `VillageSlug` type in `src/types/property.ts`
2. Add village configuration to `AmanaPropertyExtractor.VILLAGE_CONFIG`
3. Create new landing page directory in `src/app/(landing-pages)/`
4. Use `DynamicPropertySection` component for automatic property loading

### Property Sync Management
- **Automatic**: Properties sync via Vercel cron jobs (Plan dependent - see Deployment section)
- **Manual**: `GET /api/properties/sync?force=true`
- **Debug**: `GET /api/properties/debug-data` for data structure analysis
- **Monitoring**: Check Vercel Functions tab for sync logs and performance

#### Sync Configuration by Plan:
- **Hobby Plan**: Manual sync only (cron jobs disabled)
- **Pro/Enterprise**: Enable 6-hour automated sync in `vercel.json`

### Styling and Theme
- Modify Tailwind classes in components for visual changes
- Update design tokens in `src/lib/design-tokens.ts` for consistent theming
- Customize colors and typography in `tailwind.config.js`
- Use CSS variables for dynamic theming support

## 🔗 Key System Files

### Property Extraction
- `src/lib/property-extractor.ts` - Main extraction logic with character array reconstruction
- `lib/scraper/property-extractor.ts` - Alternative extractor implementation

### API Routes
- `src/app/api/properties/route.ts` - Main properties API with filtering
- `src/app/api/properties/sync/route.ts` - Sync endpoint for automated/manual updates
- `src/app/api/properties/debug-data/route.ts` - Debug data structure analysis
- `src/app/api/properties/debug-reconstruction/route.ts` - Test JSON reconstruction

### React Integration
- `src/hooks/useProperties.ts` - React hooks for property data
- `src/components/ui/DynamicPropertySection.tsx` - Dynamic property display component
- `src/types/property.ts` - Comprehensive TypeScript property types

### Configuration
- `vercel.json` - Cron job configuration for automated syncing
- Package dependencies: `@vercel/edge-config` for global storage

## 🚨 Troubleshooting

### Common Issues and Solutions

#### No Properties Loading
1. **Check Environment Variables**:
   ```bash
   # Verify in Vercel dashboard
   EDGE_CONFIG="ecfg_your_edge_config_id"
   VERCEL_TOKEN="your_vercel_token"
   ```

2. **Manual Sync**:
   ```bash
   curl "https://your-domain.vercel.app/api/properties/sync?force=true"
   ```

3. **Debug Data Structure**:
   ```bash
   curl "https://your-domain.vercel.app/api/properties/debug-data"
   ```

#### Sync Failures
- **Character Array Detection**: Check if urql cache format has changed
- **JSON Reconstruction**: Test reconstruction at `/api/properties/debug-reconstruction`
- **Property Keywords**: Verify property detection logic matches current content
- **Network Issues**: Ensure Amana Living site is accessible

#### Performance Issues
- Properties are cached in Vercel Edge Config for ultra-fast global access
- Sync runs every 6 hours (configurable in `vercel.json`)
- Check Vercel Functions tab for sync performance metrics

#### Development Issues
- Use `npm run dev --turbopack` for faster development builds
- TypeScript errors: Check `tsconfig.json` for strict mode settings
- Tailwind not updating: Clear `.next` cache and restart dev server

### Debug Workflow
1. **Test Data Source**: Visit Moline Village page manually
2. **Check Extraction**: `GET /api/properties/debug-data?village=moline-village`
3. **Test Reconstruction**: `GET /api/properties/debug-reconstruction`
4. **Force Sync**: `GET /api/properties/sync?force=true`
5. **Verify API**: `GET /api/properties?village=moline`

## 📊 System Status

### ✅ Production Ready Features
- **Live Data Source**: https://www.amanaliving.com.au/retirement-villages/locations/moline-village
- **Extraction Method**: `__NEXT_DATA__` urql GraphQL cache with character array reconstruction
- **Global Storage**: Vercel Edge Config for <50ms worldwide response times
- **Automated Sync**: Configurable via cron jobs (Plan dependent - see Deployment section)
- **Manual Sync**: Always available via API endpoint for all plans
- **Error Handling**: Comprehensive fallback states and error recovery
- **Debug Tools**: Available at `/api/properties/debug-*` endpoints
- **Type Safety**: Full TypeScript coverage with ES2018+ target
- **Performance**: Optimized for Vercel Edge Network deployment
- **Deployment**: Tested on Hobby plan with Pro plan upgrade path

### 🔧 Technical Capabilities
- **Smart Extraction**: Character array reconstruction from fragmented JSON
- **Intelligent Detection**: Property identification via keyword matching
- **Rich Data Model**: Complete property details with images and features
- **Filtering System**: Advanced property filtering by multiple criteria
- **React Integration**: Custom hooks and components for seamless frontend use
- **Monitoring**: Built-in sync metrics and performance tracking

### 🚀 Deployment Architecture
- **Framework**: Next.js 15 with App Router and Turbopack
- **Runtime**: Vercel Edge Functions for global performance
- **Storage**: Vercel Edge Config for instant data access
- **Automation**: Serverless cron jobs for property synchronization
- **CDN**: Global content delivery via Vercel Edge Network

## 📞 Support & Contact

### Development Team
For questions about the project, feature requests, or technical support, please contact the development team.

### Documentation Resources
- **Property System Details**: See `PROPERTY_SYSTEM.md` for comprehensive technical documentation
- **API Reference**: Use `/api/properties/debug-*` endpoints for testing
- **Type Definitions**: Check `src/types/property.ts` for complete interfaces

---

**Built with ❤️ for Amana Living Retirement Villages**  
*Dynamic Property System: Real-time apartment data from amanaliving.com.au*

### Quick Links
- 🏠 [Moline Village](https://your-domain.vercel.app/location-1)
- 🏞️ [Collier Park](https://your-domain.vercel.app/location-2)
- 🔌 [Properties API](https://your-domain.vercel.app/api/properties)
- 🔄 [Sync Properties](https://your-domain.vercel.app/api/properties/sync)
# Force deployment Thu Sep 11 11:35:28 AWST 2025
