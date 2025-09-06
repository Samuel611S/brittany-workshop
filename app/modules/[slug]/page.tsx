'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Circle } from 'lucide-react'
import { getModuleBySlug, modules, learningTracks } from '@/data/modules'

interface ModulePageProps {
  params: {
    slug: string
  }
}

export default function ModulePage({ params }: ModulePageProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const module = getModuleBySlug(params.slug)
  const currentIndex = modules.findIndex(m => m.slug === params.slug)
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null
  
  // Find the track this module belongs to
  const track = learningTracks.find(t => t.modules.some(m => m.slug === params.slug))

  useEffect(() => {
    checkCompletionStatus()
  }, [params.slug])

  const checkCompletionStatus = async () => {
    try {
      const response = await fetch('/api/progress')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setIsCompleted(data.progress.includes(params.slug))
        }
      }
    } catch (error) {
      console.error('Failed to check completion status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleComplete = async () => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moduleSlug: params.slug }),
      })

      if (response.ok) {
        setIsCompleted(!isCompleted)
      }
    } catch (error) {
      console.error('Failed to update progress:', error)
    }
  }

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <p className="text-gray-600 mb-6">The module you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/workshop')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Workshop
          </button>
        </div>
      </div>
    )
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <button
              onClick={() => router.push('/workshop')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Workshop
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Module {currentIndex + 1} of {modules.length}
              </span>
              <button
                onClick={handleToggleComplete}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isCompleted
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" />
                    Mark Complete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                track?.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                track?.color === 'green' ? 'bg-green-100 text-green-800' :
                track?.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                track?.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {track?.name}
              </span>
              {module.duration && (
                <span className="text-sm text-gray-500">⏱️ {module.duration}</span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {module.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {module.summary}
            </p>
            {module.outcomes && module.outcomes.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Learning Outcomes</h3>
                <ul className="space-y-1">
                  {module.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Module Content Placeholder */}
          <div className="prose max-w-none mb-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Module Content
              </h2>
              <p className="text-gray-600 mb-6">
                This is where the actual module content would be displayed. 
                In a real implementation, this would include:
              </p>
              <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
                <li>• Video lessons and tutorials</li>
                <li>• Interactive exercises and quizzes</li>
                <li>• Downloadable resources and materials</li>
                <li>• Code examples and demonstrations</li>
                <li>• Practical assignments and projects</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t">
            <div>
              {prevModule && (
                <button
                  onClick={() => router.push(`/modules/${prevModule.slug}`)}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous: {prevModule.title}
                </button>
              )}
            </div>
            <div>
              {nextModule ? (
                <button
                  onClick={() => router.push(`/modules/${nextModule.slug}`)}
                  className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Next: {nextModule.title}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={() => router.push('/workshop')}
                  className="flex items-center bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Complete Workshop
                  <CheckCircle className="h-4 w-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


