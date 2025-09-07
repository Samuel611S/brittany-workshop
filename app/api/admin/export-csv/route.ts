import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/jwt'

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const adminToken = request.cookies.get('admin')?.value
    if (!adminToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = verifyToken(adminToken)
    if (!payload || !payload.adminId) {
      return NextResponse.json({ error: 'Invalid admin token' }, { status: 401 })
    }

    // Get users data
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Create CSV content
    const csvHeader = 'id,name,email,createdAt\n'
    const csvRows = users.map(user => 
      `${user.id},"${user.name || ''}","${user.email}","${user.createdAt.toISOString()}"`
    ).join('\n')
    
    const csvContent = csvHeader + csvRows

    // Return CSV file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="users.csv"',
      },
    })

  } catch (error) {
    console.error('CSV export error:', error)
    return NextResponse.json(
      { error: 'Failed to export CSV' },
      { status: 500 }
    )
  }
}
