import { NextRequest, NextResponse } from 'next/server'
import { enhancedRateLimit, getSecurityHeaders, sanitizeInput, isValidEmail } from './security'

export function securityMiddleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Add security headers
  const securityHeaders = getSecurityHeaders()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export function apiSecurityMiddleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  
  // Block suspicious user agents
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i
  ]
  
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    )
  }

  // Rate limiting for API routes
  const rateLimitResult = enhancedRateLimit(`api:${ip}`, 100, 60 * 1000) // 100 requests per minute
  
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
        }
      }
    )
  }

  const response = NextResponse.next()
  
  // Add security headers
  const securityHeaders = getSecurityHeaders()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}
