import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { signToken } from '@/lib/jwt'
import { loginSchema } from '@/lib/validate'
import { verifyPassword } from '@/lib/password'
import { enhancedRateLimit, sanitizeInput, isValidEmail } from '@/lib/security'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for login attempts
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = enhancedRateLimit(`login:${ip}`, 5, 60 * 1000, 15 * 60 * 1000) // 5 attempts per minute, 15 min block
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many login attempts. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const body = await request.json()
    const { email, password } = loginSchema.parse(body)
    
    // Input validation
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    const sanitizedEmail = email.toLowerCase().trim()

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user has a password set (for login system)
    if (!user.password) {
      return NextResponse.json(
        { success: false, message: 'Please sign up first to create an account' },
        { status: 401 }
      )
    }

    // Check password against stored password
    console.log('Login attempt:', { email: sanitizedEmail, hasPassword: !!user.password })
    
    // For demo purposes, accept 'demo123' if password is still 'demo123'
    // Otherwise, verify the hashed password
    const isDefaultPassword = user.password === 'demo123'
    let isValidPassword = false
    
    if (isDefaultPassword && password === 'demo123') {
      isValidPassword = true
    } else if (!isDefaultPassword && user.password) {
      isValidPassword = await verifyPassword(password, user.password)
    }
    
    if (!isValidPassword) {
      console.log('Password mismatch:', { provided: password, isDefaultPassword })
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    console.log('Password verified successfully')

    // Sign JWT token
    const token = signToken({
      email: user.email,
      userId: user.id,
    })

    // Set httpOnly cookie
    const cookieStore = cookies()
    cookieStore.set('access', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60, // 90 days
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Login successful',
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
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof z.ZodError) {
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
