import { Facebook, Headset, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-300/20 w-full p-10 flex max-sm:flex-col max-sm:gap-5 justify-between items-center">
      <div>
        <p className="text-gray-500">©2025 PT Badminton Hub Indonesia</p>
      </div>
      <div className="flex gap-x-4 items-center text-gray-500">
        <Link href="#">
          <Instagram />
        </Link>
        <Link href="#">
          <Youtube />
        </Link>
        <Link href="#">
          <Facebook />
        </Link>
        <Link href="#">
          <Headset />
        </Link>
      </div>
    </footer>
  );
}
