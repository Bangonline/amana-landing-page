import { Metadata } from 'next'
import { VillageTemplate } from '@/components/templates/VillageTemplate'
import { molineVillageData } from '@/data/villages/moline-village'

export const metadata: Metadata = {
  title: 'Retirement Villages - Moline Village | Amana Living',
  description: 'Moline Village is the perfect spot to take advantage of the enviable Karrinyup lifestyle, close to Trigg Beach, and the multi-million dollar redevelopments of Scarborough Beach and Karrinyup Shopping Centre.',
  openGraph: {
    title: 'Retirement Villages - Moline Village | Amana Living',
    description: 'Moline Village is the perfect spot to take advantage of the enviable Karrinyup lifestyle, close to Trigg Beach, and the multi-million dollar redevelopments of Scarborough Beach and Karrinyup Shopping Centre.',
    images: ['/images/locations/moline/01-feature.png'],
    url: 'https://www.amanaliving.com.au/retirement-villages/locations/moline-village',
  },
}

export default function MolineVillagePage() {
  const schema = {
    "@context": "http://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "description": "Moline Village is the perfect spot to take advantage of the enviable Karrinyup lifestyle, close to Trigg Beach, and the multi-million dollar redevelopments of Scarborough Beach and Karrinyup Shopping Centre. Enjoy scenic walks in the Trigg Bushland Reserve, hit a hole in one at a local golf course or head to Perth's CBD which is only 14km away.   Designed for over 55s, the village offers easy living with low maintenance homes in a tranquil setting. Feel safe and secure in this friendly village which has an active and welcoming community. You can take part in the many social activities or make the most of the village's amenities including swimming pool, mini gym, library, bocce court, mini golf range and more.  Each floor has a large communal sunroom where you can unwind with a beverage and a good book or meet up with friends. Plus, there is a general store run by resident volunteers, and visiting services including hair salon, beauty therapist, massage therapist, and podiatrist.  There's also a weekly shopper bus service to the local shopping centre.  These lease for life apartments are available to view by appointment.",
        "image": {
          "@type": "ImageObject",
          "url": "/images/locations/moline/01-feature.png"
        },
        "mainEntityOfPage": "https://www.amanaliving.com.au/retirement-villages/locations/moline-village",
        "name": "Retirement Villages  - Moline Village",
        "url": "https://www.amanaliving.com.au/retirement-villages/locations/moline-village"
      },
      {
        "@id": "https://www.amanaliving.com.au/#identity",
        "@type": "NGO",
        "description": "Amana Living is one of WA's largest not-for-profit providers of care and services for older people.",
        "image": {
          "@type": "ImageObject",
          "height": "108",
          "url": "https://amana-living.s3.ap-southeast-2.amazonaws.com/assets/icons/logo.svg?mtime=20210729112657&focal=none",
          "width": "142"
        },
        "logo": {
          "@type": "ImageObject",
          "height": "60",
          "url": "https://s3.ap-southeast-2.amazonaws.com/amana-living/assets/icons/_600x60_fit_center-center_82_none/102086/logo.jpg?mtime=1627529217",
          "width": "79"
        },
        "name": "Amana Living Aged Care Services",
        "sameAs": [
          "https://www.twitter.com/amanaliving",
          "facebook.com/amanaliving",
          "https://www.linkedin.com/company/amana-living",
          "https://www.youtube.com/user/Amanaliving",
          "https://www.instagram.com/amana.living"
        ],
        "url": "https://www.amanaliving.com.au/"
      },
      {
        "@id": "#creator",
        "@type": "Organization"
      },
      {
        "@type": "BreadcrumbList",
        "description": "Breadcrumbs list",
        "itemListElement": [
          {
            "@type": "ListItem",
            "item": "https://www.amanaliving.com.au/",
            "name": "Homepage",
            "position": 1
          },
          {
            "@type": "ListItem",
            "item": "https://www.amanaliving.com.au/retirement-villages",
            "name": "Retirement Villages",
            "position": 2
          },
          {
            "@type": "ListItem",
            "item": "https://www.amanaliving.com.au/retirement-villages/locations",
            "name": "Retirement Villages Locations",
            "position": 3
          },
          {
            "@type": "ListItem",
            "item": "https://www.amanaliving.com.au/retirement-villages/locations/moline-village",
            "name": "Moline Village",
            "position": 4
          }
        ],
        "name": "Breadcrumbs"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <VillageTemplate villageData={molineVillageData} />
    </>
  )
}
