"use client";
import { jobListings } from "@/lib/company/companyList";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CompanyListing() {
 

  return (
    <main className="flex-1 bg-[#FBFBFF] py-4 sm:py-5 md:py-6 lg:py-7 xl:py-14 cursor-pointer">
      <div className="container mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-[#94949440] rounded-lg overflow-hidden flex items-center justify-center shadow-2xl">
                    {job.company === "amazon" && (
                      <div className="bg-black rounded-full w-full h-full flex items-center justify-center p-1.5">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={40} 
                          height={40} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    {job.company === "tesla" && (
                      <div className="bg-white w-full h-full flex items-center justify-center p-1">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={40} 
                          height={40} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {job.company === "Swiggy" && (
                      <div className="bg-orange-500 rounded-full w-full h-full flex items-center justify-center p-2">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={40} 
                          height={40} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm bg-[#B0D9FF] text-black px-2.5 py-1 rounded-xl">
                    {job.postedTime}
                  </span>
                </div>

                <h3 className="font-semibold text-base sm:text-lg md:text-xl line-clamp-2">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 flex-shrink-0"
                      viewBox="0 0 19 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.7 14.75C11.7 12.7618 9.28233 11.15 6.29999 11.15C3.31766 11.15 0.899994 12.7618 0.899994 14.75M15.3 12.05V9.35M15.3 9.35V6.65M15.3 9.35H12.6M15.3 9.35H18M6.29999 8.45C4.31177 8.45 2.69999 6.83822 2.69999 4.85C2.69999 2.86177 4.31177 1.25 6.29999 1.25C8.28822 1.25 9.89999 2.86177 9.89999 4.85C9.89999 6.83822 8.28822 8.45 6.29999 8.45Z"
                        stroke="#5A5A5A"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {job.experience}
                  </div>

                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 flex-shrink-0"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.76364 16.3408H3.49091M3.49091 16.3408H12.1273M3.49091 16.3408V4.42274C3.49091 3.45538 3.49091 2.97133 3.67918 2.60185C3.84478 2.27684 4.10882 2.0128 4.43383 1.8472C4.80331 1.65894 5.28736 1.65894 6.25472 1.65894H9.36381C10.3312 1.65894 10.8142 1.65894 11.1837 1.8472C11.5087 2.0128 11.7736 2.27684 11.9392 2.60185C12.1273 2.97097 12.1273 3.45443 12.1273 4.4199V9.43166M12.1273 16.3408H17.3091M12.1273 16.3408V9.43166M17.3091 16.3408H19.0364M17.3091 16.3408V9.43166C17.3091 8.62686 17.309 8.22465 17.1775 7.90723C17.0022 7.484 16.6663 7.14754 16.243 6.97223C15.9256 6.84075 15.5228 6.84075 14.718 6.84075C13.9132 6.84075 13.5108 6.84075 13.1933 6.97223C12.7701 7.14754 12.4341 7.484 12.2588 7.90723C12.1273 8.22465 12.1273 8.62685 12.1273 9.43166M6.08182 7.70439H9.53637M6.08182 5.11348H9.53637"
                        stroke="#5A5A5A"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {job.locationType}
                  </div>

                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 flex-shrink-0"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.1728 10.0001L8.99096 15.4546L0.809143 10.0001M17.1728 13.6365L8.99096 19.091L0.809143 13.6365M17.1728 6.36373L8.99096 11.8183L0.809143 6.36373L8.99096 0.90918L17.1728 6.36373Z"
                        stroke="#5A5A5A"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {job.salary}
                  </div>
                </div>

                <ul className="text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-2.5">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-1.5">•</span>
                    <span className="line-clamp-2">
                      A user-friendly interface lets you browse stunning photos
                      and videos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-1.5">•</span>
                    <span className="line-clamp-2">
                      Filter destinations based on interests and travel style,
                      and create personalized
                    </span>
                  </li>
                </ul>

                {job.tag ? (
                  <div
                    className={`relative ${
                      job.tag === "Govt Charge" ? "bg-pink-600" : "bg-gray-700"
                    } text-white  py-2 text-center text-sm sm:text-base`}
                  >
                    {job.tag === "Anonymous" && (
                      <div className="absolute -top-3 right-0">
                        <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                      </div>
                    )}
                    <span>{job.tag || "Apply Now"}</span>
                  </div>
                ) : (
                  <Button className="w-full bg-[#00AAFF] hover:bg-[#00AAFF] text-white py-2.5 sm:py-3 text-sm sm:text-base">
                    Apply Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
