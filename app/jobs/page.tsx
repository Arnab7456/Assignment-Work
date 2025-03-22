// app/jobs/page.tsx
import  SearchFilter  from "../../components/SearchFilter";
import CompanyListing from "../../components/CompanyListing";
import { Suspense } from "react";

export default function JobsPage() {
  return (
    <div className="container mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
      <SearchFilter />
      <CompanyListing />
        </Suspense>
    </div>
  )
}