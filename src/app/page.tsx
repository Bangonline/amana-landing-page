import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Map } from "@/components/ui/Map"
import { Header } from "@/components/layout/Header"
import { Breadcrumb } from "@/components/layout/Breadcrumb"

export default function Home() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Retirement Villages", href: "/retirement-villages" },
    { label: "Retirement Village Locations", href: "/retirement-villages/locations" },
    { label: "Moline Village, Karrinyup" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      {/* Hero Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #bed1e3 0%, #e6f2ff 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6" style={{ color: '#1a202c' }}>
              Amana Living Retirement Villages
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: '#333333' }}>
              Discover luxury retirement living with Amana Living. Find your perfect home in our beautiful retirement villages across Western Australia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Explore Villages
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-8">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Village Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4 font-bold uppercase tracking-wide" style={{ color: '#1a202c' }}>
              Our Retirement Villages
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
              Explore our retirement village locations and discover the perfect place for your golden years.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Moline Village</CardTitle>
                <CardDescription>
                  Located in Karrinyup with exceptional amenities and personalized care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: '#333333' }}>
                  You won&apos;t find a better located or more affordable village in Karrinyup than Moline Village. 
                  It&apos;s in a quiet and convenient pocket of the suburb, opposite bushlands and nature reserves.
                </p>
                <Link href="/location-1">
                  <Button className="w-full">Visit Moline Village</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Riverside Village</CardTitle>
                <CardDescription>
                  Modern retirement living in a beautiful riverside setting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4" style={{ color: '#333333' }}>
                  Discover contemporary amenities with the tranquility of nature, creating the perfect 
                  environment for your golden years.
                </p>
                <Link href="/location-2">
                  <Button className="w-full">Visit Riverside Village</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-amana-background-offwhite">
        <div className="amana-container">
          <div className="text-center mb-16">
            <h2 className="amana-section-heading text-3xl mb-4">
              Why Choose Amana Living?
            </h2>
            <p className="text-lg text-amana-text-muted max-w-2xl mx-auto">
              Experience the perfect blend of independence, community, and care in our thoughtfully designed retirement villages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-amana-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amana-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <CardTitle>Independent Living</CardTitle>
                <CardDescription>
                  Maintain your independence while enjoying the security and community of village life.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-amana-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amana-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <CardTitle>Vibrant Community</CardTitle>
                <CardDescription>
                  Join an active community with social activities, events, and lifelong friendships.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-amana-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amana-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <CardTitle>Peace of Mind</CardTitle>
                <CardDescription>
                  Enjoy security, maintenance-free living, and access to care services when needed.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="amana-container">
          <div className="text-center mb-12">
            <h2 className="amana-section-heading text-3xl mb-4">
              Find Your Perfect Location
            </h2>
            <p className="text-lg text-amana-text-muted max-w-2xl mx-auto">
              Discover our retirement villages across Western Australia, each offering unique amenities and lifestyle opportunities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Map 
              latitude={-31.9505} 
              longitude={115.8605} 
              height="500px"
              markers={[
                {
                  lat: -31.9505,
                  lng: 115.8605,
                  title: "Perth CBD",
                  description: "Central business district"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#00aeef' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Next Chapter?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: '#e0f2fe' }}>
            Contact us today to learn more about our retirement villages and find the perfect home for your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 bg-white hover:bg-gray-50" style={{ color: '#00aeef' }}>
              Schedule a Tour
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white" style={{ color: 'white' }}>
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}