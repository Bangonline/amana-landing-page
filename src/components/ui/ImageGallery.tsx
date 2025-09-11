'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 })
  
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

  // Add keyboard navigation with focus management
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard navigation when gallery has focus
      const galleryElement = event.target as HTMLElement
      if (!galleryElement.closest('[data-image-gallery]')) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        const newIndex = selectedImage > 0 ? selectedImage - 1 : images.length - 1
        handleImageChange(newIndex)
        // Announce change to screen readers
        announceImageChange(newIndex)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        const newIndex = selectedImage < images.length - 1 ? selectedImage + 1 : 0
        handleImageChange(newIndex)
        // Announce change to screen readers
        announceImageChange(newIndex)
      } else if (event.key === 'Home') {
        event.preventDefault()
        handleImageChange(0)
        announceImageChange(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        handleImageChange(images.length - 1)
        announceImageChange(images.length - 1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, images.length, handleImageChange])

  // Auto-scroll selected thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const selectedThumbnail = thumbnailsRef.current.children[selectedImage] as HTMLElement
      if (selectedThumbnail) {
        selectedThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [selectedImage])

  // Screen reader announcement function
  const announceImageChange = (index: number) => {
    const announcement = `Image ${index + 1} of ${images.length} selected`
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', 'polite')
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'
    announcer.textContent = announcement
    document.body.appendChild(announcer)
    setTimeout(() => document.body.removeChild(announcer), 1000)
  }

  // Drag scrolling handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!thumbnailsRef.current) return
    setIsDragging(true)
    setDragStart({
      x: e.pageX - thumbnailsRef.current.offsetLeft,
      scrollLeft: thumbnailsRef.current.scrollLeft
    })
    thumbnailsRef.current.style.cursor = 'grabbing'
    thumbnailsRef.current.style.userSelect = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !thumbnailsRef.current) return
    e.preventDefault()
    const x = e.pageX - thumbnailsRef.current.offsetLeft
    const walk = (x - dragStart.x) * 2 // Multiply by 2 for faster scroll
    thumbnailsRef.current.scrollLeft = dragStart.scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (thumbnailsRef.current) {
      thumbnailsRef.current.style.cursor = 'grab'
      thumbnailsRef.current.style.userSelect = 'auto'
    }
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (thumbnailsRef.current) {
      thumbnailsRef.current.style.cursor = 'grab'
      thumbnailsRef.current.style.userSelect = 'auto'
    }
  }

  // Touch drag scrolling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!thumbnailsRef.current) return
    setIsDragging(true)
    setDragStart({
      x: e.touches[0].pageX - thumbnailsRef.current.offsetLeft,
      scrollLeft: thumbnailsRef.current.scrollLeft
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !thumbnailsRef.current) return
    const x = e.touches[0].pageX - thumbnailsRef.current.offsetLeft
    const walk = (x - dragStart.x) * 2
    thumbnailsRef.current.scrollLeft = dragStart.scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div 
      className={cn('space-y-4', className)}
      data-image-gallery
      role="region"
      aria-label="Image gallery"
    >
      {/* Main Image */}
      <div 
        className={cn(
          'bg-gray-200 rounded-lg overflow-hidden',
          aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/3]'
        )}
        role="img"
        aria-label={`Gallery image ${selectedImage + 1} of ${images.length}`}
      >
        <Image
          src={images[selectedImage]}
          alt={`Gallery image ${selectedImage + 1} of ${images.length}`}
          width={600}
          height={600}
          className="w-full h-full object-cover transition-opacity duration-300 focus:outline-none"
          priority={selectedImage === 0}
          sizes="(max-width: 768px) 100vw, 600px"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              // Could trigger fullscreen or other action here
            }
          }}
        />
      </div>
      
      {/* Scrollable Thumbnail Gallery */}
      {showThumbnails && (
        <div 
          className="relative"
          role="tablist"
          aria-label="Gallery thumbnails"
        >
          <div 
            ref={thumbnailsRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1 cursor-grab select-none"
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  // Prevent click during drag
                  if (isDragging) {
                    e.preventDefault()
                    return
                  }
                  handleImageChange(index)
                }}
                className={cn(
                  'flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none',
                  selectedImage === index
                    ? 'ring-2 ring-orange-500 ring-offset-2 scale-105'
                    : 'hover:opacity-80 hover:scale-105'
                )}
                role="tab"
                aria-selected={selectedImage === index}
                aria-controls="main-image"
                aria-label={`View image ${index + 1} of ${images.length}`}
                tabIndex={selectedImage === index ? 0 : -1}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
          
          {/* Visual indicator for scrollability */}
          <div className="absolute right-0 top-0 bottom-2 w-6 bg-gradient-to-l from-white via-white to-transparent pointer-events-none opacity-50" />
          <div className="absolute left-0 top-0 bottom-2 w-6 bg-gradient-to-r from-white via-white to-transparent pointer-events-none opacity-50" />
        </div>
      )}
      
      {/* Screen reader only instructions */}
      <div className="sr-only">
        Use arrow keys to navigate between images. Press Home to go to first image, End to go to last image.
      </div>
    </div>
  )
}