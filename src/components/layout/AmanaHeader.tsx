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
      {/* Main header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar with secondary nav - only visible on desktop */}
          <div className="hidden lg:flex items-center justify-between h-12 border-b border-gray-200">
            <div className="text-sm text-gray-600 font-medium">
              A PART OF THE ANGLICAN COMMUNITY
            </div>
            <div className="flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">About Us</Link>
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">News</Link>
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Donate</Link>
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Careers</Link>
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Training</Link>
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Volunteer</Link>
                <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Contact</Link>
              </nav>
              <div className="text-sm font-semibold text-gray-900">
                Contact us: 1300 26 26 26
              </div>
            </div>
          </div>
          
          {/* Main header content */}
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="https://amanaliving.com.au" className="flex items-center">
                <Image
                  src="/amana-logo.svg"
                  alt="Amana Living"
                  width={240}
                  height={80}
                  className="h-16 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center bg-blue-900 rounded-lg overflow-hidden">
                <Link href="#" className="px-4 py-3 text-white text-sm font-medium hover:bg-blue-800 transition-colors first:rounded-l-lg">
                  Home Care
                </Link>
                <Link href="#" className="px-4 py-3 text-white text-sm font-medium hover:bg-blue-800 transition-colors">
                  Retirement Villages
                </Link>
                <Link href="#" className="px-4 py-3 text-white text-sm font-medium hover:bg-blue-800 transition-colors">
                  Aged Care Homes
                </Link>
                <Link href="#" className="px-4 py-3 text-white text-sm font-medium hover:bg-blue-800 transition-colors">
                  Respite
                </Link>
                <Link href="#" className="px-4 py-3 text-white text-sm font-medium hover:bg-blue-800 transition-colors">
                  Transition Care
                </Link>
                <Link href="#" className="px-4 py-3 text-white text-sm font-medium hover:bg-blue-800 transition-colors last:rounded-r-lg">
                  Other Care Services
                </Link>
              </div>
            </nav>

            {/* Mobile menu button and call button */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button className="flex items-center px-3 py-2 border-2 border-orange-500 text-orange-500 rounded text-sm font-medium hover:bg-orange-50 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call us
              </button>
              
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Call Button */}
            <div className="hidden lg:flex">
              <button className="flex items-center px-4 py-2 border-2 border-orange-500 text-orange-500 rounded text-sm font-medium hover:bg-orange-50 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call us
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="bg-blue-900 px-4 pb-6 space-y-1">
            <Link href="#" className="block px-3 py-2 text-white text-base font-medium hover:bg-blue-800 rounded-md">
              Home Care
            </Link>
            <Link href="#" className="block px-3 py-2 text-white text-base font-medium hover:bg-blue-800 rounded-md">
              Retirement Villages
            </Link>
            <Link href="#" className="block px-3 py-2 text-white text-base font-medium hover:bg-blue-800 rounded-md">
              Aged Care Homes
            </Link>
            <Link href="#" className="block px-3 py-2 text-white text-base font-medium hover:bg-blue-800 rounded-md">
              Respite
            </Link>
            <Link href="#" className="block px-3 py-2 text-white text-base font-medium hover:bg-blue-800 rounded-md">
              Transition Care
            </Link>
            <Link href="#" className="block px-3 py-2 text-white text-base font-medium hover:bg-blue-800 rounded-md">
              Other Care Services
            </Link>
            
            <div className="pt-4 border-t border-blue-800">
              <Link href="#" className="block px-3 py-2 text-white text-sm hover:bg-blue-800 rounded-md">
                About Us
              </Link>
              <Link href="#" className="block px-3 py-2 text-white text-sm hover:bg-blue-800 rounded-md">
                News
              </Link>
              <Link href="#" className="block px-3 py-2 text-white text-sm hover:bg-blue-800 rounded-md">
                Donate
              </Link>
              <Link href="#" className="block px-3 py-2 text-white text-sm hover:bg-blue-800 rounded-md">
                Careers
              </Link>
              <Link href="#" className="block px-3 py-2 text-white text-sm hover:bg-blue-800 rounded-md">
                Training
              </Link>
              <Link href="#" className="block px-3 py-2 text-white text-sm hover:bg-blue-800 rounded-md">
                Volunteer
              </Link>
              <Link href="#" className="block px-3 py-2 text-white text-sm hover:bg-blue-800 rounded-md">
                Contact
              </Link>
            </div>

            <div className="pt-4 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call us
              </button>
              <button className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Contact us
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}