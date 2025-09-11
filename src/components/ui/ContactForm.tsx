'use client'

import { useState } from 'react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  className?: string
  title?: string
  subtitle?: string
  placeholder?: string
}

export function ContactForm({ 
  className, 
  title = "Have a question?", 
  subtitle = "Ask us anything about our retirement villages and we'll get back to you.",
  placeholder = "Type your question here..."
}: ContactFormProps) {
  const [question, setQuestion] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!question.trim()) return

    setIsSubmitting(true)

    try {
      // Post to Amana Living help centre search
      const searchUrl = `https://www.amanaliving.com.au/help-centre/search?q=${encodeURIComponent(question.trim())}`
      
      // Navigate to search results in same window
      window.location.href = searchUrl
      
      // Clear the form
      setQuestion('')
    } catch (error) {
      console.error('Error submitting question:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-6 max-w-md", className)}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-black mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <Button 
          type="submit"
          disabled={!question.trim() || isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Ask Question'}
        </Button>
      </form>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Your question will be searched in our help centre for immediate answers.
      </p>
    </div>
  )
}
