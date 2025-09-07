import { NextRequest, NextResponse } from 'next/server'
import { securityMiddleware, apiSecurityMiddleware } from './lib/middleware'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Apply security middleware to all routes
  if (pathname.startsWith('/api/')) {
    return apiSecurityMiddleware(request)
  }

  return securityMiddleware(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
