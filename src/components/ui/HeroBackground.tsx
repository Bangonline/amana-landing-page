import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeroBackgroundProps {
  children: ReactNode
  className?: string
}

export function HeroBackground({ children, className }: HeroBackgroundProps) {
  return (
    <div className={cn('relative overflow-hidden bg-gray-50', className)}>
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100" />
      
      {/* SVG Background Pattern */}
      <div className="absolute inset-0">
        <svg 
          className="absolute inset-0 w-full h-full text-white" 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main curved shape */}
          <path 
            d="M0 800V0H1200C1120 40 960 160 720 320C480 480 420 520 280 680C200 740 140 780 80 800H0Z" 
            fill="currentColor"
            className="opacity-80"
          />
          {/* Secondary curved shape for depth */}
          <path 
            d="M0 800V100H1000C940 130 820 200 620 340C420 480 380 510 260 650C190 710 130 760 70 800H0Z" 
            fill="currentColor"
            className="opacity-60"
          />
          {/* Subtle accent curves */}
          <path 
            d="M200 0C180 80 140 160 80 240C20 320 0 400 0 500V0H200Z" 
            fill="currentColor"
            className="opacity-40"
          />
        </svg>
      </div>
      
      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-white/20" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
