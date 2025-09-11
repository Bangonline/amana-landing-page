import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeroBackgroundProps {
  children: ReactNode
  className?: string
}

export function HeroBackground({ children, className }: HeroBackgroundProps) {
  return (
    <div className={cn('relative overflow-hidden', className)} style={{ backgroundColor: '#BED1E3' }}>
      {/* SVG Background Pattern - very subtle */}
      <div className="absolute inset-0">
        <svg 
          className="absolute inset-0 w-full h-full text-white" 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main curved shape - very low opacity to maintain color consistency */}
          <path 
            d="M0 800V0H1200C1120 40 960 160 720 320C480 480 420 520 280 680C200 740 140 780 80 800H0Z" 
            fill="currentColor"
            className="opacity-10"
          />
          {/* Secondary curved shape for depth */}
          <path 
            d="M0 800V100H1000C940 130 820 200 620 340C420 480 380 510 260 650C190 710 130 760 70 800H0Z" 
            fill="currentColor"
            className="opacity-5"
          />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
