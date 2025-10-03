
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const faultReports = await prisma.machineFaultReport.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(
      { 
        success: true,
        data: faultReports
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching fault reports:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch fault reports'
      },
      { status: 500 }
    )
  }
}
