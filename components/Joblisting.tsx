"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, BriefcaseIcon } from 'lucide-react';

interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  applicationDeadline: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  createdAt: string;
}

export default function JobListings() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch jobs based on search params
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Construct the API URL with search parameters
        const apiUrl =  `/api/jobs/get?${searchParams.toString()}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setJobs(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch jobs');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  // Format date to display in a readable format
interface DateFormatOptions {
    year: 'numeric';
    month: 'long';
    day: 'numeric';
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    } as DateFormatOptions);
};

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-10 rounded text-center">
          <h3 className="text-lg font-medium mb-2">No job listings found</h3>
          <p>Try adjusting your search filters to find more results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Found {jobs.length} job listings</h2>
      
      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <Link href={`/jobs/${job.id}`}>
              <div>
                <h3 className="text-xl font-bold text-purple-700">{job.jobTitle}</h3>
                <p className="text-gray-700 font-medium mt-1">{job.companyName}</p>
                
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <BriefcaseIcon className="h-4 w-4 mr-1" />
                    <span>{job.jobType}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>Deadline: {formatDate(job.applicationDeadline)}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-green-600 font-medium">₹{job.salaryMin}k - ₹{job.salaryMax}k per month</span>
                </div>
                
                <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>
                
                <div className="mt-4 text-sm text-gray-500">
                  Posted on {formatDate(job.createdAt)}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}