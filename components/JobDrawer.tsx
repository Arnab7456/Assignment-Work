import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar, ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import React, { useState } from "react";


const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option}
                className={`
                    w-full px-4 py-2 text-sm cursor-pointer
                    hover:bg-gray-100 transition-colors
                    ${value === option ? "bg-gray-50" : ""}
                  `}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function JobDrawer({
  open,
  setOpen,
  selectedJobType,
  setSelectedJobType,
  onJobCreated,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedJobType: string;
  setSelectedJobType: (selectedJobType: string) => void;
  onJobCreated?: () => void; // Callback for when a job is created
}) {
  // Updated to match the enum values in the Prisma schema
  const jobTypes = ["FullTime", "PartTime", "Contract", "Freelance"];
  const locations = ["Chennai", "Bangalore", "Mumbai", "Delhi", "Remote"];
  
  // Form state
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("Full Stack Developer");
  const [companyName, setCompanyName] = useState("Amazon");
  const [salaryMin, setSalaryMin] = useState("0");
  const [salaryMax, setSalaryMax] = useState("12,00,000");
  const [deadline, setDeadline] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");

  // Map job type to enum values that match the Prisma schema
  const mapJobTypeToEnum = (type: string) => {
    switch(type) {
      case "FullTime": return "FULL_TIME";
      case "PartTime": return "PART_TIME";
      case "Contract": return "CONTRACT";
      case "Freelance": return "FREELANCE";
      default: return "FULL_TIME";
    }
  };

  // Handle form submission
  const handlePublish = async () => {
    try {
      setLoading(true);
      setError(""); // Clear any previous errors
      
      // Basic validation
      if (!jobTitle || !selectedLocation || !companyName || !selectedJobType || !jobDescription) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }
      
      const deadlineDate = deadline ? new Date(deadline) : null;
      
      // Parse salary values properly
      const minSalary = salaryMin ? parseFloat(salaryMin.replace(/,/g, '')) : 0;
      const maxSalary = salaryMax ? parseFloat(salaryMax.replace(/,/g, '')) : 0;
      
      const response = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          location: selectedLocation,
          salaryMin: minSalary,
          salaryMax: maxSalary,
          companyName,
          jobType: mapJobTypeToEnum(selectedJobType),
          applicationDeadline: deadlineDate,
          description: jobDescription, // Changed from jobDescription to match the API
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create job');
      }
      
      setOpen(false);
      if (onJobCreated) onJobCreated();
      
      // Reset form fields
      setSelectedLocation("");
      setJobTitle("Full Stack Developer");
      setCompanyName("Amazon");
      setSalaryMin("0");
      setSalaryMax("12,00,000");
      setDeadline("");
      setJobDescription("");
      setError("");
    } catch (error) {
      console.error('Error creating job:', error);
      setError(error instanceof Error ? error.message : 'Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#FFFFFF] sm:max-w-[800px] p-0 overflow-hidden font-satoshi font-medium cursor-pointer">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-center text-xl font-semibold ">
            Create Job Opening
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-2">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium mb-1"
                >
                  Job Title <span className="text-red-500">*</span>
                </label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Full Stack Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-1"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  options={locations}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  placeholder="Choose Preferred Location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Salary Range
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 12L4 15M4 15L1 12M4 15V1M9 4L12 1M12 1L15 4M12 1V15"
                          stroke="#BCBCBC"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <Input
                      className="pl-7 w-full h-10 font-normal border-gray-300"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                    />
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 ">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 12L4 15M4 15L1 12M4 15V1M9 4L12 1M12 1L15 4M12 1V15"
                          stroke="#BCBCBC"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <Input
                      className="pl-7 w-full h-10 font-normal border-gray-300 "
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium mb-1"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="companyName"
                  placeholder="e.g. Amazon"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="jobType"
                  className="block text-sm font-medium mb-1"
                >
                  Job Type <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  options={jobTypes}
                  value={selectedJobType}
                  onChange={setSelectedJobType}
                  placeholder="Select job type"
                />
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium mb-1"
                >
                  Application Deadline
                </label>
                <div className="relative">
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full space-y-4">
              <label className="block text-sm font-medium mb-1 ">
                Job Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                className="w-full min-h-[200px] border-gray-300 font-normal "
                placeholder="Please share a description to let the candidate know about the job"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" className="gap-2">
              Save Draft
              <svg
                width="10"
                height="13"
                viewBox="0 0 10 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 7.5L5 11.5L1 7.5M9 1.5L5 5.5L1 1.5"
                  stroke="#222222"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            <Button 
              className="bg-blue-500 hover:bg-blue-600 gap-2 text-white"
              onClick={handlePublish}
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish"}
              <svg
                width="4"
                height="8"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1.5L11 5.5L7 9.5M1 1.5L5 5.5L1 9.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}