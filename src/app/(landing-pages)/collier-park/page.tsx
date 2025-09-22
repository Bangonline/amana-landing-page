import { Metadata } from 'next'
import { VillageTemplate } from '@/components/templates/VillageTemplate'
import { collierParkData } from '@/data/villages/collier-park'

export const metadata: Metadata = {
  title: 'Retirement Villages - Collier Park Village | Amana Living',
  description: 'Nestled in Como, Collier Park Village provides exclusive independent living accommodation for individuals aged 55 and above, surrounded by beautifully landscaped gardens.',
  openGraph: {
    title: 'Retirement Villages - Collier Park Village | Amana Living',
    description: 'Nestled in Como, Collier Park Village provides exclusive independent living accommodation for individuals aged 55 and above, surrounded by beautifully landscaped gardens.',
    images: ['/images/locations/collier-park/01-feature.jpg'],
    url: 'https://www.amanaliving.com.au/retirement-villages/locations/collier-park',
  },
}

export default function CollierParkPage() {
  const schema = {
    "@context": "http://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "description": "Nestled in Como, Collier Park Village provides exclusive independent living accommodation for individuals aged 55 and above, surrounded by beautifully landscaped gardens. Our village boasts 169 two-bedroom independent villas, along with community and leisure centres, all designed to enhance your living experience. We are also pet friendly!  Collier Park Village offers two meeting venues on-site for our residents' convenience. The Community Centre, available to residents and their families, is a charming and well-equipped space for social gatherings and community events. Our village thrives on a vibrant social committee and the generous volunteerism of residents, ensuring a diverse range of activities and events such as cards, bingo, afternoon teas, and exercise classes, all held exclusively for our residents' enjoyment in the Community Centre. Additionally, our comprehensive library offers a wide selection of movies for borrowing, providing ample opportunities for relaxation and entertainment.",
        "image": {
          "@type": "ImageObject",
          "url": "/images/locations/collier-park/01-feature.jpg"
        },
        "mainEntityOfPage": "https://www.amanaliving.com.au/retirement-villages/locations/collier-park",
        "name": "Retirement Villages  - Collier Park Village",
        "url": "https://www.amanaliving.com.au/retirement-villages/locations/collier-park"
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
            "item": "https://www.amanaliving.com.au/retirement-villages/locations/collier-park",
            "name": "Collier Park Village",
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
      <VillageTemplate villageData={collierParkData} />
    </>
  )
}
