"use client";
import { Search, MapPin, Users, ChevronsDown, ArrowLeft } from "lucide-react";
import { CommandInput } from "@/components/ui/command";
import { Slider } from "@/components/ui/slider";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const jobTypes = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
];

export default function SearchFilter() {
  const router = useRouter();
  const [openJobType, setOpenJobType] = useState(false);
  const [jobTypeValue, setJobTypeValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState([50, 80]);
  const pathname = usePathname();

  const formatSalary = (value: number) => {
    return `₹${value}k`;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append("search", searchQuery);
    }
    if (jobTypeValue) {
      params.append("jobType", jobTypeValue);
    }
    params.append("minSalary", salaryRange[0].toString());
    params.append("maxSalary", salaryRange[1].toString());
    router.push(`jobs?${params.toString()}`);
  };

  return (
    <div className="bg-inherit grid items-center justify-items-center">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative pb-4 border-b border-gray-500 md:border-b-0 md:border-r-2 md:border-gray-300 md:pr-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              className="w-full pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative pb-4 border-b border-gray-500 md:border-b-0 md:border-r-2 md:border-gray-300 md:pr-4">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search By Job Location"
              className="w-full pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="relative pb-4 md:pr-4">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Popover open={openJobType} onOpenChange={setOpenJobType}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost" 
                  role="combobox"
                  aria-expanded={openJobType}
                  className="w-full pl-10 pr-4 py-2.5 h-auto mx-auto font-normal hover:bg-transparent focus-visible:ring-1 focus-visible:ring-purple-500" // Added focus styles
                >
                  {jobTypeValue || "Enter Job Type"}
                  <ChevronsDown className="ml-2 h-10 w-10 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search job type..." />
                  <CommandList className="bg-white">
                    <CommandEmpty>No job type found.</CommandEmpty>
                    <CommandGroup>
                      {jobTypes.map((jobType) => (
                        <CommandItem
                          key={jobType.value}
                          value={jobType.value}
                          onSelect={(currentValue) => {
                            setJobTypeValue(
                              currentValue === jobTypeValue ? "" : currentValue
                            );
                            setOpenJobType(false);
                          }}
                        >
                          <Check className={cn(
                              "mr-2 h-4 w-4",
                              jobTypeValue === jobType.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}/>
                          {jobType.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Salary Per Month</span>
              <span className="text-sm">
                {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
              </span>
            </div>
            <div>
              <Slider
                value={salaryRange}
                onValueChange={setSalaryRange}
                defaultValue={[50, 80]}
                max={100}
                className="w-full mt-2"
              />
            </div>
          </div>

          <div className="flex justify-between w-full col-span-1 md:col-span-4">
            <div>
              {pathname === "/jobs" && (
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="ml-2">Back</span>
                </Link>
              )}
            </div>
            <div>
              <Button
                onClick={handleSearch}
                className="bg-[#00AAFF] hover:bg-[#0099EE] text-white px-8 py-2.5"
              >
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
