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
import { ConsultantPanel } from '@/components/ui/ConsultantPanel'
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
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-6 flex flex-col justify-center">
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
                  <Button
                    size="lg"
                    onClick={() => window.location.href = 'https://www.amanaliving.com.au/contact-us'}
                  >
                    Make an enquiry
                  </Button>
                  <Button 
                    size="lg"
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
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
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
            <ConsultantPanel 
              consultant={villageData.consultant} 
              villageName={villageData.name} 
            />
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
            
            <div className="rounded-lg overflow-hidden min-h-[300px]">
              <Image
                src="https://placehold.co/600x400"
                alt="Amana Living resident"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                priority={false}
              />
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

              <Button
                onClick={() => {
                  const element = document.getElementById('tour-booking');
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                Book a tour today
              </Button>
            </div>

            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <iframe 
                src="https://www.youtube.com/embed/ayURT1mQWNU?si=rBaJADQmU5G4rSib" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
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
      <section id="tour-booking" className="py-16 px-4 text-white" style={{ backgroundColor: '#004676' }}>
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

            <ConsultantPanel 
              consultant={villageData.consultant} 
              villageName={villageData.name}
              className="bg-white border-gray-200"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
