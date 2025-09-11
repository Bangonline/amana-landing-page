'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

interface FAQItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}

function FAQItemComponent({ item, isOpen, onToggle }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div className="border-b border-gray-200 last:border-b-0 hover:border-blue-200 transition-colors duration-200">
      <button
        onClick={onToggle}
        className="w-full text-left py-4 flex items-center justify-between cursor-pointer hover:bg-blue-50 hover:bg-opacity-70 transition-all duration-200 ease-in-out group"
      >
        <span className="font-medium text-black pr-4 group-hover:text-blue-600 transition-colors duration-200">{item.question}</span>
        <span 
          className={cn(
            "text-gray-500 flex-shrink-0 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          ↓
        </span>
      </button>
      
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="pb-4 text-gray-700 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={cn('space-y-0', className)}>
      {items.map((item, index) => (
        <FAQItemComponent
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  )
}