"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
import JobDrawer from "./JobDrawer";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("Full Time");
  return (
    <header className=" bg-inherit gap-4 shadow-sm rounded-full px-4">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src="/cmwlogo.svg" alt="Logo" width={32} height={32} />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 ">
            <Link
              href="#"
              className="text-gray-800 hover:text-purple-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-gray-800 hover:text-purple-600 font-medium"
            >
              Find Jobs
            </Link>
            <Link
              href="#"
              className="text-gray-800 hover:text-purple-600 font-medium"
            >
              Find Talents
            </Link>
            <Link
              href="#"
              className="text-gray-800 hover:text-purple-600 font-medium"
            >
              About us
            </Link>
            <Link
              href="#"
              className="text-gray-800 hover:text-purple-600 font-medium"
            >
              Testimonials
            </Link>
            <SignedOut>
              <Button className=" cursor-pointer bg-gradient-to-b from-[#A128FF] to-[#6100AD] hover:bg-purple-700 text-white rounded-full px-6">
                <Link href="/sign-up" className="text-white font-medium">
                  Sign Up
                </Link>
              </Button>
              <Button className=" cursor-pointer bg-gradient-to-b from-[#A128FF] to-[#6100AD] hover:bg-purple-700 text-white rounded-full px-6 ">
                <Link href="/sign-in" className="text-white font-medium">
                  Sign In
                </Link>
              </Button>
            </SignedOut>
           
          </nav>
        </div>

        <div>
          <SignedIn>
            <Button
              className=" cursor-pointer bg-gradient-to-b from-[#A128FF] to-[#6100AD] hover:bg-purple-700 text-white rounded-full px-6 ml-4"
              onClick={() => setOpen(true)}
            >
              Create Jobs
            </Button>
          </SignedIn>
          <JobDrawer
            open={open}
            setOpen={setOpen}
            selectedJobType={selectedJobType}
            setSelectedJobType={setSelectedJobType}
          />
         
        </div>
         <SignedIn>
          <div className="">
            <UserButton />
          </div>
          </SignedIn>
      </div>
    </header>
  );
}
