import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { eventSchema } from '@/lib/validate'
import { verifyToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, meta } = eventSchema.parse(body)

    // Get user email from JWT token or referer
    let userEmail: string | undefined

    // Check for access cookie
    const accessToken = request.cookies.get('access')?.value
    if (accessToken) {
      const payload = verifyToken(accessToken)
      if (payload) {
        userEmail = payload.email
      }
    }

    // If no token, check referer to ensure it's from our domain
    if (!userEmail) {
      const referer = request.headers.get('referer')
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      if (!referer || !referer.startsWith(baseUrl)) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    // Record event
    await prisma.event.create({
      data: {
        userEmail,
        type,
        meta,
      },
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Event tracking error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Invalid event data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}


