"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface JobListing {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  description: string;
  applicationDeadline: string | null;
  createdAt: string;
}

const JobCard = ({ job }: { job: JobListing }) => {
  const formatSalary = (min: number | null, max: number | null) => {
    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    } else if (min) {
      return `$${min.toLocaleString()}+`;
    } else if (max) {
      return `Up to $${max.toLocaleString()}`;
    }
    return "Salary not specified";
  };

  const formatPostedTime = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  };

  const getCompanyLogo = (companyName: string) => {
    const companyLogos: Record<string, string> = {
      "Amazon": "/amazon.png",
      "Tesla": "/tesla.png",
      "Swiggy": "/swiggy.png",
    };
    return companyLogos[companyName] || "/logos/default.png";
  };

  const getLogoBackground = (companyName: string) => {
    switch(companyName.toLowerCase()) {
      case "amazon": return "bg-black rounded-full";
      case "tesla": return "bg-white";
      case "swiggy": return "bg-orange-500 rounded-full";
      default: return "bg-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-[#94949440] rounded-lg overflow-hidden flex items-center justify-center shadow-2xl">
            <div className={`w-full h-full flex items-center justify-center p-2 ${getLogoBackground(job.companyName)}`}>
              <Image
                src={getCompanyLogo(job.companyName)}
                alt={job.companyName}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <span className="text-xs sm:text-sm bg-[#B0D9FF] text-black px-2.5 py-1 rounded-xl">
            {formatPostedTime(job.createdAt)}
          </span>
        </div>

        <h3 className="font-semibold text-base sm:text-lg md:text-xl line-clamp-2">
          {job.jobTitle}
        </h3>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 flex-shrink-0" viewBox="0 0 19 16">
              <path
                d="M11.7 14.75C11.7 12.7618 9.28233 11.15 6.29999 11.15C3.31766 11.15 0.899994 12.7618 0.899994 14.75M15.3 12.05V9.35M15.3 9.35V6.65M15.3 9.35H12.6M15.3 9.35H18M6.29999 8.45C4.31177 8.45 2.69999 6.83822 2.69999 4.85C2.69999 2.86177 4.31177 1.25 6.29999 1.25C8.28822 1.25 9.89999 2.86177 9.89999 4.85C9.89999 6.83822 8.28822 8.45 6.29999 8.45Z"
                stroke="#5A5A5A"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {job.jobType}
          </div>

          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 flex-shrink-0" viewBox="0 0 20 18">
              <path
                d="M1.76364 16.3408H3.49091M3.49091 16.3408H12.1273M3.49091 16.3408V4.42274C3.49091 3.45538 3.49091 2.97133 3.67918 2.60185C3.84478 2.27684 4.10882 2.0128 4.43383 1.8472C4.80331 1.65894 5.28736 1.65894 6.25472 1.65894H9.36381C10.3312 1.65894 10.8142 1.65894 11.1837 1.8472C11.5087 2.0128 11.7736 2.27684 11.9392 2.60185C12.1273 2.97097 12.1273 3.45443 12.1273 4.4199V9.43166M12.1273 16.3408H17.3091M12.1273 16.3408V9.43166M17.3091 16.3408H19.0364M17.3091 16.3408V9.43166C17.3091 8.62686 17.309 8.22465 17.1775 7.90723C17.0022 7.484 16.6663 7.14754 16.243 6.97223C15.9256 6.84075 15.5228 6.84075 14.718 6.84075C13.9132 6.84075 13.5108 6.84075 13.1933 6.97223C12.7701 7.14754 12.4341 7.484 12.2588 7.90723C12.1273 8.22465 12.1273 8.62685 12.1273 9.43166M6.08182 7.70439H9.53637M6.08182 5.11348H9.53637"
                stroke="#5A5A5A"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {job.location}
          </div>

          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 flex-shrink-0" viewBox="0 0 18 20">
              <path
                d="M17.1728 10.0001L8.99096 15.4546L0.809143 10.0001M17.1728 13.6365L8.99096 19.091L0.809143 13.6365M17.1728 6.36373L8.99096 11.8183L0.809143 6.36373L8.99096 0.90918L17.1728 6.36373Z"
                stroke="#5A5A5A"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {formatSalary(job.salaryMin, job.salaryMax)}
          </div>
        </div>

        <ul className="text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-2.5">
          {job.description.split('\n').slice(0, 2).map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-400 mr-1.5">•</span>
              <span className="line-clamp-2">{point}</span>
            </li>
          ))}
        </ul>

        {job.applicationDeadline && new Date(job.applicationDeadline) < new Date() ? (
          <div className="relative bg-gray-700 text-white py-2 text-center text-sm sm:text-base">
            <span>Expired</span>
          </div>
        ) : (
          <Button className="w-full bg-[#00AAFF] hover:bg-[#00AAFF] text-white py-2.5 sm:py-3 text-sm sm:text-base">
            Apply Now
          </Button>
        )}
      </div>
    </div>
  );
};

// Create a separate component that uses useSearchParams
function JobListingsContent() {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/jobs?${searchParams.toString()}`);
        
        if (!response.ok) throw new Error('Failed to fetch job listings');
        
        const data = await response.json();
        if (data.success) {
          setJobListings(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch job listings');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex-1 bg-[#FBFBFF] py-14 flex items-center justify-center">
        <p className="text-lg">Loading job listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-[#FBFBFF] py-14 flex items-center justify-center">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      {jobListings.length > 0 ? (
        jobListings.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-gray-500">No job listings found.</p>
        </div>
      )}
    </div>
  );
}

// Loading fallback component
function JobListingsLoading() {
  return (
    <div className="flex-1 bg-[#FBFBFF] py-14 flex items-center justify-center">
      <p className="text-lg">Loading job listings...</p>
    </div>
  );
}

export default function CompanyListing() {
  return (
    <main className="flex-1 bg-[#FBFBFF] py-4 sm:py-5 md:py-6 lg:py-7 xl:py-14">
      <div className="container mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
        <Suspense fallback={<JobListingsLoading />}>
          <JobListingsContent />
        </Suspense>
      </div>
    </main>
  );
}