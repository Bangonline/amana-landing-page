import { cn } from '@/lib/utils'
import { Map } from './Map'

interface Amenity {
  name: string
  distance: string
  iconSvg: string
}

interface LocationCardProps {
  title: string
  description: string
  address: string
  amenities: Amenity[]
  mapPlaceholder?: boolean
  className?: string
  latitude?: number
  longitude?: number
  mapTitle?: string
}

export function LocationCard({
  title,
  description,
  address,
  amenities,
  mapPlaceholder = true,
  className,
  latitude,
  longitude,
  mapTitle
}: LocationCardProps) {
  return (
    <div className={cn('grid md:grid-cols-2 gap-8', className)}>
      {/* Left Column - Content */}
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
            LOCATION & AMENITIES
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
            {title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Location Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-black text-lg">📍</span>
            <div>
              <h4 className="font-bold text-black mb-1">Location</h4>
              <p className="text-gray-700 mb-2">{address}</p>
              <a 
                href={latitude && longitude ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}` : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-black hover:underline flex items-center gap-1"
              >
                Get Directions
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Nearby Amenities */}
          <div>
            <h4 className="font-bold text-black mb-3">Nearby amenities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={amenity.iconSvg}
                      alt={amenity.name}
                      className="w-6 h-6"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-black text-sm">{amenity.name}</div>
                    <div className="text-xs text-gray-600">{amenity.distance}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Map */}
      {latitude && longitude ? (
        <Map
          latitude={latitude}
          longitude={longitude}
          title={mapTitle || title}
          address={address}
          height="400px"
          className="border"
        />
      ) : mapPlaceholder ? (
        <div className="bg-gray-200 rounded-lg flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📍</span>
            </div>
            <p className="text-gray-600 text-sm">Map placeholder</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}