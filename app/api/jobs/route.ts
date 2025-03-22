import { JobType, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const jobType = searchParams.get('jobType') as JobType | null;
    const minSalary = parseInt(searchParams.get('minSalary') || '0');
    const maxSalary = parseInt(searchParams.get('maxSalary') || '100');

    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          // Search query
          search ? {
            OR: [
              { jobTitle: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          } : {},
          // Location filter
          location ? { location: { equals: location, mode: 'insensitive' } } : {},
          // Job type filter
          jobType ? { jobType: { equals: jobType } } : {},
          // Salary range filter
          {
            OR: [
              { salaryMin: { gte: minSalary * 1000 } },
              { salaryMax: { lte: maxSalary * 1000 } },
            ],
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: jobs 
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch jobs',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}