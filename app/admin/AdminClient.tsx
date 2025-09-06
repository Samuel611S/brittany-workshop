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
  exportUsersCSV: () => Promise<Response>
}

export default function AdminClient({ stats, exportUsersCSV }: AdminClientProps) {
  const handleExportUsers = async () => {
    try {
      const response = await exportUsersCSV()
      const blob = await response.blob()
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Signups Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Signups Over Time</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {stats.monthlySignups.length > 0 ? (
                stats.monthlySignups.map((item, index) => (
                  <div key={item.month} className="flex flex-col items-center">
                    <div
                      className="bg-blue-600 rounded-t w-8 transition-all duration-300"
                      style={{ height: `${(item.count / 150) * 200}px` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {new Date(item.month).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="w-full text-center text-gray-500">
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Latest Feedback */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Feedback</h3>
            <div className="space-y-4">
              {stats.latestFeedback.map((feedback) => (
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
