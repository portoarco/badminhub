import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full  shadow-sm p-5 ">
      <section className="flex justify-between ">
        <div id="logo">
          <Link href="/">
            <Image
              src="/assets/logo-tagline.png"
              alt="logo"
              width={200}
              height={200}
            />
          </Link>
        </div>

        <div className="flex items-center ">
          <ul className="flex gap-x-10">
            <li>
              <Link href="#">Tentang Kami</Link>
            </li>
            <li>
              <Link href="#">Cari Lapangan</Link>
            </li>
            <li>
              <Link href="#">Gabung Komunitas</Link>
            </li>
            <li>
              <Link href="#">Kontak Kami</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-x-4">
          <Button className=" bg-[#274d8f] hover:bg-[#18315b] cursor-pointer p-5.5 rounded-full text-[15px]">
            Contact Us
          </Button>
          <Button className="bg-[#274d8f] hover:bg-[#18315b] cursor-pointer p-5.5 rounded-full text-[15px]">
            Login/Daftar
          </Button>
        </div>
      </section>
    </nav>
  );
}
