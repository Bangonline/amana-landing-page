'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Mobile Logo */}
            <Link href="/" className="sm:hidden">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="ml-2 text-lg font-bold" style={{ color: '#1C3F95' }}>AMANA</span>
              </div>
            </Link>

            {/* Desktop Logo */}
            <Link href="/" className="hidden sm:block">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold" style={{ color: '#1C3F95' }}>AMANA</span>
                  <span className="text-xl font-bold text-orange-500 ml-1">LIVING</span>
                </div>
              </div>
            </Link>

            {/* Desktop Top Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <span className="text-sm text-gray-600">A part of the Anglican Community</span>
              <div className="flex items-center space-x-4">
                <Link href="/about-us" className="text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  About Us
                </Link>
                <Link href="/about-us/news-and-events" className="text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  News
                </Link>
                <Link href="/about-us/how-you-can-help/donate" className="text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Donate
                </Link>
                <Link href="https://careers.amanaliving.com.au/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Careers
                </Link>
                <Link href="https://training.amanaliving.com.au" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Training
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/how-you-can-help/volunteer" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Volunteer
                </Link>
                <Link href="/contact-us" className="text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Contact
                </Link>
              </div>
              <a href="tel:1300262626" className="text-sm font-bold hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                Contact us: 1300 26 26 26
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 sm:hidden">
              <button className="p-2 hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
              <button 
                onClick={toggleMobileMenu}
                className="p-2 hover:text-orange-500 transition-colors"
                style={{ color: '#1C3F95' }}
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
            {/* Desktop Main Navigation */}
            <div className="hidden sm:flex items-center space-x-8">
              <Link href="/home-care/our-home-care-services" className="text-white hover:text-orange-500 transition-colors font-medium">
                Home Care
              </Link>
              <Link href="/retirement-villages" className="text-orange-500 border-b-2 border-orange-500 font-medium">
                Retirement Villages
              </Link>
              <Link href="/nursing-homes" className="text-white hover:text-orange-500 transition-colors font-medium">
                Aged Care Homes
              </Link>
              <Link href="/other-care-services/respite-care/mosman-park" className="text-white hover:text-orange-500 transition-colors font-medium">
                Respite
              </Link>
              <Link href="/other-care-services/transition-care" className="text-white hover:text-orange-500 transition-colors font-medium">
                Transition Care
              </Link>
              <Link href="/other-care-services" className="text-white hover:text-orange-500 transition-colors font-medium">
                Other Care Services
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <button className="p-2 text-white hover:text-orange-500 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <Link href="/home-care/our-home-care-services" className="block hover:text-orange-500 transition-colors font-medium" style={{ color: '#1C3F95' }}>
              Home Care
            </Link>
            <Link href="/retirement-villages" className="block text-orange-500 font-medium">
              Retirement Villages
            </Link>
            <Link href="/nursing-homes" className="block hover:text-orange-500 transition-colors font-medium" style={{ color: '#1C3F95' }}>
              Aged Care Homes
            </Link>
            <Link href="/other-care-services/respite-care/mosman-park" className="block hover:text-orange-500 transition-colors font-medium" style={{ color: '#1C3F95' }}>
              Respite
            </Link>
            <Link href="/other-care-services/transition-care" className="block hover:text-orange-500 transition-colors font-medium" style={{ color: '#1C3F95' }}>
              Transition Care
            </Link>
            <Link href="/other-care-services" className="block hover:text-orange-500 transition-colors font-medium" style={{ color: '#1C3F95' }}>
              Other Care Services
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <Link href="/about-us" className="block text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  About Us
                </Link>
                <Link href="/about-us/news-and-events" className="block text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  News
                </Link>
                <Link href="/about-us/how-you-can-help/donate" className="block text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Donate
                </Link>
                <Link href="https://careers.amanaliving.com.au/" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Careers
                </Link>
                <Link href="https://training.amanaliving.com.au" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Training
                </Link>
                <Link href="https://www.amanaliving.com.au/about-us/how-you-can-help/volunteer" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Volunteer
                </Link>
                <Link href="/contact-us" className="block text-sm hover:text-orange-500 transition-colors" style={{ color: '#1C3F95' }}>
                  Contact
                </Link>
              </div>
              <a href="tel:1300262626" className="block text-sm font-bold hover:text-orange-500 transition-colors mt-2" style={{ color: '#1C3F95' }}>
                Contact us: 1300 26 26 26
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
