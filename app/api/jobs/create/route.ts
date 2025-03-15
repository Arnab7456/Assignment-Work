
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  
  try {
    const body = await request.json();
    const {
      jobTitle,
      location,
      salaryMin,
      salaryMax,
      companyName,
      jobType,
      applicationDeadline,
      description,
    } = body;
    if (!jobTitle || !location || !companyName || !jobType || !description) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      const job = await prisma.job.create({
        data: {
          jobTitle,
          location,
          salaryMin: salaryMin || null,
          salaryMax: salaryMax || null,
          companyName,
          jobType,
          applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
          description,
        },
      });

      return NextResponse.json(
        { success: true, data: job },
        { status: 201 }
      );
    } catch (prismaError) {
      console.error('Prisma error:', prismaError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to create job posting',
          error: prismaError instanceof Error ? prismaError.message : String(prismaError),
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error while creating job posting',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}