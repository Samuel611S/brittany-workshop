import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { hashPassword, verifyPassword, validatePasswordStrength } from '@/lib/password'
import { enhancedRateLimit } from '@/lib/security'

const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for password updates
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = enhancedRateLimit(`password-update:${ip}`, 3, 60 * 1000, 10 * 60 * 1000) // 3 attempts per minute, 10 min block
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many password update attempts. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Check authentication
    const cookieStore = cookies()
    const accessToken = cookieStore.get('access')?.value

    if (!accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = verifyToken(accessToken)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Validate input
    const body = await request.json()
    const { currentPassword, newPassword } = passwordUpdateSchema.parse(body)

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, message: passwordValidation.message },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { password: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verify current password
    console.log('Password update attempt:', { 
      userId: payload.userId, 
      hasStoredPassword: !!user.password
    })
    
    const isDefaultPassword = user.password === 'demo123'
    let isCurrentPasswordValid = false
    
    if (isDefaultPassword && currentPassword === 'demo123') {
      isCurrentPasswordValid = true
    } else if (!isDefaultPassword && user.password) {
      isCurrentPasswordValid = await verifyPassword(currentPassword, user.password)
    }
    
    if (!isCurrentPasswordValid) {
      console.log('Current password incorrect')
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword)

    // Update password
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: { password: hashedNewPassword }
    })
    
    console.log('Password updated successfully:', { userId: payload.userId })

    return NextResponse.json({ 
      success: true, 
      message: 'Password updated successfully' 
    })

  } catch (error) {
    console.error('Password update error:', error)
    
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
