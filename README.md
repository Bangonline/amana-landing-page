# Amana Living Retirement Village Landing Pages

A modern, responsive website built with Next.js 14, TypeScript, and Tailwind CSS for Amana Living retirement villages.

## 🏘️ Features

- **Two Complete Landing Pages**: Moline Village and Riverside Village
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: Reusable UI components built with TypeScript
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Performance**: Built with Next.js 14 and optimized for Vercel deployment

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
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Home page
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── AmenityTag.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── Hero.tsx
│   │   ├── LocationCard.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── ServicesGrid.tsx
│   │   └── Testimonial.tsx
│   ├── sections/                # Page sections
│   └── layout/                  # Layout components
├── lib/
│   └── utils.ts                 # Utility functions
└── types/
    └── index.ts                 # TypeScript type definitions
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

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - Latest React features
- **Vercel** - Deployment platform

## 🚀 Deployment

The project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## 📝 Customization

### Adding New Villages
1. Create a new directory in `src/app/(landing-pages)/`
2. Add a `page.tsx` file with the village content
3. Update the home page to include the new village

### Modifying Content
- Update village information in the respective page files
- Modify amenities, services, and testimonials as needed
- Replace placeholder images with actual photos

### Styling Changes
- Modify Tailwind classes in components
- Update the design system in `src/lib/utils.ts`
- Customize colors and typography in `tailwind.config.js`

## 📞 Contact

For questions about the project or to request changes, please contact the development team.

---

Built with ❤️ for Amana Living Retirement Villages