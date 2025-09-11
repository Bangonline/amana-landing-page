'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AmenityTag } from '@/components/ui/AmenityTag'
import { Button } from '@/components/ui/Button'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { Testimonial } from '@/components/ui/Testimonial'
import { LocationCard } from '@/components/ui/LocationCard'
import { ServicesGrid } from '@/components/ui/ServicesGrid'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { ImageGallery } from '@/components/ui/ImageGallery'
import { AmanaHeader } from '@/components/layout/AmanaHeader'
import { HeroBackground } from '@/components/ui/HeroBackground'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { ContactForm } from '@/components/ui/ContactForm'
import { useVillageProperties } from '@/hooks/useProperties'
import { VillageData } from '@/types/village'
import { VillageSlug } from '@/types/property'

interface VillageTemplateProps {
  villageData: VillageData
}

export function VillageTemplate({ villageData }: VillageTemplateProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  // Fetch properties dynamically from Edge Config
  const { properties, loading, error } = useVillageProperties(villageData.propertyType as VillageSlug);


  return (
    <div className="min-h-screen bg-white">
      <AmanaHeader />
      
      {/* Breadcrumb */}
      <Breadcrumb items={villageData.breadcrumbItems} />
      
      {/* Hero Section */}
      <HeroBackground>
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Column - Content */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                    {villageData.heroTitle}
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {villageData.heroDescription}
                  </p>
                </div>

                {/* Amenity Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {villageData.amenities.map((amenity, index) => (
                    <AmenityTag key={index} label={amenity} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Make an enquiry
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white text-black border-white hover:bg-gray-100 hover:text-black cursor-pointer transition-all duration-300"
                    style={{ backgroundColor: 'white', color: 'black', borderColor: 'white' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                    onClick={() => {
                      const element = document.getElementById('available-units');
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                  >
                    View available units
                  </Button>
                </div>
              </div>

              {/* Right Column - Image Gallery */}
              <div className="space-y-4 w-full max-w-full">
                <ImageGallery 
                  images={villageData.galleryImages} 
                  aspectRatio="4/3"
                  showThumbnails={true}
                  selectedIndex={selectedImageIndex}
                  onImageChange={setSelectedImageIndex}
                />
              </div>
            </div>
          </div>
        </section>
      </HeroBackground>

      {/* Village Overview Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#BED1E3' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
                  VILLAGE OVERVIEW
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  {villageData.overviewTitle}
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  {villageData.overviewContent.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  {villageData.consultant.image ? (
                    <img 
                      src={villageData.consultant.image} 
                      alt={`${villageData.consultant.name} - ${villageData.name} Consultant`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-600 text-2xl">👨</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-black">
                    {villageData.consultant.name || 'Village Consultant'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed px-2">
                    {villageData.consultant.description}
                  </p>
                </div>
                <div className="space-y-4 pt-2">
                  <a 
                    href={villageData.consultant.phone ? `tel:${villageData.consultant.phone.replace(/\s/g, '')}` : "tel:1300262626"}
                    className={`w-full text-white border-0 py-3 rounded transition-colors flex items-center justify-center gap-2 ${villageData.consultant.name ? 'bg-amana-orange-500 hover:bg-amana-orange-600' : 'bg-white border border-black text-black hover:bg-gray-100'}`}
                  >
                    📞 {villageData.consultant.phone ? `Call ${villageData.consultant.name} to book a tour` : 'Call to book a tour'}
                  </a>
                  <a 
                    href={villageData.consultant.email ? `mailto:${villageData.consultant.email}?subject=Enquiry about ${villageData.name} - Tour and Information Request` : "mailto:contact@amanaliving.com.au?subject=Enquiry about Retirement Village - Tour and Information Request"} 
                    className="block text-black hover:underline flex items-center justify-center gap-2 py-2"
                  >
                    {villageData.consultant.email ? `Email ${villageData.consultant.name}` : 'Send us an email'}
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Units Section */}
      <section id="available-units" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
              AVAILABLE UNITS
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              View available units at {villageData.name}
            </h3>
            <p className="text-gray-700">
              Discover the range of options available
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
      <section className="py-16 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Testimonial
              quote={villageData.testimonial.quote}
              author={villageData.testimonial.author}
              role={villageData.testimonial.role}
              location={villageData.testimonial.location}
              rating={villageData.testimonial.rating}
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
            title={villageData.location.title}
            description={villageData.location.description}
            address={villageData.location.address}
            amenities={villageData.nearbyAmenities}
            latitude={villageData.location.latitude}
            longitude={villageData.location.longitude}
            mapTitle={villageData.location.mapTitle}
          />
        </div>
      </section>

      {/* Lifestyle & Services Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-6xl mx-auto">
          <ServicesGrid
            title="LIFESTYLE & SERVICES"
            subtitle="A range of activities and services"
            description="Each Village offers a unique range of activities and services for you to enjoy."
            services={villageData.lifestyleServices}
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
                  {villageData.name === 'Moline Village' ? 'Expand your experience' : 'Enhance your experience'}
                </h3>
                <p className="text-gray-700 mb-6">
                  Beyond the standard services at {villageData.name}, there are a number of additional options to purchase including:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {villageData.additionalServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      {service.iconSvg ? (
                        <img
                          src={service.iconSvg}
                          alt={service.name}
                          className="w-7 h-7"
                        />
                      ) : (
                        <span className="text-sm">✓</span>
                      )}
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
      <section className="py-16 px-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  FAQs
                </h2>
                <p className="text-gray-700 mb-6">
                  Have questions about {villageData.name}? Ask us anything and we&apos;ll help you find the answers.
                </p>
              </div>
              
              <ContactForm 
                title="Have a question?"
                subtitle={`Ask us anything about ${villageData.name} and we'll get back to you.`}
                placeholder={`Type your question about ${villageData.name} here...`}
                className="max-w-full"
              />
            </div>

            <div>
              <FAQAccordion items={villageData.faqItems} />
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
                Book a tour of {villageData.name}
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
                {villageData.consultant.name ? `Book a tour with ${villageData.consultant.name}` : 'Book a tour today'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
