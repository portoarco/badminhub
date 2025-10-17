"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookingList from "./BookingList";
import { venueBookingCart } from "../data/dummyVenueBookingCart";

export default function Navbar() {
  const [openBookingList, setOpenBookingList] = useState(false);

  return (
    <>
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
            <button
              className="relative cursor-pointer"
              onClick={() => setOpenBookingList((prev) => !prev)}
            >
              <ShoppingCart className="size-6" />
              <div className="absolute -top-1 -right-2 bg-red-500 w-4 h-4 rounded-full">
                <p className="text-[10px] text-white">
                  {venueBookingCart.length}
                </p>
              </div>
            </button>
            <p className="text-4xl font-extralight text-gray-500">|</p>
            <Button className="bg-[#274d8f] hover:bg-[#18315b] cursor-pointer p-5.5 rounded-full text-[15px]">
              Login/Daftar
            </Button>
          </div>
        </section>
      </nav>

      {/* Booking List */}
      <BookingList open={openBookingList} setOpen={setOpenBookingList} />
    </>
  );
}
