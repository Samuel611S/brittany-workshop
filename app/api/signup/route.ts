import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { signupSchema } from '@/lib/validate'
import { signToken } from '@/lib/jwt'
import { sendAccessEmail } from '@/lib/mailer'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = rateLimit(`signup:${ip}`, 5, 60 * 1000)
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, consent } = signupSchema.parse(body)

    // Additional rate limiting by email
    const emailRateLimit = rateLimit(`signup:${email}`, 3, 60 * 1000)
    if (!emailRateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many requests for this email. Please try again later.' },
        { status: 429 }
      )
    }

    // Upsert user
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { name, email },
    })

    // Generate access URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const workshopUrl = process.env.WORKSHOP_EXTERNAL_URL || `${baseUrl}/workshop`
    
    // Send access email
    const emailResult = await sendAccessEmail(email, name, workshopUrl)
    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error)
      // Continue anyway - don't fail the signup
    }

    // Create JWT token
    const token = signToken({ email, userId: user.id })

    // Set httpOnly cookie
    const cookieStore = cookies()
    cookieStore.set('access', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60, // 90 days
    })

    // Record signup event
    await prisma.event.create({
      data: {
        userEmail: email,
        type: 'signup',
        meta: { name },
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully signed up! Check your email for access link.',
      remaining: rateLimitResult.remaining 
    })

  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Invalid input data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}


