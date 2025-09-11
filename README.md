# Amana Living Retirement Village Landing Pages

A modern, responsive website built with Next.js 15, TypeScript, and Tailwind CSS for Amana Living retirement villages with **real-time property extraction** from the main Amana Living website.

## 🏘️ Features

- **Two Complete Landing Pages**: Moline Village and Riverside Village
- **Real-time Property Data**: Automatically extracts apartments from amanaliving.com.au using `__NEXT_DATA__`
- **Smart Property Extraction**: Uses GraphQL cache data for reliable property information
- **Global Edge Storage**: Properties stored in Vercel Edge Config for instant worldwide access
- **Automated Sync**: Updates every 6 hours via Vercel cron jobs
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: Reusable UI components with dynamic property support
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Performance**: Built with Next.js 15 and optimized for Vercel deployment

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
src/
├── app/
│   ├── (landing-pages)/
│   │   ├── location-1/          # Moline Village
│   │   └── location-2/          # Riverside Village
│   ├── api/                     # API routes
│   │   ├── properties/          # Property API endpoints
│   │   │   ├── route.ts         # Main properties API
│   │   │   ├── sync/            # Sync trigger endpoint
│   │   │   ├── debug-data/      # Debug data structure
│   │   │   └── debug-reconstruction/ # Debug JSON reconstruction
│   │   └── test-scraper/        # Scraper testing endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Home page
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── DynamicPropertySection.tsx  # Dynamic property loader
│   │   ├── PropertyCard.tsx     # Enhanced property card
│   │   ├── AmenityTag.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── Hero.tsx
│   │   ├── LocationCard.tsx
│   │   ├── ServicesGrid.tsx
│   │   └── Testimonial.tsx
│   ├── sections/                # Page sections
│   └── layout/                  # Layout components
├── hooks/
│   └── useProperties.ts         # React hooks for property data
├── lib/
│   ├── property-extractor.ts    # Main property extraction logic
│   ├── utils.ts                 # Utility functions
│   └── design-tokens.ts         # Design system tokens
└── types/
    ├── index.ts                 # General type definitions
    └── property.ts              # Property-specific types
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

### Riverside Village (`/location-2`)
- Similar structure to Moline Village
- Unique content and styling for the second location
- Modern amenities and services focus

## 🛠️ Built With

- **Next.js 15** - React framework with App Router and Turbopack
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **React 19** - Latest React features
- **Vercel Edge Config** - Global property storage
- **Vercel Cron Jobs** - Automated property syncing
- **Vercel** - Deployment platform

## 🚀 Deployment

The project is optimized for Vercel deployment with Edge Config:

### Environment Variables Required:
```bash
# Vercel Edge Config for property storage
EDGE_CONFIG="ecfg_your_edge_config_id"
VERCEL_TOKEN="your_vercel_token"

# Optional: Secure cron jobs
CRON_SECRET="your_random_secret"
```

### Deployment Steps:
1. Create a Vercel Edge Config in your dashboard
2. Set up environment variables
3. Push your code to GitHub
4. Connect your repository to Vercel
5. Deploy with automatic cron job configuration (via `vercel.json`)

## 📝 Customization

### Adding New Villages
1. Update `VillageSlug` type in `src/types/property.ts`
2. Add village configuration to `AmanaPropertyExtractor.VILLAGE_CONFIG`
3. Create new landing page directory in `src/app/(landing-pages)/`
4. Use `DynamicPropertySection` component for automatic property loading

### Dynamic Property Integration
```tsx
import { DynamicPropertySection } from '@/components/ui/DynamicPropertySection';

// Automatic property loading
<DynamicPropertySection
  village="moline"
  title="AVAILABLE UNITS"
  subtitle="Live properties from Amana Living"
  maxProperties={6}
/>
```

### Property Sync Management
- Properties sync automatically every 6 hours
- Manual sync: `GET /api/properties/sync?force=true`
- Debug data structure: `GET /api/properties/debug-data`
- Monitor sync logs in Vercel Functions tab

### Styling Changes
- Modify Tailwind classes in components
- Update design tokens in `src/lib/design-tokens.ts`
- Customize colors and typography in `tailwind.config.js`

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

## 📊 System Status

✅ **Live Data Source**: https://www.amanaliving.com.au/retirement-villages/locations/moline-village  
✅ **Extraction Method**: `__NEXT_DATA__` urql GraphQL cache with character array reconstruction  
✅ **Storage**: Vercel Edge Config for global < 50ms access  
✅ **Sync Frequency**: Every 6 hours (configurable)  
✅ **Debug Tools**: Available at `/api/properties/debug-*` endpoints  

## 📞 Contact

For questions about the project or to request changes, please contact the development team.

---

Built with ❤️ for Amana Living Retirement Villages  
**Dynamic Property System**: Real-time apartment data from amanaliving.com.au