'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle, Circle } from 'lucide-react'
import { Module, LearningTrack, modules } from '@/data/modules'

interface ModuleClientProps {
  module: Module
  track: LearningTrack | undefined
  isCompleted: boolean
  nextSlug: string | null
  prevModule: Module | null
  nextModule: Module | null
  markModuleComplete: (moduleSlug: string) => Promise<{ success: boolean; completedCount: number }>
}

export default function ModuleClient({
  module,
  track,
  isCompleted,
  nextSlug,
  prevModule,
  nextModule,
  markModuleComplete
}: ModuleClientProps) {
  const [completed, setCompleted] = useState(isCompleted)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleToggleComplete = async () => {
    setIsLoading(true)
    try {
      const result = await markModuleComplete(module.slug)
      if (result.success) {
        setCompleted(!completed)
      }
    } catch (error) {
      console.error('Failed to update progress:', error)
    } finally {
      setIsLoading(false)
    }
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
                Module {modules.findIndex(m => m.slug === module.slug) + 1} of {modules.length}
              </span>
              <button
                onClick={handleToggleComplete}
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  completed
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {completed ? (
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
