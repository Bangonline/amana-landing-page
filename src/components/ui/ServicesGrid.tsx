import { cn } from '@/lib/utils'

interface Service {
  name: string
  icon?: string
}

interface ServicesGridProps {
  title: string
  subtitle: string
  description?: string
  services: Service[]
  className?: string
}

export function ServicesGrid({
  title,
  subtitle,
  description,
  services,
  className
}: ServicesGridProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center">
        <h2 className="text-sm font-bold uppercase text-gray-500 mb-2">
          {title}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
          {subtitle}
        </h3>
        {description && (
          <p className="text-gray-700 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-gray-600 text-xl">
                {service.icon || '📦'}
              </span>
            </div>
            <h4 className="font-medium text-black text-sm">{service.name}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}