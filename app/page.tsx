import Navbar from "@/components/Navbar";
import SearchFilter from "@/components/SearchFilter";
import CompanyListing from "@/components/CompanyListing";

export default function Home() {
  return (
    <div >
      <div className="bg-inherit grid items-center justify-items-center pb-5 pt-5  shadow-sm shadow-[#C6BFBF40] backdrop-blur-md z-10">
        <Navbar />
        <div className="mt-4">
          <SearchFilter />
        </div>
        <section className="mt-4 w-full">
          <CompanyListing />
        </section>
      </div>
    </div>
  );
}
