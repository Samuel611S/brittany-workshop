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
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-6 gap-4">
            <button
              onClick={() => router.push('/workshop')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Workshop</span>
              <span className="sm:hidden">Back</span>
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-500">
                Module {modules.findIndex(m => m.slug === module.slug) + 1} of {modules.length}
              </span>
              <button
                onClick={handleToggleComplete}
                disabled={isLoading}
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-colors text-sm ${
                  completed
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {completed ? (
                  <>
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Completed</span>
                    <span className="sm:hidden">Done</span>
                  </>
                ) : (
                  <>
                    <Circle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Mark Complete</span>
                    <span className="sm:hidden">Complete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className={`inline-block text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full ${
                track?.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                track?.color === 'green' ? 'bg-green-100 text-green-800' :
                track?.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                track?.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {track?.name}
              </span>
              {module.duration && (
                <span className="text-xs sm:text-sm text-gray-500">⏱️ {module.duration}</span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {module.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed">
              {module.summary}
            </p>
            {module.outcomes && module.outcomes.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Learning Outcomes</h3>
                <ul className="space-y-1">
                  {module.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start text-gray-600 text-sm sm:text-base">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Module Content Placeholder */}
          <div className="prose max-w-none mb-6 sm:mb-8">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Module Content
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                This is where the actual module content would be displayed. 
                In a real implementation, this would include:
              </p>
              <ul className="text-left text-gray-600 space-y-1 sm:space-y-2 max-w-md mx-auto text-sm sm:text-base">
                <li>• Video lessons and tutorials</li>
                <li>• Interactive exercises and quizzes</li>
                <li>• Downloadable resources and materials</li>
                <li>• Code examples and demonstrations</li>
                <li>• Practical assignments and projects</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-6 border-t gap-4 sm:gap-0">
            <div className="w-full sm:w-auto">
              {prevModule && (
                <button
                  onClick={() => router.push(`/modules/${prevModule.slug}`)}
                  className="flex items-center justify-center sm:justify-start text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  <span className="hidden sm:inline">Previous: {prevModule.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              )}
            </div>
            <div className="w-full sm:w-auto">
              {nextModule ? (
                <button
                  onClick={() => router.push(`/modules/${nextModule.slug}`)}
                  className="flex items-center justify-center bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  <span className="hidden sm:inline">Next: {nextModule.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={() => router.push('/workshop')}
                  className="flex items-center justify-center bg-green-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  <span className="hidden sm:inline">Complete Workshop</span>
                  <span className="sm:hidden">Complete</span>
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
