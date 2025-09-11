import { cn } from '@/lib/utils'

interface TestimonialProps {
  quote: string
  author: string
  role: string
  location: string
  rating?: number
  className?: string
}

export function Testimonial({ 
  quote, 
  author, 
  role, 
  location, 
  rating = 5, 
  className 
}: TestimonialProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Star Rating */}
      <div className="flex gap-1">
        {Array.from({ length: rating }, (_, i) => (
          <span key={i} className="text-black text-lg">★</span>
        ))}
      </div>
      
      {/* Quote */}
      <blockquote className="text-lg font-bold text-black leading-relaxed">
        "{quote}"
      </blockquote>
      
      {/* Author */}
      <div className="text-sm text-gray-600">
        {author}, {role}, {location}
      </div>
    </div>
  )
}