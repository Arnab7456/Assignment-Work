import Navbar from "@/components/Navbar";
import SearchFilter from "@/components/SearchFilter";
export default function Home() {
  return (
    <div className="grid items-center justify-items-center  pb-5 sm:p-5 sm:pb-5 bg-[#FBFBFF] shadow-sm">
      <Navbar />
      <div className="mt-4">
        <SearchFilter />
      </div>
    </div>
  );
}
