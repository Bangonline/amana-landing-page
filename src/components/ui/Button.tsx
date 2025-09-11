import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const getButtonStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: '#e5734f',
            color: 'white',
            border: 'none',
          };
        case 'secondary':
          return {
            backgroundColor: 'transparent',
            color: '#e5734f',
            border: '2px solid #e5734f',
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: '#00aeef',
            border: '1px solid #00aeef',
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: '#1a202c',
            border: 'none',
          };
        default:
          return {};
      }
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer disabled:cursor-not-allowed',
          {
            // Amana Living primary button (orange)
            'text-white hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:bg-orange-600': variant === 'primary',
            // Amana Living secondary button (outline orange)
            'bg-transparent border-2 hover:text-white': variant === 'secondary',
            // Outline variant (blue outline)
            'border hover:text-white': variant === 'outline',
            // Ghost variant
            'hover:bg-gray-50': variant === 'ghost',
          },
          {
            'h-8 px-3 text-sm rounded-md': size === 'sm',
            'h-10 px-6 text-base rounded-lg': size === 'md',
            'h-12 px-8 text-lg rounded-lg': size === 'lg',
          },
          className
        )}
        style={getButtonStyles()}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }