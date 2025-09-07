'use client'

import { Download, Users, TrendingUp, MessageSquare, Calendar } from 'lucide-react'
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

interface AdminClientProps {
  stats: AdminStats
}

export default function AdminClient({ stats }: AdminClientProps) {
  const handleExportUsers = async () => {
    try {
      console.log('Starting CSV export...')
      const response = await fetch('/api/admin/export-csv')
      console.log('Export response:', response.status, response.ok)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Export error:', errorData)
        throw new Error(`Export failed: ${errorData.error || 'Unknown error'}`)
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'users.csv'
      a.click()
      window.URL.revokeObjectURL(url)
      console.log('CSV export successful')
    } catch (error) {
      console.error('Export failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Failed to export CSV: ${errorMessage}`)
    }
  }

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-6 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Good evening, Brittany! 👋 Here's your platform overview.
              </p>
            </div>
            <button
              onClick={handleExportUsers}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Export Users CSV</span>
              <span className="sm:hidden">Export CSV</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Total Signups"
            value={stats.totalSignups}
            description="All-time user registrations"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="This Month"
            value={stats.signupsThisMonth}
            description="New signups this month"
            trend={{ value: -5, isPositive: false }}
          />
          <StatCard
            title="Outbound Clicks"
            value={stats.outboundClicks}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Signups Chart */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Signups Over Time</h3>
            <div className="h-48 sm:h-64 flex items-end justify-between gap-1 sm:gap-2">
              {stats.monthlySignups.length > 0 ? (
                stats.monthlySignups.map((item, index) => (
                  <div key={item.month} className="flex flex-col items-center">
                    <div
                      className="bg-blue-600 rounded-t w-4 sm:w-8 transition-all duration-300"
                      style={{ height: `${(item.count / 150) * 200}px` }}
                    />
                    <span className="text-xs text-gray-500 mt-1 sm:mt-2">
                      {new Date(item.month).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="w-full text-center text-gray-500 text-sm">
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Latest Feedback */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Latest Feedback</h3>
            <div className="space-y-3 sm:space-y-4">
              {stats.latestFeedback.length > 0 ? (
                stats.latestFeedback.map((feedback) => (
                  <div key={feedback.id} className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1 sm:gap-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {feedback.user?.name || 'Anonymous'}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs sm:text-sm ${
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
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feedback.message}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-6 sm:py-8">
                  <MessageSquare className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                  <p className="text-sm sm:text-base">No feedback yet</p>
                  <p className="text-xs sm:text-sm">Feedback will appear here once users submit it</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
