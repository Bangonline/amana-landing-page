'use client'

import { AmenityTag } from '@/components/ui/AmenityTag'
import { Button } from '@/components/ui/Button'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { Testimonial } from '@/components/ui/Testimonial'
import { LocationCard } from '@/components/ui/LocationCard'
import { ServicesGrid } from '@/components/ui/ServicesGrid'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { AmanaHeader } from '@/components/layout/AmanaHeader'
import { useVillageProperties } from '@/hooks/useProperties'

export default function Location2Page() {
  // Fetch properties dynamically from Edge Config for Collier Park Village (riverside)
  const { properties, loading, error } = useVillageProperties('riverside');

  const amenities = [
    'Community Centre',
    'Hairdresser', 
    'Pet Friendly',
    'Library',
    'Two Meeting Venues'
  ]

  const nearbyAmenities = [
    { name: 'Medical Centre', distance: '1.2 km' },
    { name: 'Hospital', distance: '5.8 kms' },
    { name: 'Shopping Centre', distance: '0.9 km' },
    { name: 'Bus Stop', distance: '0.3 km' },
    { name: 'Train Station', distance: '2.5 km' },
    { name: 'Perth CBD', distance: '9.2 km' }
  ]

  const lifestyleServices = [
    { name: 'Community Centre', iconSvg: '/images/icons/Community.svg' },
    { name: 'Hairdresser', iconSvg: '/images/icons/Hair-salon.svg' },
    { name: 'Library', icon: '📚' },
    { name: 'Social Activities', iconSvg: '/images/icons/Social-Outings-purple.svg' },
    { name: 'Exercise Classes', icon: '🏃' },
    { name: 'Cards & Bingo', icon: '🃏' },
    { name: 'Afternoon Teas', icon: '☕' },
    { name: 'Movie Library', icon: '🎬' }
  ]

  const additionalServices = [
    { name: 'Cleaning', iconSvg: '/images/icons/cleaning.svg' },
    { name: 'Meals', iconSvg: '/images/icons/cooking.svg' },
    { name: 'Personal Care', iconSvg: '/images/icons/personal-care.svg' },
    { name: 'Dietitian', iconSvg: '/images/icons/Dietitian-purple.svg' },
    { name: 'Laundry', iconSvg: '/images/icons/laundry.svg' },
    { name: 'Social Outings', iconSvg: '/images/icons/Social-Outings-purple.svg' }
  ]

  const faqItems = [
    {
      question: 'Can I talk to someone about Amana Living Retirement Villages?',
      answer: 'We welcome phone enquiries. Please call us on 1300 26 26 26 and talk to our friendly Customer Service Centre staff who can put you through to the best person in our retirement village team. We have a wide range of independent living options available to suit all financial situations, please call to discuss.'
    },
    {
      question: 'What style of retirement living does Amana Living offer?',
      answer: 'Amana Living offers different types of housing for over-55s: Lease-for-life where you purchase an exclusive lease and pay a daily operating fee, Non-refundable ingoing contribution and pay a daily operating fee, and Rental units where you pay a daily operating fee and rent in lieu of a deposit for security of long term accommodation.'
    },
    {
      question: 'How much will it cost me to live in a retirement village?',
      answer: 'The lease prices for units in our lease-for-life villages are based on current market conditions. In addition, a modest daily operating fee is charged to cover the cost of external maintenance and shared facilities. When residents leave the village, a deferred management fee is deducted from the sale, allowing you to enjoy the benefits of refurbishment when you move in.'
    },
    {
      question: 'Why would I choose an Amana Living retirement village?',
      answer: 'Amana Living has a wide variety of retirement villages across Western Australia. Our villages aim to give you peace of mind, a great lifestyle and financial security. We provide the services that help you stay in your Amana Living home as your needs change. You get to live alongside like-minded people, without the daily worries of home maintenance and gardening.'
    },
    {
      question: 'How can I find a retirement village that\'s right for me?',
      answer: 'When you choose a home, you\'re choosing a way of life that will be meaningful to you and reflect your individual lifestyle. We want to help you find the right home in the right location, with the support and surroundings you want. Please explore our retirement village section or give our Customer Service Team a call (1300 26 26 26).'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <AmanaHeader />
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                  Collier Park Village
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Peace of mind, independence and the comfort of belonging to a warm, caring community 
                  are hallmarks of the Collier Park Village lifestyle. Experience exclusive independent 
                  living for individuals aged 55 and above in beautiful Como.
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
                  Nestled in Como, surrounded by beauty.
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Nestled in Como, Collier Park Village provides exclusive independent living accommodation 
                    for individuals aged 55 and above, surrounded by beautifully landscaped gardens. Our 
                    village boasts 169 two-bedroom independent villas, along with community and leisure 
                    centres, all designed to enhance your living experience. We are also pet friendly!
                  </p>
                  <p>
                    Collier Park Village offers two meeting venues on-site for our residents&apos; convenience. 
                    The Community Centre, available to residents and their families, is a charming and 
                    well-equipped space for social gatherings and community events. Our village thrives on 
                    a vibrant social committee and the generous volunteerism of residents.
                  </p>
                  <p>
                    Enjoy a diverse range of activities and events such as cards, bingo, afternoon teas, 
                    and exercise classes, all held exclusively for our residents&apos; enjoyment in the Community 
                    Centre. Additionally, our comprehensive library offers a wide selection of movies for 
                    borrowing, providing ample opportunities for relaxation and entertainment.
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
                <h4 className="text-xl font-bold text-black">Village Consultant</h4>
                <p className="text-gray-700">
                  Interested in finding out more information or booking a tour of Collier Park Village? 
                  Get in touch with our friendly consultant to learn more about our beautiful 
                  village and arrange a personalized tour.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-white border border-black text-black hover:bg-gray-100">
                    📞 Call 0459 819 169 to book a tour
                  </Button>
                  <a href="#" className="block text-black hover:underline flex items-center justify-center gap-1">
                    Send us an email
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
              View available units at Collier Park Village
            </h3>
            <p className="text-gray-700">
              Discover the range of two-bedroom villas available
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              // Loading state
              Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg animate-pulse h-96" />
              ))
            ) : error ? (
              // Error state
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-600 mb-4">Unable to load properties: {error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : properties.length === 0 ? (
              // No properties state
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-600">No properties currently available</p>
              </div>
            ) : (
              // Properties loaded successfully
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Testimonial
              quote="Moving to Collier Park has been so amazing. The community is wonderful and the amenities are so enjoyable. It's close to shops and transport - I couldn't ask for anything more. The beautiful gardens make it feel like home."
              author="Margaret Wilson"
              role="Resident"
              location="Collier Park Village"
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
            title="Close to everything in Como"
            description="Collier Park Village is perfectly positioned in Como, offering peaceful village living with easy access to shopping centres, medical facilities, and public transport."
            address="16 Morrison Street, Como WA 6152"
            amenities={nearbyAmenities}
            latitude={-31.9935}
            longitude={115.8589}
            mapTitle="Collier Park Village"
          />
        </div>
      </section>

      {/* Lifestyle & Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ServicesGrid
            title="LIFESTYLE & SERVICES"
            subtitle="A range of activities and services"
            description="Each Village offers a unique range of activities and services for you to enjoy."
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
                  Beyond the standard services at Collier Park Village, there are a number of 
                  additional options to purchase including:
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
                  Have questions about Collier Park Village? We&apos;re here to help. Feel free to contact us by clicking the button below.
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
                Book a tour of Collier Park Village
              </h2>
              <p className="text-lg text-gray-300">
                Interested to view the village in person? Book a tour today.
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
                Book a tour today
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}