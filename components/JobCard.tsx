import { useState, useEffect } from 'react';

interface Job {
  id: string;
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: string;
    salaryMin: number;
    salaryMax: number;
    description: string;
    applicationDeadline: string;    
}
function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define async function to fetch data
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // You can adjust the query parameters as needed
        const response = await fetch('/api/jobs?minSalary=50&maxSalary=92');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setJobs(result.data);
        } else {
          throw new Error('Failed to fetch jobs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    fetchJobs();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs: {error}</p>;

  return (
    <div className="job-listings">
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found matching your criteria</p>
      ) : (
        <div className="jobs-grid">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.jobTitle}</h3>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.jobType}</p>
              <p><strong>Salary:</strong> ${job.salaryMin} - ${job.salaryMax}</p>
              <p>{job.description}</p>
              {job.applicationDeadline && (
                <p><strong>Apply by:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobListings;