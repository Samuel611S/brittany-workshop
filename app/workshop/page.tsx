'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, ExternalLink, Star, ArrowLeft } from 'lucide-react'
import SignupModal from '@/components/SignupModal'
import ProgressBar from '@/components/ProgressBar'
import ModuleCard from '@/components/ModuleCard'
import { useLanguage } from '@/lib/language-context'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { modules, learningTracks, getTotalModules } from '@/data/modules'

export default function WorkshopPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState({ message: '', rating: 5 })
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const router = useRouter()
  const { language, t } = useLanguage()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/progress')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setIsAuthenticated(true)
          setCompletedModules(data.progress || [])
        } else {
          // Redirect to login if not authenticated
          router.push('/?login=true')
        }
      } else {
        // Redirect to login if not authenticated
        router.push('/?login=true')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      // Redirect to login if not authenticated
      router.push('/?login=true')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartLearning = async () => {
    // Track the event
    await fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'clickedStart' }),
    })

    const externalUrl = process.env.NEXT_PUBLIC_WORKSHOP_EXTERNAL_URL
    if (externalUrl) {
      // Track outbound course click
      await fetch('/api/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'outboundCourse' }),
      })
      window.open(externalUrl, '_blank')
    } else {
      // Navigate to first module
      router.push('/modules/welcome')
    }
  }

  const handleModuleToggle = (slug: string) => {
    setCompletedModules(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    )
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingFeedback(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      })

      if (response.ok) {
        setFeedbackSubmitted(true)
        setFeedback({ message: '', rating: 5 })
      }
    } catch (error) {
      console.error('Feedback submission failed:', error)
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access the Workshop
            </h1>
            <p className="text-gray-600 mb-6">
              Sign up to access all workshop materials and track your progress.
            </p>
            <button
              onClick={() => setIsSignupOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up Now
            </button>
          </div>
        </div>
        <SignupModal
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
          onSuccess={() => {
            setIsAuthenticated(true)
            checkAuth()
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                {t.back}
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">NK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NextKey Housing Access Foundation</h1>
                <p className="text-sm text-gray-600">Learning Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <button
              onClick={handleStartLearning}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              {process.env.NEXT_PUBLIC_WORKSHOP_EXTERNAL_URL ? (
                <>
                  Start Learning
                  <ExternalLink className="h-4 w-4" />
                </>
              ) : (
                'Start Learning'
              )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Progress</h2>
          <ProgressBar 
            completed={completedModules.length} 
            total={getTotalModules()} 
          />
        </div>

        {/* Modules by Track */}
        <div className="space-y-8">
          {learningTracks.map((track) => {
            return (
              <div key={track.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${
                    track.color === 'blue' ? 'bg-blue-500' :
                    track.color === 'green' ? 'bg-green-500' :
                    track.color === 'purple' ? 'bg-purple-500' :
                    track.color === 'orange' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`} />
                  <h3 className="text-xl font-semibold text-gray-900">{track.name}</h3>
                  <span className="text-sm text-gray-500">({track.modules.length} modules)</span>
                </div>
                <p className="text-gray-600 mb-4">{track.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {track.modules.map((module) => (
                    <ModuleCard
                      key={module.slug}
                      slug={module.slug}
                      title={module.title}
                      summary={module.summary}
                      isCompleted={completedModules.includes(module.slug)}
                      onToggleComplete={handleModuleToggle}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Feedback</h3>
          {feedbackSubmitted ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-lg font-medium mb-2">Thank you for your feedback!</div>
              <p className="text-gray-600">Your input helps us improve the workshop.</p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate this workshop?
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFeedback(prev => ({ ...prev, rating }))}
                      className={`p-2 rounded ${
                        feedback.rating >= rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional comments (optional)
                </label>
                <textarea
                  id="message"
                  value={feedback.message}
                  onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us what you think about the workshop..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingFeedback}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}


