'use client'

import { useState } from 'react'
import { Star, Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface FeedbackFormProps {
  onSubmit: (message: string, rating: number) => Promise<void>
  isSubmitting?: boolean
  submitted?: boolean
}

export default function FeedbackForm({ onSubmit, isSubmitting = false, submitted = false }: FeedbackFormProps) {
  const { t } = useLanguage()
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && rating > 0) {
      await onSubmit(message.trim(), rating)
      setMessage('')
      setRating(5)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          {t.feedbackSubmitted || 'Feedback Submitted!'}
        </h3>
        <p className="text-green-600">
          {t.thankYouFeedback || 'Thank you for your feedback! It helps us improve our workshops.'}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.feedback || 'Feedback'} (Optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          placeholder={t.tellUsExperience || 'Tell us about your experience with our workshops...'}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.rating || 'Rating'}
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              disabled={isSubmitting}
              className={`p-1 ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-400 transition-colors disabled:opacity-50`}
            >
              <Star className="h-6 w-6 fill-current" />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating} star{rating !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !message.trim()}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t.submitFeedback || 'Submit Feedback'}
          </>
        )}
      </button>
    </form>
  )
}
