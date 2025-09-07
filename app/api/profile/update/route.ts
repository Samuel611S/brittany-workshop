import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/db'
import { profileUpdateSchema } from '@/lib/validate'

export async function POST(request: NextRequest) {
  try {
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
    const validatedData = profileUpdateSchema.parse(body)

    // Only update fields that have values (optimize database writes)
    const updateData: any = {}
    Object.keys(validatedData).forEach(key => {
      const value = validatedData[key as keyof typeof validatedData]
      if (value !== undefined && value !== null && value !== '') {
        updateData[key] = value
      }
    })

    // If no fields to update, return current user
    if (Object.keys(updateData).length === 0) {
      const currentUser = await prisma.user.findUnique({
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
      return NextResponse.json({ success: true, user: currentUser })
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: updateData,
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

    return NextResponse.json({ 
      success: true, 
      user: updatedUser 
    })

  } catch (error) {
    console.error('Profile update error:', error)
    
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
