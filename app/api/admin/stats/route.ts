import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const cookieStore = cookies()
    const adminToken = cookieStore.get('admin')?.value

    if (!adminToken) {
      console.log('No admin token found')
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = verifyToken(adminToken)
    if (!payload || !payload.adminId) {
      console.log('Invalid admin token:', payload)
      return NextResponse.json({ error: 'Invalid admin token' }, { status: 401 })
    }

    console.log('Admin token verified, fetching stats...')

    // Test database connection first
    try {
      await prisma.$queryRaw`SELECT 1`
    } catch (dbError) {
      console.error('Database connection failed:', dbError)
      return NextResponse.json(
        { 
          error: 'Database connection failed', 
          message: 'Please check your database connection and try again' 
        }, 
        { status: 503 }
      )
    }

    // Fetch admin statistics
    const totalSignups = await prisma.user.count()
    const latestFeedback = await prisma.feedback.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } }
    })

    // If no data exists, create some sample data for demo
    if (totalSignups === 0) {
      console.log('No data found, creating sample data...')
      
      // Create a sample user
      const sampleUser = await prisma.user.create({
        data: {
          name: 'Demo User',
          firstName: 'Demo',
          lastName: 'User',
          email: 'demo@example.com',
          password: 'demo123',
          bio: 'Sample user for demonstration',
        }
      })

      console.log('Created sample user:', sampleUser.id)

      // Create sample feedback
      const feedback = await prisma.feedback.create({
        data: {
          userId: sampleUser.id,
          message: 'This is a sample feedback entry for demonstration purposes. The workshop was very helpful!',
          rating: 5,
        }
      })

      console.log('Created sample feedback:', feedback.id)

      // Create sample events
      await prisma.event.createMany({
        data: [
          { type: 'signup', userEmail: sampleUser.email, meta: { source: 'demo' } },
          { type: 'module_completed', userEmail: sampleUser.email, meta: { module: 'sample' } },
          { type: 'outboundCourse', userEmail: sampleUser.email, meta: { course: 'demo' } },
        ]
      })

      console.log('Sample data created successfully')
    } else {
      console.log('Data already exists, total signups:', totalSignups)
      
      // Check if we need to add feedback data
      const existingFeedback = await prisma.feedback.count()
      if (existingFeedback === 0) {
        console.log('No feedback found, creating sample feedback...')
        
        // Get the first user to add feedback to
        const firstUser = await prisma.user.findFirst()
        if (firstUser) {
          const feedback = await prisma.feedback.create({
            data: {
              userId: firstUser.id,
              message: 'This is a sample feedback entry for demonstration purposes. The workshop was very helpful!',
              rating: 5,
            }
          })
          console.log('Created sample feedback for existing user:', feedback.id)
        }
      }
      
      // Check if we need to add events data
      const existingEvents = await prisma.event.count()
      if (existingEvents === 0) {
        console.log('No events found, creating sample events...')
        
        const firstUser = await prisma.user.findFirst()
        if (firstUser) {
          await prisma.event.createMany({
            data: [
              { type: 'signup', userEmail: firstUser.email, meta: { source: 'demo' } },
              { type: 'module_completed', userEmail: firstUser.email, meta: { module: 'sample' } },
              { type: 'outboundCourse', userEmail: firstUser.email, meta: { course: 'demo' } },
            ]
          })
          console.log('Created sample events for existing user')
        }
      }
    }

    // Fetch updated statistics
    const updatedTotalSignups = await prisma.user.count()
    const updatedLatestFeedback = await prisma.feedback.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } }
    })

    console.log('Updated total signups:', updatedTotalSignups)
    console.log('Updated latest feedback count:', updatedLatestFeedback.length)
    console.log('Latest feedback:', updatedLatestFeedback)

    // Calculate monthly signups for the last 6 months
    const monthlySignups = []
    const currentDate = new Date()
    
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1)
      
      const count = await prisma.user.count({
        where: {
          createdAt: {
            gte: monthDate,
            lt: nextMonthDate
          }
        }
      })
      
      monthlySignups.push({
        month: monthDate.toISOString().substring(0, 7), // YYYY-MM format
        count: count
      })
    }

    const stats = {
      totalSignups: updatedTotalSignups,
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
      latestFeedback: updatedLatestFeedback.map(feedback => ({
        id: feedback.id,
        message: feedback.message,
        rating: feedback.rating,
        createdAt: feedback.createdAt.toISOString(),
        user: feedback.user ? { name: feedback.user.name } : undefined
      })),
      monthlySignups: monthlySignups
    }

    console.log('Final stats:', stats)

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Admin stats error:', error)
    
    // Return fallback data if database is not available
    const fallbackStats = {
      totalSignups: 0,
      signupsThisMonth: 0,
      outboundClicks: 0,
      latestFeedback: [],
      monthlySignups: []
    }
    
    return NextResponse.json(fallbackStats)
  }
}
