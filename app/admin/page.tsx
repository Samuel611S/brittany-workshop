'use client'

import { useState, useEffect } from 'react'
import { Download, Users, TrendingUp, MessageSquare, Calendar } from 'lucide-react'
import AdminAuth from '@/components/AdminAuth'
import StatCard from '@/components/StatCard'

interface AdminStats {
  totalSignups: number
  signupsThisMonth: number
  outboundClicks: number
  latestFeedback: Array<{
    id: string
    message: string
    rating: number
    createdAt: string
    user?: { name: string }
  }>
  monthlySignups: Array<{
    month: string
    count: number
  }>
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if already authenticated (in a real app, this would be more secure)
    const authStatus = localStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      fetchStats()
    }
  }, [])

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be a proper API call
      // For now, we'll simulate the data
      const mockStats: AdminStats = {
        totalSignups: 1247,
        signupsThisMonth: 89,
        outboundClicks: 456,
        latestFeedback: [
          {
            id: '1',
            message: 'Great workshop! Very comprehensive and well-structured.',
            rating: 5,
            createdAt: '2024-01-15T10:30:00Z',
            user: { name: 'John Doe' }
          },
          {
            id: '2',
            message: 'The modules were very helpful, especially the React section.',
            rating: 4,
            createdAt: '2024-01-14T15:45:00Z',
            user: { name: 'Jane Smith' }
          },
          {
            id: '3',
            message: 'Could use more practical examples in the backend modules.',
            rating: 3,
            createdAt: '2024-01-13T09:20:00Z',
            user: { name: 'Mike Johnson' }
          }
        ],
        monthlySignups: [
          { month: '2023-08', count: 45 },
          { month: '2023-09', count: 67 },
          { month: '2023-10', count: 89 },
          { month: '2023-11', count: 112 },
          { month: '2023-12', count: 134 },
          { month: '2024-01', count: 89 }
        ]
      }
      setStats(mockStats)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    localStorage.setItem('admin_authenticated', 'true')
    fetchStats()
  }

  const handleExportUsers = async () => {
    try {
      // In a real app, this would generate and download a CSV
      const csvContent = 'id,name,email,createdAt\n1,John Doe,john@example.com,2024-01-15\n2,Jane Smith,jane@example.com,2024-01-14'
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'users.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleExportUsers}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors inline-flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Users CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Signups"
            value={stats?.totalSignups || 0}
            description="All-time user registrations"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="This Month"
            value={stats?.signupsThisMonth || 0}
            description="New signups this month"
            trend={{ value: -5, isPositive: false }}
          />
          <StatCard
            title="Outbound Clicks"
            value={stats?.outboundClicks || 0}
            description="External course clicks"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Avg Rating"
            value="4.2"
            description="Average feedback rating"
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Signups Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Signups Over Time</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {stats?.monthlySignups.map((item, index) => (
                <div key={item.month} className="flex flex-col items-center">
                  <div
                    className="bg-blue-600 rounded-t w-8 transition-all duration-300"
                    style={{ height: `${(item.count / 150) * 200}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {new Date(item.month).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Feedback */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Feedback</h3>
            <div className="space-y-4">
              {stats?.latestFeedback.map((feedback) => (
                <div key={feedback.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {feedback.user?.name || 'Anonymous'}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{feedback.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


