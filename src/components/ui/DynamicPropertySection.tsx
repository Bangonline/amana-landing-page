/**
 * Dynamic Property Section Component
 * 
 * This component automatically loads properties from the Amana Living main site
 * and displays them using the new property extraction system.
 */

'use client'

import { useVillageProperties } from '@/hooks/useProperties'
import { PropertyCard } from './PropertyCard'
import { VillageSlug } from '@/types/property'

interface DynamicPropertySectionProps {
  village: VillageSlug
  title?: string
  subtitle?: string
  maxProperties?: number
  showLoadingState?: boolean
}

export function DynamicPropertySection({
  village,
  title,
  subtitle,
  maxProperties = 6,
  showLoadingState = true
}: DynamicPropertySectionProps) {
  const { properties, loading, error, lastSync, refetch } = useVillageProperties(village);

  // Show loading state
  if (loading && showLoadingState) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                {subtitle}
              </h3>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse">
                <div className="p-4">
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-6 rounded mb-4"></div>
                  <div className="bg-gray-300 h-3 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">Loading latest properties from Amana Living...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                {subtitle}
              </h3>
            )}
          </div>
          
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-700 mb-4">Unable to load properties at this time.</p>
              <button 
                onClick={refetch}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (properties.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                {subtitle}
              </h3>
            )}
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-blue-700 mb-2">No properties currently available</p>
              <p className="text-blue-600 text-sm">Check back soon for new listings</p>
              {lastSync && (
                <p className="text-xs text-blue-500 mt-2">
                  Last updated: {new Date(lastSync).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show properties
  const displayProperties = properties.slice(0, maxProperties);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              {subtitle}
            </h3>
          )}
          <p className="text-gray-700">
            {properties.length} properties available at {village === 'moline' ? 'Moline Village' : 'Collier Park'}
          </p>
          {lastSync && (
            <p className="text-xs text-gray-500 mt-1">
              Updated: {new Date(lastSync).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
            />
          ))}
        </div>

        {properties.length > maxProperties && (
          <div className="text-center mt-8">
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors cursor-pointer">
              View All {properties.length} Properties
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Example Usage Components
 */

export function MolinePropertiesSection() {
  return (
    <DynamicPropertySection
      village="moline"
      title="AVAILABLE UNITS"
      subtitle="View available units at Moline Village"
      maxProperties={6}
    />
  );
}

export function RiversidePropertiesSection() {
  return (
    <DynamicPropertySection
      village="riverside"
      title="AVAILABLE UNITS"
      subtitle="View available units at Collier Park"
      maxProperties={6}
    />
  );
}