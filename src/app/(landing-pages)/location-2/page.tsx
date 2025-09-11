import { AmenityTag } from '@/components/ui/AmenityTag'
import { Button } from '@/components/ui/Button'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { Testimonial } from '@/components/ui/Testimonial'
import { LocationCard } from '@/components/ui/LocationCard'
import { ServicesGrid } from '@/components/ui/ServicesGrid'
import { FAQAccordion } from '@/components/ui/FAQAccordion'

export default function Location2Page() {
  const amenities = [
    'Wellness Center',
    'Outdoor Patio', 
    'Computer Lab',
    'Barber Shop',
    'Craft Room'
  ]

  const properties = [
    {
      title: 'APARTMENT 205',
      price: '$420,000',
      beds: 2,
      baths: 2,
      carSpaces: 1,
      description: 'Modern apartment with stunning views and premium finishes. Features an open-plan living area and private balcony.',
      isSold: false
    },
    {
      title: 'VILLA 8',
      price: '$850,000',
      beds: 3,
      baths: 2,
      carSpaces: 2,
      description: 'Spacious villa with garden views and modern amenities. Perfect for those who want extra space and privacy.',
      isSold: false
    },
    {
      title: 'APARTMENT 401',
      price: '$380,000',
      beds: 1,
      baths: 1,
      carSpaces: 1,
      description: 'Cozy apartment ideal for downsizing. Features modern kitchen and bathroom with easy maintenance.',
      isSold: true
    }
  ]

  const nearbyAmenities = [
    { name: 'Medical Center', distance: '0.8 km' },
    { name: 'Hospital', distance: '6.2 kms' },
    { name: 'Shopping Mall', distance: '1.2 km' },
    { name: 'Bus Station', distance: '0.5 km' },
    { name: 'Train Station', distance: '2.1 km' },
    { name: 'City Center', distance: '8.5 km' }
  ]

  const lifestyleServices = [
    { name: 'Wellness Center', icon: '🧘' },
    { name: 'Outdoor Patio', icon: '🌿' },
    { name: 'Computer Lab', icon: '💻' },
    { name: 'Barber Shop', icon: '✂️' },
    { name: 'Craft Room', icon: '🎨' },
    { name: 'Walking Paths', icon: '🚶' },
    { name: 'Café', icon: '☕' },
    { name: 'Meditation Garden', icon: '🌸' }
  ]

  const additionalServices = [
    { name: 'Housekeeping', icon: '🧹' },
    { name: 'Meal Service', icon: '🍽️' },
    { name: 'Personal Care', icon: '👥' },
    { name: 'Nutritionist', icon: '🥗' },
    { name: 'Laundry Service', icon: '👕' },
    { name: 'Social Activities', icon: '🎉' }
  ]

  const faqItems = [
    {
      question: 'What makes this location special?',
      answer: 'Our second location offers a unique blend of modern amenities and peaceful surroundings. With state-of-the-art facilities and a focus on wellness, it\'s designed for active seniors who want to maintain an independent lifestyle while having access to comprehensive support services.'
    },
    {
      question: 'What types of accommodation are available?',
      answer: 'We offer a variety of accommodation options including modern apartments and spacious villas. All units are designed with accessibility in mind and feature contemporary finishes and low-maintenance living.'
    },
    {
      question: 'What activities and services are included?',
      answer: 'Residents enjoy access to our wellness center, outdoor activities, computer lab, and various social programs. We also offer additional services like housekeeping, meal services, and personal care for those who need extra support.'
    },
    {
      question: 'How do I arrange a visit?',
      answer: 'Contact our friendly team to schedule a personalized tour. We\'ll show you around the facilities, introduce you to the community, and answer any questions you may have about life at our village.'
    },
    {
      question: 'What is the application process?',
      answer: 'The application process is straightforward. After your tour, we\'ll provide you with all the necessary information and guide you through the application. Our team is here to help make the transition as smooth as possible.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                  Riverside Village
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Discover modern retirement living in a beautiful riverside setting. Our second location 
                  combines contemporary amenities with the tranquility of nature, creating the perfect 
                  environment for your golden years.
                </p>
              </div>

              {/* Amenity Tags */}
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <AmenityTag key={index}>{amenity}</AmenityTag>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Make an enquiry
                </Button>
                <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                  View available units
                </Button>
              </div>
            </div>

            {/* Right Column - Image Placeholder */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-600 text-2xl">🏞️</span>
                  </div>
                  <p className="text-gray-600 text-sm">Hero image placeholder</p>
                </div>
              </div>
              
              {/* Gallery Placeholders */}
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-sm">📷</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Village Overview Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
                  VILLAGE OVERVIEW
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  Modern living by the river.
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Riverside Village offers a contemporary approach to retirement living, set in a 
                    beautiful location with stunning river views. Our modern facilities and innovative 
                    design create an environment that promotes wellness, social connection, and 
                    independent living.
                  </p>
                  <p>
                    Designed specifically for active seniors, our village features state-of-the-art 
                    amenities including a wellness center, outdoor recreation areas, and technology 
                    facilities. Residents enjoy a vibrant community atmosphere with regular social 
                    activities, educational programs, and wellness initiatives.
                  </p>
                  <p>
                    Our commitment to excellence extends to every aspect of village life. From 
                    beautifully designed living spaces to comprehensive support services, we ensure 
                    that residents can enjoy their retirement years with confidence, comfort, and 
                    peace of mind.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-gray-600 text-2xl">👨</span>
                </div>
                <h4 className="text-xl font-bold text-black">Michael Chen</h4>
                <p className="text-gray-700">
                  Ready to explore Riverside Village? Contact Michael, our dedicated consultant, 
                  to learn more about our modern facilities and arrange a personalized tour.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-white border border-black text-black hover:bg-gray-100">
                    📞 Call Michael to book a tour
                  </Button>
                  <a href="#" className="block text-black hover:underline flex items-center justify-center gap-1">
                    Email Michael
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Units Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
              AVAILABLE UNITS
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              View available units at Riverside Village
            </h3>
            <p className="text-gray-700">
              Discover modern living options designed for your lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Testimonial
              quote="Riverside Village has exceeded all my expectations. The modern facilities, friendly community, and beautiful surroundings make every day enjoyable. I feel like I'm living in a resort!"
              author="Robert Chen"
              role="Resident"
              location="Riverside Village"
              rating={5}
            />
            
            <div className="bg-gray-200 rounded-lg flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-600 text-2xl">🏞️</span>
                </div>
                <p className="text-gray-600 text-sm">Image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Amenities Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <LocationCard
            title="Prime location with river views"
            description="Riverside Village is perfectly positioned to offer the best of both worlds - peaceful riverside living with easy access to urban amenities and services."
            address="45 River Road, Riverside, WA 6020"
            amenities={nearbyAmenities}
          />
        </div>
      </section>

      {/* Lifestyle & Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ServicesGrid
            title="LIFESTYLE & SERVICES"
            subtitle="Modern amenities for active living"
            description="Our comprehensive range of services and facilities are designed to enhance your daily life and support your wellness journey."
            services={lifestyleServices}
          />
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
                  ADDITIONAL SERVICES
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  Enhance your experience
                </h3>
                <p className="text-gray-700 mb-6">
                  Beyond our standard amenities, Riverside Village offers a comprehensive range of 
                  additional services to support your lifestyle and independence:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm text-black">{service.name}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-black text-white hover:bg-gray-800">
                Book a tour today
              </Button>
            </div>

            <div className="bg-gray-200 rounded-lg flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">▶</span>
                </div>
                <p className="text-gray-600 text-sm">Video placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  FAQs
                </h2>
                <p className="text-gray-700 mb-6">
                  Have questions about Riverside Village? We're here to help. Feel free to contact us by clicking the button below.
                </p>
                <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                  📞 Get in touch
                </Button>
              </div>
            </div>

            <div>
              <FAQAccordion items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      {/* Tour Booking Section */}
      <section className="py-16 px-4 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Book a tour of Riverside Village
              </h2>
              <p className="text-lg text-gray-300">
                Experience modern retirement living firsthand. Schedule your personalized tour today.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-200 rounded-lg flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-600 text-2xl">🏞️</span>
                  </div>
                  <p className="text-gray-600 text-sm">Image placeholder</p>
                </div>
              </div>
              
              <Button className="w-full bg-white text-gray-800 hover:bg-gray-100">
                Book a tour with Michael
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}