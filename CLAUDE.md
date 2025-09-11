# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack  
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture Overview

This is a Next.js 15.5 application with App Router serving two dedicated landing pages for Amana Living retirement villages. The base homepage was intentionally removed - only the specific landing pages exist.

### Route Structure
- `/location-1` - Moline Village landing page
- `/location-2` - Riverside Village landing page  
- `/` - Returns 404 (intentionally removed)

### App Router Layout
```
src/app/
├── (landing-pages)/     # Route group for landing pages
│   ├── location-1/      # Moline Village  
│   └── location-2/      # Riverside Village
├── layout.tsx           # Root layout with Lato font and metadata
├── globals.css          # Global Tailwind styles
└── favicon.ico
```

### Component Architecture
Components are organized into three categories:

- **`ui/`** - Reusable UI primitives (Button, Card, AmenityTag, etc.)
- **`layout/`** - Layout-specific components (Header, Breadcrumb) - currently unused but preserved
- **`sections/`** - Empty directory for future page sections

### Key Design Patterns

**Landing Page Structure**: Each landing page follows a consistent section-based layout:
1. Hero with image gallery and amenities
2. Village overview with consultant contact card
3. Available units grid with PropertyCard components
4. Testimonial section  
5. Location details with nearby amenities
6. Lifestyle & services grid
7. Additional services with video placeholder
8. FAQ accordion
9. Tour booking CTA

**Component Composition**: Pages compose reusable UI components rather than custom sections. For example, `PropertyCard` handles property listings, `FAQAccordion` manages expandable content, and `LocationCard` displays location details.

**Styling System**: Uses Tailwind CSS with a utility-first approach. The `cn()` helper in `lib/utils.ts` merges Tailwind classes safely using `clsx` and `tailwind-merge`.

## Development Workflow

When adding new features:
1. Create a `features/name-of-feature` branch
2. Set up a task list for development  
3. Work through the task list systematically
4. Verify pages work at local URLs
5. Request approval once all criteria are met
6. Merge to main and push after approval

## Technical Notes

- Uses Next.js 15.5 with Turbopack for faster builds
- TypeScript strict mode enabled
- React 19 with latest features
- Tailwind CSS v4 for styling
- ESLint configured for Next.js best practices
- Font: Lato (Google Fonts) loaded via Next.js font optimization
- Images: Uses Next.js Image component for optimization

## Content Management

Landing pages contain hardcoded content including:
- Village descriptions and amenities
- Property listings with pricing
- FAQ items
- Consultant contact information
- Service grids and testimonials

Images are hosted on S3 at `s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/`