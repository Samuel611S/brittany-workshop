import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { feedbackSchema } from '@/lib/validate'
import { verifyToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, rating, name } = feedbackSchema.parse(body)

    // Get user ID from JWT token
    let userId: string | undefined
    const accessToken = request.cookies.get('access')?.value
    if (accessToken) {
      const payload = verifyToken(accessToken)
      if (payload) {
        userId = payload.userId
      }
    }

    // Create feedback
    await prisma.feedback.create({
      data: {
        userId,
        message,
        rating,
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your feedback!' 
    })

  } catch (error) {
    console.error('Feedback error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Invalid feedback data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}


