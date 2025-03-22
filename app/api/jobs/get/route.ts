import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Format the jobs according to the expected structure in the frontend
    const formattedJobs = jobs.map(job => ({
      id: job.id,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
      jobType: job.jobType,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      description: job.description,
      applicationDeadline: job.applicationDeadline,
      createdAt: job.createdAt.toISOString() // Convert Date to string
    }));

    // Return in the format expected by the frontend
    return NextResponse.json({
      success: true,
      data: formattedJobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch job listings'
      },
      { status: 500 }
    );
  } finally {
    // Close the Prisma connection to avoid connection pool exhaustion
    await prisma.$disconnect();
  }
}