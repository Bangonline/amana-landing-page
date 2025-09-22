import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { Button } from './Button'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Property } from '@/types/property'

// Support both old interface and new Property interface
interface LegacyPropertyCardProps {
  title: string
  price: string
  beds: number
  baths: number
  carSpaces: number
  description: string
  isSold?: boolean
  imageUrl?: string
  className?: string
}

interface PropertyCardProps {
  property?: Property
  className?: string
}

type CombinedPropertyCardProps = PropertyCardProps | LegacyPropertyCardProps

function isLegacyProps(props: CombinedPropertyCardProps): props is LegacyPropertyCardProps {
  return 'title' in props;
}

export function PropertyCard(props: CombinedPropertyCardProps) {
  // Support both legacy props and new Property interface
  let title: string, price: string, beds: number, baths: number, carSpaces: number;
  let description: string, isSold: boolean, imageUrl: string | undefined, className: string | undefined;
  let statusMessage: string | undefined, detailsUrl: string | undefined;

  if (isLegacyProps(props)) {
    // Legacy interface support
    ({ title, price, beds, baths, carSpaces, description, className } = props);
    isSold = props.isSold || false;
    imageUrl = props.imageUrl;
  } else {
    // New Property interface
    const { property } = props;
    if (!property) {
      return null;
    }
    
    title = property.title;
    price = property.priceDisplay;
    beds = property.bedrooms;
    baths = property.bathrooms;
    carSpaces = property.carSpaces;
    description = property.description;
    isSold = property.status === 'sold';
    imageUrl = property.images[0]?.url;
    className = props.className;
    statusMessage = property.statusMessage;
    detailsUrl = property.detailsUrl || property.packageUrl;
  }

  return (
    <Card className={cn('relative overflow-hidden flex flex-col', className)}>
      {(isSold || statusMessage) && (
        <div className="absolute top-4 left-4 z-10 bg-gray-800 text-white px-3 py-1 text-sm font-medium rounded">
          {statusMessage || 'SOLD'}
        </div>
      )}
      
      <a 
        href={detailsUrl || "#"} 
        className="block aspect-square bg-gray-200 flex items-center justify-center relative hover:opacity-80 transition-opacity cursor-pointer"
        target={detailsUrl ? "_blank" : undefined}
        rel={detailsUrl ? "noopener noreferrer" : undefined}
      >
        {imageUrl && !imageUrl.includes('AUTO×AUTO') ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            className="object-cover" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center">
            <span className="text-gray-600 text-2xl">🏠</span>
          </div>
        )}
      </a>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase">{title}</CardTitle>
        <div className="text-2xl font-bold text-black">{price}</div>
      </CardHeader>
      
      <CardContent className="pt-0 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>🛏️</span>
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🚿</span>
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🚗</span>
            <span>{carSpaces}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 flex-1">{description}</p>
        
        <Button 
          onClick={() => {
            if (detailsUrl) {
              window.location.href = detailsUrl;
            }
          }}
          variant="primary"
          size="sm"
          className="w-full mt-auto"
          disabled={!detailsUrl}
        >
          View package details
        </Button>
      </CardContent>
    </Card>
  )
}