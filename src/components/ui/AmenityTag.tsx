import { cn } from '@/lib/utils'

interface AmenityTagProps {
  children: React.ReactNode
  className?: string
}

export function AmenityTag({ children, className }: AmenityTagProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 bg-gray-100 text-black text-sm font-medium rounded-md',
        className
      )}
    >
      {children}
    </span>
  )
}