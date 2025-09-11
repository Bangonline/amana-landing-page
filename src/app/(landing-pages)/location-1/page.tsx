import { AmenityTag } from '@/components/ui/AmenityTag'
import { Button } from '@/components/ui/Button'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { Testimonial } from '@/components/ui/Testimonial'
import { LocationCard } from '@/components/ui/LocationCard'
import { ServicesGrid } from '@/components/ui/ServicesGrid'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { ImageGallery } from '@/components/ui/ImageGallery'
import { AmanaHeader } from '@/components/layout/AmanaHeader'

export default function Location1Page() {
  const galleryImages = [
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0550.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0614.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0610.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0569.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0570.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0560.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0562.jpg'
  ]

  const amenities = [
    'Swimming pool',
    'Gymnasium', 
    'Mini golf',
    'Community Centre',
    'Games room'
  ]

  const properties = [
    {
      title: 'APARTMENT 308',
      price: '$360,000',
      beds: 2,
      baths: 1,
      carSpaces: 1,
      description: 'Freshly painted with new flooring, open plan layout with 2 Balconies providing plenty of natural light and fresh air.',
      isSold: false
    },
    {
      title: 'VILLA 14',
      price: '$790,000',
      beds: 2,
      baths: 1,
      carSpaces: 2,
      description: 'This 2 Bed plus Study Villa with 1 1/2 Bathrooms wont last long! With fresh paint & flooring, modern appliances and a huge double garage.',
      isSold: true
    },
    {
      title: 'APARTMENT 706',
      price: '$305,000',
      beds: 1,
      baths: 1,
      carSpaces: 1,
      description: 'With excellent views from your private balcony this apartment wont last long. Perfect for downsizing with easy maintenance.',
      isSold: true
    }
  ]

  const nearbyAmenities = [
    { name: 'Medical Surgery', distance: '1 km' },
    { name: 'Hospital', distance: '8.6 kms' },
    { name: 'Shopping centre', distance: '1 km' },
    { name: 'Bus stop', distance: '2 km' },
    { name: 'Train station', distance: '3.8 km' },
    { name: 'Perth city', distance: '11.5 km' }
  ]

  const lifestyleServices = [
    { name: 'Swimming Pool', icon: '🏊' },
    { name: 'Gymnasium', icon: '💪' },
    { name: 'Bowling Green', icon: '🎳' },
    { name: 'Mini Golf', icon: '⛳' },
    { name: 'Games Room', icon: '🎮' },
    { name: 'Community Centre', icon: '🏛️' },
    { name: 'Hairdresser', icon: '💇' },
    { name: 'Transport', icon: '🚌' }
  ]

  const additionalServices = [
    { name: 'Cleaning', icon: '🧹' },
    { name: 'Meals', icon: '🍽️' },
    { name: 'Personal care', icon: '👥' },
    { name: 'Dietitian', icon: '🥗' },
    { name: 'Laundry', icon: '👕' },
    { name: 'Social outings', icon: '🎉' }
  ]

  const faqItems = [
    {
      question: 'Can I talk to someone about Amana Living Retirement Villages?',
      answer: 'We welcome phone enquiries. Please call us on 1300 26 26 26 and talk to our friendly Customer Service Centre staff who can put you through to the best person in our retirement village team. We have a wide range of independent living options available to suit all financial situations, please call to discuss.'
    },
    {
      question: 'What style of retirement living does Amana Living offer?',
      answer: 'Amana Living offers a variety of retirement living options including independent living units, assisted living, and memory care services designed to meet different needs and preferences.'
    },
    {
      question: 'How much will it cost me to live in a retirement village?',
      answer: 'Costs vary depending on the type of accommodation and services you choose. We offer a range of options to suit different budgets. Please contact us for detailed pricing information.'
    },
    {
      question: 'Why would I choose an Amana Living retirement village?',
      answer: 'Amana Living provides exceptional care, beautiful facilities, and a vibrant community atmosphere. Our villages are designed to enhance your lifestyle while providing the support you need.'
    },
    {
      question: 'How can I find a retirement village that\'s right for me?',
      answer: 'We recommend visiting our villages to see the facilities and meet the community. Contact us to arrange a tour and speak with our friendly staff about your specific needs.'
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
                  Moline Village
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  You won&apos;t find a better located or more affordable village in Karrinyup than Moline Village. 
                  It&apos;s in a quiet and convenient pocket of the suburb, opposite bushlands and nature reserves.
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

            {/* Right Column - Image Gallery */}
            <div>
              <ImageGallery images={galleryImages} />
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
                  Nestled in the heart of Karrinyup.
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Moline Village is the perfect spot to take advantage of the enviable Karrinyup lifestyle, 
                    close to Trigg Beach, and the multi-million dollar redevelopments of Scarborough Beach and 
                    Karrinyup Shopping Centre. Enjoy scenic walks in the Trigg Bushland Reserve, hit a hole in 
                    one at a local golf course or head to Perth&apos;s CBD which is only 14km away.
                  </p>
                  <p>
                    Designed for over 55s, the village offers easy living with low maintenance homes in a 
                    tranquil setting. Feel safe and secure in this friendly village which has an active and 
                    welcoming community. You can take part in the many social activities or make the most of 
                    the village&apos;s amenities including swimming pool, mini gym, library, bocce court, mini golf 
                    range and more.
                  </p>
                  <p>
                    Each floor has a large communal sunroom where you can unwind with a beverage and a good 
                    book or meet up with friends. Plus, there is a general store run by resident volunteers, 
                    and visiting services including hair salon, beauty therapist, massage therapist, and 
                    podiatrist. There&apos;s also a weekly shopper bus service to the local shopping centre.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-gray-600 text-2xl">👩</span>
                </div>
                <h4 className="text-xl font-bold text-black">Lorraine Baldwin</h4>
                <p className="text-gray-700">
                  Interested in finding our more information or booking a tour of Moline Village? 
                  Get in touch with Lorraine our friendly consultant.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-white border border-black text-black hover:bg-gray-100">
                    📞 Call Lorraine to book a tour
                  </Button>
                  <a href="#" className="block text-black hover:underline flex items-center justify-center gap-1">
                    Email Lorraine
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
              View available units at Moline Village
            </h3>
            <p className="text-gray-700">
              Discover the range of options available
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
              quote="Moving to Moline has been so amazing. The community is wonderful and the amenities are so enjoyable. It's close to the beach and shops - I couldn't ask for anything more"
              author="Jane Smith"
              role="Resident"
              location="Moline Village"
              rating={5}
            />
            
            <div className="bg-gray-200 rounded-lg flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-600 text-2xl">🏔️</span>
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
            title="Close to the beach, parks and shops"
            description="Moline Village is spectacularly located in south Karrinyup, walking distance from the beach, parks, public transport and Karrinyup Shopping Centre."
            address="1 Jeanes Road, Karrinyup, WA 6018"
            amenities={nearbyAmenities}
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
                  Expand your experience
                </h3>
                <p className="text-gray-700 mb-6">
                  Beyond the standard services at Moline Village, there are a number of additional options to purchase including:
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
                  Have questions about our villages? We&apos;re here to help. Feel free to contact us by clicking the button below.
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
                Book a tour of Moline Village
              </h2>
              <p className="text-lg text-gray-300">
                Interested to view the village in person? Book a tour today.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-200 rounded-lg flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-600 text-2xl">🏔️</span>
                  </div>
                  <p className="text-gray-600 text-sm">Image placeholder</p>
                </div>
              </div>
              
              <Button className="w-full bg-white text-gray-800 hover:bg-gray-100">
                Book a tour with Lorraine
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}