export interface Location {
  id: string
  name: string
  slug: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  phone: string
  email: string
  description: string
  heroImage: string
  amenities: string[]
  services: string[]
  testimonials: Testimonial[]
  gallery: string[]
}

export interface Testimonial {
  id: string
  name: string
  text: string
  location: string
  image?: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  location: string
}

export interface Amenity {
  id: string
  name: string
  description: string
  icon: string
  category: 'lifestyle' | 'healthcare' | 'dining' | 'recreation'
}