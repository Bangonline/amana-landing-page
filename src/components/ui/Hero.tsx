import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  children?: ReactNode
  className?: string
}

export function Hero({ 
  title, 
  subtitle, 
  description, 
  backgroundImage, 
  children, 
  className 
}: HeroProps) {
  return (
    <section 
      className={cn(
        'relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat',
        className
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        {subtitle && (
          <p className="text-lg md:text-xl mb-4 font-light">
            {subtitle}
          </p>
        )}
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        
        {description && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        
        {children && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}