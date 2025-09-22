import { VillageData } from '@/types/village'

export const collierParkData: VillageData = {
  // Basic info
  name: 'Collier Park Village',
  slug: 'collier-park',
  propertyType: 'riverside',
  
  // Hero section
  heroTitle: 'Collier Park Village',
  heroDescription: 'Peace of mind, independence and the comfort of belonging to a warm, caring community are hallmarks of the Collier Park Village lifestyle.',
  amenities: [
    'Community Centre',
    'Hairdresser', 
    'Pet Friendly',
    'Library',
    'Two Meeting Venues'
  ],
  galleryImages: [
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-6.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village-Como-INT-6.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village-Como-INT-4.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-9.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-10.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Villa-40-16-Morrison-Street-Como2A-VS.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Villa-40-16-Morrison-Street-Como3A-VS.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Villa-40-16-Morrison-Street-Como5.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Villa-40-16-Morrison-Street-Como10A-vs-003.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-3.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-12.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-22.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-18.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-8.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-4.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village1-Como-EX-35.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village-Como-INT-3.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village-Como-INT-1.jpg',
    'https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/retirementVillageLocations/photos/collier-park/Collier-Park-Village-Como-INT-5.jpg'
  ],
  
  // Overview section
  overviewTitle: 'Nestled in Como, surrounded by beauty.',
  overviewContent: [
    'Nestled in Como, Collier Park Village provides exclusive independent living accommodation for individuals aged 55 and above, surrounded by beautifully landscaped gardens. Our village boasts 169 two-bedroom independent villas, along with community and leisure centres, all designed to enhance your living experience. We are also pet friendly!',
    'Collier Park Village offers two meeting venues on-site for our residents\' convenience. The Community Centre, available to residents and their families, is a charming and well-equipped space for social gatherings and community events. Our village thrives on a vibrant social committee and the generous volunteerism of residents.',
    'Enjoy a diverse range of activities and events such as cards, bingo, afternoon teas, and exercise classes, all held exclusively for our residents\' enjoyment in the Community Centre. Additionally, our comprehensive library offers a wide selection of movies for borrowing, providing ample opportunities for relaxation and entertainment.'
  ],
  consultant: {
    firstName: 'Lorraine',
    lastName: 'Baldwin',
    phone: '0459 819 169',
    email: 'LBaldwin@amanaliving.com.au',
    description: 'Interested in finding out more information or booking a tour of Collier Park Village? Get in touch Amana Living today to learn more about our beautiful village and arrange a personalised tour.'
  },
  
  // Location section
  location: {
    title: 'Close to everything in Como',
    description: 'Collier Park Village is perfectly positioned in Como, offering peaceful village living with easy access to shopping centres, medical facilities, and public transport.',
    address: '16 Morrison Street, Como WA 6152',
    latitude: -31.9935,
    longitude: 115.8589,
    mapTitle: 'Collier Park Village'
  },
  nearbyAmenities: [
    { name: 'Medical Centre', distance: '0.8 km', iconSvg: '/images/icons/medical-surgery.svg' },
    { name: 'Hospital', distance: '15.0 km', iconSvg: '/images/icons/hospital.svg' },
    { name: 'Shopping Centre', distance: '6.0 km', iconSvg: '/images/icons/shopping-centre.svg' },
    { name: 'Bus Stop', distance: '0.1 km', iconSvg: '/images/icons/bus.svg' },
    { name: 'Train Station', distance: '2.0 km', iconSvg: '/images/icons/train.svg' },
    { name: 'Perth CBD', distance: '12.0 km', iconSvg: '/images/icons/perth.svg' }
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
    { name: 'Personal Care', iconSvg: '/images/icons/personal-care.svg' },
    { name: 'Dietitian', iconSvg: '/images/icons/Dietitian-purple.svg' },
    { name: 'Laundry', iconSvg: '/images/icons/laundry.svg' },
    { name: 'Social Outings', iconSvg: '/images/icons/Social-Outings-purple.svg' }
  ],
  
  // Content sections
  testimonial: {
    quote: 'Moving to Collier Park has been so amazing. The community is wonderful and the amenities are so enjoyable. It\'s close to shops and transport - I couldn\'t ask for anything more. The beautiful gardens make it feel like home.',
    author: 'Margaret Wilson',
    role: 'Resident',
    location: 'Collier Park Village',
    rating: 5
  },
  faqItems: [
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
  ],
  
  // Navigation
  breadcrumbItems: [
    { label: 'Home', href: 'https://www.amanaliving.com.au/' },
    { label: 'Retirement Villages', href: 'https://www.amanaliving.com.au/retirement-villages' },
    { label: 'Collier Park Village' }
  ]
}
