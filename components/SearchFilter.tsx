"use client";
import { Search, MapPin, Users, ChevronsUpDown } from "lucide-react";
import { CommandInput } from "@/components/ui/command";
import { Slider } from "@/components/ui/slider";
import { cn } from "../lib/utils";
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
import { useRouter } from "next/navigation";

const locations = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

const jobTypes = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
];

export default function SearchFilter() {
  const router = useRouter();
  const [openLocation, setOpenLocation] = useState(false);
  const [locationValue, setLocationValue] = useState("");
  const [openJobType, setOpenJobType] = useState(false);
  const [jobTypeValue, setJobTypeValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryRange, setSalaryRange] = useState([50, 80]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append('search', searchQuery);
    }
    if (locationValue) {
      params.append('location', locationValue);
    }
    if (jobTypeValue) {
      params.append('jobType', jobTypeValue);
    }
    params.append('minSalary', salaryRange[0].toString());
    params.append('maxSalary', salaryRange[1].toString());
    // Navigate with query parameters
    router.push(`jobs?${params.toString()}`);
  };

  return (
    <div className="bg-inherit py-6">
      <div className="container mx-auto px-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
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

          {/* Location Selector */}
          <div className="relative pb-4 border-b border-gray-500 md:border-b-0 md:border-r-2 md:border-gray-300 md:pr-4">
          <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <Popover open={openLocation} onOpenChange={setOpenLocation}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openLocation}
                  className="w-full pl-12 pr-4 py-2.5 h-auto justify-between font-normal"
                >
                  {locationValue || "Preferred Location"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 shadow-lg rounded-md border border-gray-200 animate-slide-in bg-white">
                <Command>
                  <CommandInput placeholder="Search location..." />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((location) => (
                        <CommandItem
                          key={location.value}
                          value={location.value}
                          onSelect={(currentValue) => {
                            setLocationValue(
                              currentValue === locationValue ? "" : currentValue
                            );
                            setOpenLocation(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              locationValue === location.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {location.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="relative pb-4 border-b border-gray-400 md:border-b-0 md:border-r-2 md:border-gray-300 md:pr-4">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Popover open={openJobType} onOpenChange={setOpenJobType}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openJobType}
                  className="w-full pl-10 pr-4 py-2.5 h-auto justify-between font-normal"
                >
                  {jobTypeValue || "Job Type"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search job type..." />
                  <CommandList>
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
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              jobTypeValue === jobType.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {jobType.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Salary Per Month</span>
              <span className="text-sm font-medium">₹50k - ₹80k</span>
            </div>
            <div className="w-full">
              <Slider
              value={salaryRange}
              onValueChange={setSalaryRange}
              defaultValue={[1, 80]} max={100} className="w-full" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 flex justify-end mt-4">
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
  );
}
