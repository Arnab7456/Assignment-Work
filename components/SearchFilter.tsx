"use client";
import { Search, MapPin, Users, ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function SearchFilter() {
  return (
    <div className="bg-inherit py-6">
      <div className="container mx-auto px-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative pb-4 border-b border-gray-500 md:border-b-0 md:border-r-2 md:border-gray-300 md:pr-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              className="w-full pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="relative pb-4 border-b border-gray-500 md:border-b-0 md:border-r-2 md:border-gray-300  md:pr-4">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <div className="flex items-center w-full pl-10 pr-4 py-2.5 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500">
              <span className="text-gray-500 flex-1">Preferred Location</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="relative pb-4 border-b border-gray-400 md:border-b-0 md:border-r-2 md:border-gray-300 md:pr-4">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <div className="flex items-center w-full pl-10 pr-4 py-2.5 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500">
              <span className="text-gray-500 flex-1">Job type</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Salary Per Month</span>
              <span className="text-sm font-medium">₹50k - ₹80k</span>
            </div>
            <div className="w-full">
              <Slider defaultValue={[1, 80]} max={100} className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
