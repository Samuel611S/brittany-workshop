import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { signupSchema } from '@/lib/validate'
import { signToken } from '@/lib/jwt'
import { sendAccessEmail } from '@/lib/mailer'
import { enhancedRateLimit, sanitizeInput, isValidEmail, escapeHtml } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    // Enhanced rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = enhancedRateLimit(`signup:${ip}`, 3, 60 * 1000, 5 * 60 * 1000) // 3 requests per minute, 5 min block
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const body = await request.json()
    const { name, email, consent } = signupSchema.parse(body)
    
    // Enhanced input validation and sanitization
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = email.toLowerCase().trim()
    
    // Parse first and last name from the full name
    const nameParts = sanitizedName.trim().split(' ')
    const firstName = sanitizeInput(nameParts[0] || '')
    const lastName = sanitizeInput(nameParts.slice(1).join(' ') || '')

    // Additional rate limiting by email
    const emailRateLimit = enhancedRateLimit(`signup:${sanitizedEmail}`, 2, 60 * 1000, 10 * 60 * 1000) // 2 requests per minute, 10 min block
    if (!emailRateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many requests for this email. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((emailRateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Upsert user with default password
    const user = await prisma.user.upsert({
      where: { email: sanitizedEmail },
      update: { 
        name: sanitizedName,
        firstName,
        lastName,
        password: 'demo123', // Default password for demo
      },
      create: { 
        name: sanitizedName, 
        firstName,
        lastName,
        email: sanitizedEmail,
        password: 'demo123', // Default password for demo
      },
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
      user: {
        id: user.id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        phone: user.phone,
        location: user.location,
      },
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


