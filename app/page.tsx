'use client'
import { motion } from "framer-motion";
import SearchFilter from "@/components/SearchFilter";
import CompanyListing from "@/components/CompanyListing";

export default function Home() {
  return (

    <motion.div
    >
      <div className="bg-inherit grid items-center justify-items-center ">
          
          <SearchFilter />
          
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-4 w-full"
        >
          <CompanyListing />
        </motion.section>
      </div>
    </motion.div>
  );
}
