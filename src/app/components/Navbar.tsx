"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useVenueStore } from "../store/venue-store";
import BookingList from "./BookingList";

export default function Navbar() {
  const [openBookingList, setOpenBookingList] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { selectedVenueSlots } = useVenueStore();

  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-white z-50 shadow-sm p-5">
        <section className="flex justify-between items-center">
          {/* Logo */}
          <div id="logo">
            <Link href="/">
              <Image
                src="/assets/logo-tagline.png"
                alt="logo"
                width={150}
                height={150}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className=" hidden lg:flex items-center">
            <ul className="flex gap-x-10">
              <li>
                <Link
                  href="#"
                  onClick={() => alert("Mohon maaf fitur ini belum tersedia")}
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => alert("Mohon maaf fitur ini belum tersedia")}
                >
                  Cari Lapangan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => alert("Mohon maaf fitur ini belum tersedia")}
                >
                  Gabung Komunitas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => alert("Mohon maaf fitur ini belum tersedia")}
                >
                  Kontak Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-x-4">
            {/* Cart */}
            <button
              className="relative cursor-pointer"
              onClick={() => setOpenBookingList((prev) => !prev)}
            >
              <ShoppingCart className="size-6" />
              {selectedVenueSlots.length > 0 && (
                <div className="absolute -top-1 -right-2 bg-red-500 w-4 h-4 rounded-full">
                  <p className="text-[10px] text-white text-center">
                    {selectedVenueSlots.length}
                  </p>
                </div>
              )}
            </button>

            <p className="max-lg:hidden text-4xl font-extralight text-gray-500">
              |
            </p>

            <Button
              className="max-lg:hidden  bg-[#274d8f] hover:bg-[#18315b] cursor-pointer  rounded-full text-[15px]"
              onClick={() =>
                alert("Mohon maaf fitur login/register belum tersedia")
              }
            >
              Login/Daftar
            </Button>

            {/* Hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setOpenMenu((prev) => !prev)}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </section>

        {/* Mobile Menu */}
        {openMenu && (
          <div className=" mt-4 bg-white border-t pt-4 space-y-3">
            <ul className="flex flex-col gap-y-3">
              <li>
                <Link
                  href="#"
                  onClick={() => alert("Mohon maaf fitur ini belum tersedia")}
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => alert("Mohon maaf fitur ini belum tersedia")}
                >
                  Cari Lapangan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => alert("Mohon maaf fitur ini belum tersedia")}
                >
                  Gabung Komunitas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => alert("Mohon maaf fitur ini belum tersedia")}
                >
                  Kontak Kami
                </Link>
              </li>
            </ul>

            <Button
              className="w-full bg-[#274d8f] hover:bg-[#18315b] cursor-pointer mt-3 rounded-full text-[15px]"
              onClick={() =>
                alert("Mohon maaf fitur login/register belum tersedia")
              }
            >
              Login/Daftar
            </Button>
          </div>
        )}
      </nav>

      {/* Booking List */}
      <BookingList open={openBookingList} setOpen={setOpenBookingList} />

      {/* Spacer agar konten tidak tertutup navbar */}
      <div className="h-[100px]" />
    </>
  );
}
