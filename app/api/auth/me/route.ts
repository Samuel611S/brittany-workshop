import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('access')?.value

    if (!accessToken) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const payload = verifyToken(accessToken)
    if (!payload) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        bio: true,
        phone: true,
        location: true,
      },
    })

    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 })
    }

    return NextResponse.json({ success: true, user })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
