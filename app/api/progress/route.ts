import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const { moduleSlug } = await request.json()

    if (!moduleSlug || typeof moduleSlug !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Module slug is required' },
        { status: 400 }
      )
    }

    // Get user from JWT token
    const accessToken = request.cookies.get('access')?.value
    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = verifyToken(accessToken)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Upsert progress
    await prisma.progress.upsert({
      where: {
        userId_moduleSlug: {
          userId: payload.userId!,
          moduleSlug,
        },
      },
      update: {
        completedAt: new Date(),
      },
      create: {
        userId: payload.userId!,
        moduleSlug,
      },
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Progress error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get user from JWT token
    const accessToken = request.cookies.get('access')?.value
    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = verifyToken(accessToken)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user progress
    const progress = await prisma.progress.findMany({
      where: { userId: payload.userId },
      select: { moduleSlug: true, completedAt: true },
    })

    return NextResponse.json({ 
      success: true, 
      progress: progress.map(p => p.moduleSlug) 
    })

  } catch (error) {
    console.error('Progress fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}


