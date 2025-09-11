'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  className?: string
  showThumbnails?: boolean
  aspectRatio?: 'square' | '4/3'
  selectedIndex?: number
  onImageChange?: (index: number) => void
}

export function ImageGallery({ 
  images, 
  className, 
  showThumbnails = true, 
  aspectRatio = 'square',
  selectedIndex,
  onImageChange
}: ImageGalleryProps) {
  const [internalSelectedImage, setInternalSelectedImage] = useState(0)
  
  // Use controlled or uncontrolled mode
  const selectedImage = selectedIndex !== undefined ? selectedIndex : internalSelectedImage
  
  const handleImageChange = useCallback((index: number) => {
    if (selectedIndex === undefined) {
      setInternalSelectedImage(index)
    }
    onImageChange?.(index)
  }, [selectedIndex, onImageChange])

  // Sync with external selectedIndex changes
  useEffect(() => {
    if (selectedIndex !== undefined) {
      setInternalSelectedImage(selectedIndex)
    }
  }, [selectedIndex])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        const newIndex = selectedImage > 0 ? selectedImage - 1 : images.length - 1
        handleImageChange(newIndex)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        const newIndex = selectedImage < images.length - 1 ? selectedImage + 1 : 0
        handleImageChange(newIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, images.length, handleImageChange])

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image */}
      <div className={cn(
        'bg-gray-200 rounded-lg overflow-hidden',
        aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/3]'
      )}>
        <Image
          src={images[selectedImage]}
          alt={`Gallery image ${selectedImage + 1}`}
          width={600}
          height={600}
          className="w-full h-full object-cover transition-opacity duration-300"
          priority={selectedImage === 0}
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>
      
      {/* Thumbnail Gallery */}
      {showThumbnails && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={cn(
                'aspect-square rounded overflow-hidden transition-all duration-200 cursor-pointer',
                selectedImage === index
                  ? 'ring-2 ring-black ring-offset-2'
                  : 'hover:opacity-80'
              )}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={120}
                height={120}
                className="w-full h-full object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}