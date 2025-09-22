import { cn } from '@/lib/utils'

interface AmenityTagProps {
  label: string
  className?: string
}

export function AmenityTag({ label, className }: AmenityTagProps) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 bg-gray-100 text-black text-xs font-medium rounded-md',
        className
      )}
    >
      {label}
    </span>
  )
}