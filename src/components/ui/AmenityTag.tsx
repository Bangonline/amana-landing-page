import { cn } from '@/lib/utils'

interface AmenityTagProps {
  label: string
  className?: string
}

export function AmenityTag({ label, className }: AmenityTagProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 bg-gray-100 text-black text-sm font-medium rounded-md',
        className
      )}
    >
      {label}
    </span>
  )
}