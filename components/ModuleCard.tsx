'use client'

import { CheckCircle, Circle } from 'lucide-react'
import Link from 'next/link'

interface ModuleCardProps {
  slug: string
  title: string
  summary: string
  isCompleted: boolean
  onToggleComplete?: (slug: string) => void
  showActions?: boolean
}

export default function ModuleCard({ 
  slug, 
  title, 
  summary, 
  isCompleted, 
  onToggleComplete,
  showActions = true 
}: ModuleCardProps) {
  const handleToggleComplete = async () => {
    if (!onToggleComplete) return
    
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moduleSlug: slug }),
      })

      if (response.ok) {
        onToggleComplete(slug)
      }
    } catch (error) {
      console.error('Failed to update progress:', error)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {summary}
          </p>
          {showActions && (
            <div className="flex items-center gap-3">
              <Link
                href={`/modules/${slug}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Module →
              </Link>
              <button
                onClick={handleToggleComplete}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle size={16} className="text-green-600" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle size={16} />
                    Mark Complete
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


