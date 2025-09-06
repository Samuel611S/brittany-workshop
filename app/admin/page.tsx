import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Download, Users, TrendingUp, MessageSquare, Calendar } from 'lucide-react'
import AdminAuth from '@/components/AdminAuth'
import StatCard from '@/components/StatCard'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/db'
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

// Server Action for CSV export
async function exportUsersCSV() {
  'use server'
  
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const csvHeader = 'id,name,email,createdAt\n'
  const csvRows = users.map(user => 
    `${user.id},"${user.name || ''}","${user.email}","${user.createdAt.toISOString()}"`
  ).join('\n')
  
  const csvContent = csvHeader + csvRows
  
  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="users.csv"',
    },
  })
}

export default async function AdminPage() {
  // Check admin authentication
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access')?.value
  
  if (!accessToken) {
    return <AdminAuth onAuthenticated={() => {}} />
  }

  const payload = verifyToken(accessToken)
  if (!payload) {
    return <AdminAuth onAuthenticated={() => {}} />
  }

  // For now, we'll use mock data. In production, you'd check if the user is an admin
  // and fetch real data from the database
  const stats: AdminStats = {
    totalSignups: await prisma.user.count(),
    signupsThisMonth: await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),
    outboundClicks: await prisma.event.count({
      where: { type: 'outboundCourse' }
    }),
    latestFeedback: await prisma.feedback.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } }
    }),
    monthlySignups: [] // This would require more complex aggregation
  }

  return <AdminClient stats={stats} exportUsersCSV={exportUsersCSV} />
}


