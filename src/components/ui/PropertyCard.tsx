import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
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

export function PropertyCard({
  title,
  price,
  beds,
  baths,
  carSpaces,
  description,
  isSold = false,
  imageUrl,
  className
}: PropertyCardProps) {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      {isSold && (
        <div className="absolute top-4 left-4 z-10 bg-gray-800 text-white px-3 py-1 text-sm font-medium rounded">
          SOLD
        </div>
      )}
      
      <div className="aspect-square bg-gray-200 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center">
            <span className="text-gray-600 text-2xl">🏠</span>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold uppercase">{title}</CardTitle>
        <div className="text-2xl font-bold text-black">{price}</div>
      </CardHeader>
      
      <CardContent className="pt-0">
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
        
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        
        <a 
          href="#" 
          className="text-sm font-medium text-black hover:underline flex items-center gap-1"
        >
          View package details
          <span>→</span>
        </a>
      </CardContent>
    </Card>
  )
}