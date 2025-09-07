import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { signToken } from '@/lib/jwt'
import { verifyAdminPassword, validateAdminPasswordStrength } from '@/lib/admin-security'
import { enhancedRateLimit } from '@/lib/security'

// Secure admin password hash (generated with pbkdf2)
const SECURE_ADMIN_PASSWORD_HASH = 'a5b72e8690ef9b3c69c6d865bdb2cfa0ce1a9f3179cfd5b3a8b087081f73ba2a:755455e8408082e8e9602b6a47250bbbac81f37addc6e4343e1f38df384a62176e3eba545ca30ea518d7ad0f4fc8250683e7f7df33f307786103cbe054d69588'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for admin login attempts
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = enhancedRateLimit(`admin-login:${ip}`, 3, 60 * 1000, 30 * 60 * 1000) // 3 attempts per minute, 30 min block
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many admin login attempts. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const { password } = await request.json()
    
    // Validate password strength
    const passwordValidation = validateAdminPasswordStrength(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, message: passwordValidation.message },
        { status: 400 }
      )
    }
    
    // Verify secure admin password
    const isValidPassword = verifyAdminPassword(password, SECURE_ADMIN_PASSWORD_HASH)
    
    if (isValidPassword) {
      // Create admin JWT token with enhanced security
      const token = signToken({ 
        adminId: 'admin',
        timestamp: Date.now(),
        ip: ip
      })
      
      // Set secure admin cookie
      const cookieStore = cookies()
      cookieStore.set('admin', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // More restrictive than 'lax'
        maxAge: 60 * 60 * 2, // 2 hours (shorter for security)
        path: '/'
      })
      
      console.log('Admin login successful from IP:', ip)
      return NextResponse.json({ success: true })
    } else {
      console.log('Admin login failed from IP:', ip)
      return NextResponse.json(
        { success: false, message: 'Invalid admin password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    )
  }
}
