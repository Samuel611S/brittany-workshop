'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, CheckCircle, Users, BookOpen, Award, Target, Brain, MessageSquare, Mail, Instagram, Facebook } from 'lucide-react'
import SignupModal from '@/components/SignupModal'
import LoginModal from '@/components/LoginModal'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import FeedbackForm from '@/components/FeedbackForm'
import { useLanguage } from '@/lib/language-context'
import { useUser } from '@/lib/user-context'
import { learningTracks } from '@/data/modules'
import { learningTracksEs } from '@/data/modules-es'

export default function HomePage() {
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const { language, t } = useLanguage()
  const { user, logout } = useUser()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('login') === 'true') {
      setIsLoginOpen(true)
    }
  }, [searchParams])

  const handleSignupSuccess = () => {
    // Could show a success toast here
    console.log('Signup successful')
  }

  const handleLoginSuccess = () => {
    // Redirect to workshop page
    window.location.href = '/workshop'
  }

  const handleFeedbackSubmit = async (message: string, rating: number) => {
    setIsSubmittingFeedback(true)
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          rating,
        }),
      })

      if (response.ok) {
        setFeedbackSubmitted(true)
        // Reset after 5 seconds
        setTimeout(() => setFeedbackSubmitted(false), 5000)
      } else {
        alert('Failed to submit feedback. Please try again.')
      }
    } catch (error) {
      console.error('Feedback submission failed:', error)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  // Get the appropriate tracks based on language
  const tracks = language === 'es' ? learningTracksEs : learningTracks

  const getTrackColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
            {t.heroDescription}
          </p>
        </div>

        {/* Community Survey Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg p-4 sm:p-8 mb-12 sm:mb-16">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{t.surveyTitle}</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 max-w-3xl mx-auto px-2">
              {t.surveyDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{t.priorityTopics}</h3>
                <p className="text-sm text-gray-600">{t.priorityTopicsDesc}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{t.communityNeeds}</h3>
                <p className="text-sm text-gray-600">{t.communityNeedsDesc}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{t.partnershipOpportunities}</h3>
                <p className="text-sm text-gray-600">{t.partnershipDesc}</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">
              {t.takeSurvey}
            </button>
          </div>
        </div>

        {/* Learning Tracks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {tracks.map((track) => (
            <div key={track.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">{track.name}</h2>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{track.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm">👥 {t.audience}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{track.audience}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm">⏱️ {t.timeCommitment}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{track.timeCommitment}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">🎯 {t.learningOutcomes}</h3>
                  <ul className="space-y-1">
                    {track.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start text-gray-600 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modules */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-xs sm:text-sm">📚 {t.modulesInTrack}</h3>
                <div className="space-y-2">
                  {track.modules.map((module, index) => (
                    <div key={module.slug} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-blue-600 text-white text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </span>
                          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">{module.title}</h4>
                          {module.duration && (
                            <span className="text-xs text-gray-500 hidden sm:inline">({module.duration})</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-xs ml-4 sm:ml-7 leading-relaxed">{module.summary}</p>
                        {module.duration && (
                          <span className="text-xs text-gray-500 sm:hidden ml-4">({module.duration})</span>
                        )}
                      </div>
                      <button className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-xs self-start sm:self-auto">
                        {t.start}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors text-xs sm:text-sm ${
                track.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                track.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                track.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                track.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                'bg-red-600 hover:bg-red-700'
              }`}>
                {t.begin} {track.name}
              </button>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-lg shadow-sm p-4 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <MessageSquare className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t.shareFeedback || 'Share Your Feedback'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t.feedbackDescription || 'Help us improve our workshops by sharing your experience'}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <FeedbackForm
              onSubmit={handleFeedbackSubmit}
              isSubmitting={isSubmittingFeedback}
              submitted={feedbackSubmitted}
            />
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 sm:mt-16 bg-gray-50 rounded-lg p-4 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{t.needHelp}</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
            {t.helpDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a href={`mailto:${t.contactEmail}`} className="flex items-center text-blue-600 hover:text-blue-700 text-sm sm:text-base">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {t.contactEmail}
            </a>
            <a href="https://instagram.com/nextkeyhousing" className="flex items-center text-pink-600 hover:text-pink-700 text-sm sm:text-base">
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {t.instagram}
            </a>
            <a href="https://facebook.com/nextkeyhousing" className="flex items-center text-blue-600 hover:text-blue-700 text-sm sm:text-base">
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {t.facebook}
            </a>
          </div>
        </div>
      </div>

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSuccess={handleSignupSuccess}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        onOpenSignup={() => setIsSignupOpen(true)}
      />
    </div>
  )
}


