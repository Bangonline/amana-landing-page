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
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="https://www.amanaliving.com.au/" className="flex-shrink-0">
              <Image
                src="/amana-logo.svg"
                alt="Amana Living"
                width={180}
                height={50}
                className="h-10 w-auto"
                sizes="180px"
              />
            </Link>

            {/* Center section with "A part of the Anglican Community" and navigation */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              <span className="text-sm text-gray-600 font-medium">A part of the Anglican Community</span>
              <nav className="flex items-center space-x-6">
                <Link href="https://www.amanaliving.com.au/about-us" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  About Us
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/news-and-events" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  News
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/how-you-can-help/donate" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  Donate
                </Link>
                <Link href="https://careers.amanaliving.com.au/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  Careers
                </Link>
                <Link href="https://training.amanaliving.com.au" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  Training
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/how-you-can-help/volunteer" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  Volunteer
                </Link>
                <Link href="https://www.amanaliving.com.au/contact-us" className="text-sm text-gray-800 hover:text-gray-600 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Right section with phone and search */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:1300262626" className="text-sm font-bold text-gray-800 hover:text-gray-600 transition-colors">
                Contact us: 1300 26 26 26
              </a>
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
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
      <div style={{ backgroundColor: '#1C3F95' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-4">
            {/* Main Navigation Links */}
            <div className="hidden sm:flex items-center space-x-8">
              <Link href="https://www.amanaliving.com.au/home-care/our-home-care-services" className="text-white hover:text-orange-400 transition-colors text-sm font-medium">
                Home Care
              </Link>
              <Link href="https://www.amanaliving.com.au/retirement-villages" className="text-orange-400 border-b-2 border-orange-400 text-sm font-medium pb-1">
                Retirement Villages
              </Link>
              <Link href="https://www.amanaliving.com.au/nursing-homes" className="text-white hover:text-orange-400 transition-colors text-sm font-medium">
                Aged Care Homes
              </Link>
              <Link href="https://www.amanaliving.com.au/other-care-services/respite-care/mosman-park" className="text-white hover:text-orange-400 transition-colors text-sm font-medium">
                Respite
              </Link>
              <Link href="https://www.amanaliving.com.au/other-care-services/transition-care" className="text-white hover:text-orange-400 transition-colors text-sm font-medium">
                Transition Care
              </Link>
              <Link href="https://www.amanaliving.com.au/other-care-services" className="text-white hover:text-orange-400 transition-colors text-sm font-medium">
                Other Care Services
              </Link>
            </div>

            {/* Right side - Search and Call Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 text-white hover:text-orange-400 transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
              <a href="tel:1300262626" className="flex items-center px-4 py-2 bg-orange-400 text-white rounded text-sm font-medium hover:bg-orange-500 transition-colors">
                Call us
              </a>
            </div>

            {/* Mobile Call Button */}
            <div className="sm:hidden">
              <a href="tel:1300262626" className="flex items-center px-3 py-2 bg-orange-400 text-white rounded text-sm font-medium">
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
                <Link href="https://careers.amanaliving.com.au/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Careers
                </Link>
                <Link href="https://training.amanaliving.com.au" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-gray-800 transition-colors">
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