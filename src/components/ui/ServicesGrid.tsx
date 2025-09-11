import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Service {
  name: string
  icon?: string
  iconSvg?: string // New property for SVG file path
}

interface ServicesGridProps {
  title: string
  subtitle: string
  description?: string
  services: Service[]
  className?: string
  variant?: 'default' | 'light' // light variant for colored backgrounds
}

export function ServicesGrid({
  title,
  subtitle,
  description,
  services,
  className,
  variant = 'default'
}: ServicesGridProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center">
        <h2 className={cn(
          "text-sm font-bold uppercase mb-2",
          variant === 'light' ? 'text-white' : 'text-gray-500'
        )}>
          {title}
        </h2>
        <h3 className={cn(
          "text-2xl md:text-3xl font-bold mb-4",
          variant === 'light' ? 'text-white' : 'text-black'
        )}>
          {subtitle}
        </h3>
        {description && (
          <p className={cn(
            "max-w-2xl mx-auto",
            variant === 'light' ? 'text-white' : 'text-gray-700'
          )}>
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              {service.iconSvg ? (
                <Image
                  src={service.iconSvg}
                  alt={service.name}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  sizes="32px"
                />
              ) : (
                <span className="text-gray-600 text-2xl">
                  {service.icon || '📦'}
                </span>
              )}
            </div>
            <h4 className={cn(
              "font-medium text-sm",
              variant === 'light' ? 'text-white' : 'text-black'
            )}>{service.name}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}