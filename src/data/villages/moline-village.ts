import { VillageData } from '@/types/village'

export const molineVillageData: VillageData = {
  // Basic info
  name: 'Moline Village',
  slug: 'moline-village',
  propertyType: 'moline',
  
  // Hero section
  heroTitle: 'Moline Village',
  heroDescription: 'You won\'t find a better located or more affordable village in Karrinyup than Moline Village. It\'s in a quiet and convenient pocket of the suburb, opposite bushlands and nature reserves.',
  amenities: [
    'Swimming pool',
    'Gymnasium', 
    'Mini golf',
    'Community Centre',
    'Games room'
  ],
  galleryImages: [
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0553.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0552.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0550.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0614.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0610.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0569.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0570.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0560.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0562.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0563.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0564.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0580.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0575.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0573.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0556.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0607.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0592.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0604.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0594.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0583.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0585.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/moline-village/0554.jpg'
  ],
  
  // Overview section
  overviewTitle: 'Nestled in the heart of Karrinyup.',
  overviewContent: [
    'Moline Village is the perfect spot to take advantage of the enviable Karrinyup lifestyle, close to Trigg Beach, and the multi-million dollar redevelopments of Scarborough Beach and Karrinyup Shopping Centre. Enjoy scenic walks in the Trigg Bushland Reserve, hit a hole in one at a local golf course or head to Perth\'s CBD which is only 14km away.',
    'Designed for over 55s, the village offers easy living with low maintenance homes in a tranquil setting. Feel safe and secure in this friendly village which has an active and welcoming community. You can take part in the many social activities or make the most of the village\'s amenities including swimming pool, mini gym, library, bocce court, mini golf range and more.',
    'Each floor has a large communal sunroom where you can unwind with a beverage and a good book or meet up with friends. Plus, there is a general store run by resident volunteers, and visiting services including hair salon, beauty therapist, massage therapist, and podiatrist. There\'s also a weekly shopper bus service to the local shopping centre.'
  ],
  consultant: {
    name: 'Lorraine Baldwin',
    image: '/images/lorraine.jpeg',
    description: 'Interested in finding our more information or booking a tour of Moline Village? Get in touch with Lorraine our friendly consultant.'
  },
  
  // Location section
  location: {
    title: 'Close to the beach, parks and shops',
    description: 'Moline Village is spectacularly located in south Karrinyup, walking distance from the beach, parks, public transport and Karrinyup Shopping Centre.',
    address: '1 Jeanes Road, Karrinyup, WA 6018',
    latitude: -31.8476,
    longitude: 115.7780,
    mapTitle: 'Moline Village'
  },
  nearbyAmenities: [
    { name: 'Medical Surgery', distance: '1 km' },
    { name: 'Hospital', distance: '8.6 kms' },
    { name: 'Shopping centre', distance: '1 km' },
    { name: 'Bus stop', distance: '2 km' },
    { name: 'Train station', distance: '3.8 km' },
    { name: 'Perth city', distance: '11.5 km' }
  ],
  
  // Services sections
  lifestyleServices: [
    { name: 'Swimming Pool', iconSvg: '/images/icons/swimming-pool.svg' },
    { name: 'Gymnasium', iconSvg: '/images/icons/personal-care.svg' },
    { name: 'Bowling Green', iconSvg: '/images/icons/Community.svg' },
    { name: 'Mini Golf', iconSvg: '/images/icons/Social-Outings-purple.svg' },
    { name: 'Games Room', iconSvg: '/images/icons/cooking.svg' },
    { name: 'Community Centre', iconSvg: '/images/icons/Community.svg' },
    { name: 'Hairdresser', iconSvg: '/images/icons/Hair-salon.svg' },
    { name: 'Transport', iconSvg: '/images/icons/car.svg' }
  ],
  additionalServices: [
    { name: 'Cleaning', iconSvg: '/images/icons/cleaning.svg' },
    { name: 'Meals', iconSvg: '/images/icons/cooking.svg' },
    { name: 'Personal care', iconSvg: '/images/icons/personal-care.svg' },
    { name: 'Dietitian', iconSvg: '/images/icons/Dietitian-purple.svg' },
    { name: 'Laundry', iconSvg: '/images/icons/laundry.svg' },
    { name: 'Social outings', iconSvg: '/images/icons/Social-Outings-purple.svg' }
  ],
  
  // Content sections
  testimonial: {
    quote: 'Moving to Moline has been so amazing. The community is wonderful and the amenities are so enjoyable. It\'s close to the beach and shops - I couldn\'t ask for anything more',
    author: 'Jane Smith',
    role: 'Resident',
    location: 'Moline Village',
    rating: 5
  },
  faqItems: [
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
  ],
  
  // Navigation
  breadcrumbItems: [
    { label: 'HOME', href: '/' },
    { label: 'RETIREMENT VILLAGES', href: '/retirement-villages' },
    { label: 'MOLINE VILLAGE' }
  ]
}
