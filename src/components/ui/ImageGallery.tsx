'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  className?: string
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image */}
      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={`Gallery image ${selectedImage + 1}`}
          width={600}
          height={600}
          className="w-full h-full object-cover transition-opacity duration-300"
          priority={selectedImage === 0}
        />
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              'aspect-square rounded overflow-hidden transition-all duration-200',
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
            />
          </button>
        ))}
      </div>
    </div>
  )
}