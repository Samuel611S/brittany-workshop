'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Users, BookOpen, Award, Target, Brain, MessageSquare, Mail, Instagram, Facebook } from 'lucide-react'
import SignupModal from '@/components/SignupModal'
import { learningTracks } from '@/data/modules'

export default function HomePage() {
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const handleSignupSuccess = () => {
    // Could show a success toast here
    console.log('Signup successful')
  }

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">NK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NextKey Housing Access Foundation</h1>
                <p className="text-sm text-gray-600">Choose Your Learning Track</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">🇺🇸 English</span>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            NextKey Housing Access Foundation
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Choose Your Learning Path. NextKey Housing Access Foundation offers specialized workshop tracks 
            designed for different audiences. Select the track that best matches your role and housing goals.
          </p>
        </div>

        {/* Community Survey Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg p-8 mb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Help Shape Our Future Content!</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Your input is crucial for expanding our housing education programs. Take our 8-10 minute 
              community needs survey to help us prioritize new modules and better serve NYC's diverse housing needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Priority Topics Survey</h3>
                <p className="text-sm text-gray-600">Which housing topics need coverage most?</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Community Needs Assessment</h3>
                <p className="text-sm text-gray-600">What challenges are you facing?</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Partnership Opportunities</h3>
                <p className="text-sm text-gray-600">How can we collaborate?</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Take Community Survey
            </button>
          </div>
        </div>

        {/* Learning Tracks */}
        <div className="space-y-12">
          {learningTracks.map((track) => (
            <div key={track.id} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-6 w-6 text-gray-600" />
                    <h2 className="text-2xl font-bold text-gray-900">{track.name}</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-4">{track.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">👥 Audience</h3>
                      <p className="text-gray-600">{track.audience}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">⏱️ Time Commitment</h3>
                      <p className="text-gray-600">{track.timeCommitment}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">🎯 Learning Outcomes</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {track.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modules */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">📚 Modules in This Track</h3>
                <div className="space-y-3">
                  {track.modules.map((module, index) => (
                    <div key={module.slug} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="bg-blue-600 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <h4 className="font-semibold text-gray-900">{module.title}</h4>
                          {module.duration && (
                            <span className="text-sm text-gray-500">({module.duration})</span>
                          )}
                        </div>
                        <p className="text-gray-600 ml-9">{module.summary}</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors ml-4">
                        Start
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                track.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                track.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                track.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                track.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                'bg-red-600 hover:bg-red-700'
              }`}>
                Begin {track.name}
              </button>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Contact NextKey Housing Access Foundation for personalized guidance on which track is right for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:nextkeyfoundation@gmail.com" className="flex items-center text-blue-600 hover:text-blue-700">
              <Mail className="h-5 w-5 mr-2" />
              nextkeyfoundation@gmail.com
            </a>
            <a href="https://instagram.com/nextkeyhousing" className="flex items-center text-pink-600 hover:text-pink-700">
              <Instagram className="h-5 w-5 mr-2" />
              @nextkeyhousing
            </a>
            <a href="https://facebook.com/nextkeyhousing" className="flex items-center text-blue-600 hover:text-blue-700">
              <Facebook className="h-5 w-5 mr-2" />
              NextKey Housing Access Foundation
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="mb-2">&copy; 2025 NextKey Housing Access Foundation. All rights reserved.</p>
            <p className="text-sm text-gray-400 mb-4">Educational workshops designed for community empowerment.</p>
            <p className="text-sm text-gray-400">
              This educational material is protected by copyright law. Not legal advice.
            </p>
          </div>
        </div>
      </footer>

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSuccess={handleSignupSuccess}
      />
    </div>
  )
}


