import { cn } from '@/lib/utils'

interface TestimonialProps {
  quote: string
  author: string
  role: string
  location: string
  rating?: number
  className?: string
  variant?: 'default' | 'light' // light variant for colored backgrounds
}

export function Testimonial({ 
  quote, 
  author, 
  role, 
  location, 
  rating = 5, 
  className,
  variant = 'default'
}: TestimonialProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Star Rating */}
      <div className="flex gap-1">
        {Array.from({ length: rating }, (_, i) => (
          <span key={i} className={cn(
            "text-lg",
            variant === 'light' ? 'text-white' : 'text-black'
          )}>★</span>
        ))}
      </div>
      
      {/* Quote */}
      <blockquote className={cn(
        "text-lg font-bold leading-relaxed",
        variant === 'light' ? 'text-white' : 'text-black'
      )}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      
      {/* Author */}
      <div className={cn(
        "text-sm",
        variant === 'light' ? 'text-white' : 'text-gray-600'
      )}>
        {author}, {role}, {location}
      </div>
    </div>
  )
}