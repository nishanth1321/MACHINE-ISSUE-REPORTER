
import { NextRequest, NextResponse } from 'next/server'
import  {prisma}  from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, machineName, machineFault, faultTime, faultDescription } = body

    if (!name || !machineName || !machineFault || !faultTime || !faultDescription) {
      return NextResponse.json(
        { 
          success: false,
          error: 'All fields are required'
        },
        { status: 400 }
      )
    }

    const faultReport = await prisma.machineFaultReport.create({
      data: {
        name: name.trim(),
        machineName: machineName.trim(),
        machineFault: machineFault.trim(),
        faultTime: new Date(faultTime),
        faultDescription: faultDescription.trim(),
      },
    })

    return NextResponse.json(
      { 
        success: true,
        message: 'Fault report submitted successfully',
        data: faultReport 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating fault report:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to submit fault report'
      },
      { status: 500 }
    )
  }
}
