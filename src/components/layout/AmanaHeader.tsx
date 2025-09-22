'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function AmanaHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Top Header Section - exact match to live site */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-3">
            {/* Logo - Left side */}
            <Link href="https://www.amanaliving.com.au/" className="flex-shrink-0">
              {/* Desktop Logo */}
              <Image
                src="/images/logo-amana-horizontal-no_byline.svg"
                alt="Amana Living"
                width={260}
                height={78}
                className="hidden sm:block h-auto w-[260px]"
                sizes="260px"
              />
              {/* Mobile Logo */}
              <Image
                src="/amana-logo.svg"
                alt="Amana Living"
                width={120}
                height={40}
                className="sm:hidden h-8 w-auto"
                sizes="120px"
              />
            </Link>

            {/* Right content - 65% column, right-aligned, stacked */}
            <div className="hidden lg:flex flex-col items-end justify-center w-[65%] ml-auto space-y-2">
              {/* Anglican Community tagline */}
              <span className="text-sm text-gray-600 font-medium uppercase">A PART OF THE ANGLICAN COMMUNITY</span>
              
              {/* Navigation links - inline */}
              <nav className="flex items-center space-x-6">
                <Link href="https://www.amanaliving.com.au/about-us" className="text-base font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                  About Us
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/news-and-events" className="text-base font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                  News
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/how-you-can-help/donate" className="text-base font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                  Donate
                </Link>
                <Link href="https://careers.amanaliving.com.au/" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                  Careers
                </Link>
                <Link href="https://training.amanaliving.com.au" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                  Training
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/how-you-can-help/volunteer" className="text-base font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                  Volunteer
                </Link>
                <Link href="https://www.amanaliving.com.au/contact-us" className="text-base font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                  Contact
                </Link>
              </nav>
              
              {/* Contact phone */}
              <a href="tel:1300262626" className="text-lg font-bold text-gray-800 hover:text-gray-600 transition-colors">
                Contact us: 1300 26 26 26
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden ml-auto">
              <a href="tel:1300262626" className="text-sm font-bold text-gray-800">
                1300 26 26 26
              </a>
              <button 
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Open menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div style={{ backgroundColor: '#004676' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-end py-4">
            {/* Main Navigation Links */}
            <div className="hidden sm:flex items-center space-x-8">
              <Link href="https://www.amanaliving.com.au/home-care/our-home-care-services" className="text-white hover:text-orange-400 transition-colors text-base font-bold">
                Home Care
              </Link>
              <Link href="https://www.amanaliving.com.au/retirement-villages" className="text-orange-400 border-b-2 border-orange-400 text-base font-bold pb-1">
                Retirement Villages
              </Link>
              <Link href="https://www.amanaliving.com.au/nursing-homes" className="text-white hover:text-orange-400 transition-colors text-base font-bold">
                Aged Care Homes
              </Link>
              <Link href="https://www.amanaliving.com.au/other-care-services/respite-care/mosman-park" className="text-white hover:text-orange-400 transition-colors text-base font-bold">
                Respite
              </Link>
              <Link href="https://www.amanaliving.com.au/other-care-services/transition-care" className="text-white hover:text-orange-400 transition-colors text-base font-bold">
                Transition Care
              </Link>
              <Link href="https://www.amanaliving.com.au/other-care-services" className="text-white hover:text-orange-400 transition-colors text-base font-bold">
                Other Care Services
              </Link>
            </div>

            {/* Mobile Call Button */}
            <div className="sm:hidden">
              <a href="tel:1300262626" className="inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md hover:shadow-lg h-8 px-3 text-sm rounded-md bg-orange-500 text-white hover:bg-orange-600">
                Call us
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <Link href="https://www.amanaliving.com.au/home-care/our-home-care-services" className="block text-gray-800 hover:text-gray-600 transition-colors font-medium">
              Home Care
            </Link>
            <Link href="https://www.amanaliving.com.au/retirement-villages" className="block text-orange-500 font-medium">
              Retirement Villages
            </Link>
            <Link href="https://www.amanaliving.com.au/nursing-homes" className="block text-gray-800 hover:text-gray-600 transition-colors font-medium">
              Aged Care Homes
            </Link>
            <Link href="https://www.amanaliving.com.au/other-care-services/respite-care/mosman-park" className="block text-gray-800 hover:text-gray-600 transition-colors font-medium">
              Respite
            </Link>
            <Link href="https://www.amanaliving.com.au/other-care-services/transition-care" className="block text-gray-800 hover:text-gray-600 transition-colors font-medium">
              Transition Care
            </Link>
            <Link href="https://www.amanaliving.com.au/other-care-services" className="block text-gray-800 hover:text-gray-600 transition-colors font-medium">
              Other Care Services
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <Link href="https://www.amanaliving.com.au/about-us" className="block text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  About Us
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/news-and-events" className="block text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  News
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/how-you-can-help/donate" className="block text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Donate
                </Link>
                <Link href="https://careers.amanaliving.com.au/" className="block text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Careers
                </Link>
                <Link href="https://training.amanaliving.com.au" className="block text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Training
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/how-you-can-help/volunteer" className="block text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Volunteer
                </Link>
                <Link href="https://www.amanaliving.com.au/contact-us" className="block text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}