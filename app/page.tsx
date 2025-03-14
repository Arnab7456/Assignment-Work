import Image from "next/image";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <div className="grid items-center justify-items-center  p-2 pb-5 sm:p-5 sm:pb-5 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
    </div>
  );
}
