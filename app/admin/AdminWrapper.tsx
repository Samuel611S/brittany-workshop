'use client'

import { useState, useEffect } from 'react'
import AdminAuth from '@/components/AdminAuth'
import AdminClient from './AdminClient'

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

export default function AdminWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    fetchStats()
  }

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      console.log('Fetching admin stats...')
      const response = await fetch('/api/admin/stats')
      console.log('Admin stats response:', response.status, response.ok)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Admin stats data:', data)
        setStats(data)
      } else {
        const errorData = await response.json()
        console.error('Admin stats error:', errorData)
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />
  }

  if (isLoading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">
            {isLoading ? 'Fetching data...' : 'No data available'}
          </p>
        </div>
      </div>
    )
  }

  return <AdminClient stats={stats} />
}
