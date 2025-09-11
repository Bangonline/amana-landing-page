export interface VillageConsultant {
  name: string
  image?: string
  phone?: string
  email?: string
  description: string
}

export interface VillageAmenity {
  name: string
  distance: string
  iconSvg: string
}

export interface VillageService {
  name: string
  iconSvg: string
}

export interface VillageTestimonial {
  quote: string
  author: string
  role: string
  location: string
  rating: number
}

export interface VillageFAQ {
  question: string
  answer: string
}

export interface VillageBreadcrumb {
  label: string
  href?: string
}

export interface VillageLocation {
  title: string
  description: string
  address: string
  latitude: number
  longitude: number
  mapTitle: string
}

import { VillageSlug } from './property'

export interface VillageData {
  // Basic info
  name: string
  slug: string
  propertyType: VillageSlug // for useVillageProperties hook
  
  // Hero section
  heroTitle: string
  heroDescription: string
  amenities: string[]
  galleryImages: string[]
  
  // Overview section
  overviewTitle: string
  overviewContent: string[]
  consultant: VillageConsultant
  
  // Location section
  location: VillageLocation
  nearbyAmenities: VillageAmenity[]
  
  // Services sections
  lifestyleServices: VillageService[]
  additionalServices: VillageService[]
  
  // Content sections
  testimonial: VillageTestimonial
  faqItems: VillageFAQ[]
  
  // Navigation
  breadcrumbItems: VillageBreadcrumb[]
}
