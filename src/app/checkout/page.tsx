"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  CircleDollarSign,
  Clock,
  HandCoins,
  MapPin,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useVenueStore } from "../store/venue-store";
import { convertISOToTimeString } from "@/helper/convertISOtoRegularTime";
import { convertDates } from "@/helper/convertIdnDates";
import CountdownKeepSlot from "../components/CountdownKeepSlotTimer";
import { ISelectedVenueSlot } from "../types/venue";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useState } from "react";
import { ITransaction } from "../types/transaction";
import { formatRupiah } from "@/helper/formatRupiah";

export default function CheckoutPage() {
  const { selectedVenueSlots, removeSlotBySlotId } = useVenueStore();
  const [transactionData, setTransactionData] = useState<ITransaction | null>(
    null
  );

  // const keepSlot = async () => {
  //   try {
  //     const res = await apiCall.post("/venue/keep-slot", selectedVenueSlots);
  //     if (!res) return alert("There is something wrong!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const calculateTransaction = async () => {
    const res = await apiCall.post("/transaction", selectedVenueSlots);
    if (!res) return alert("Error");
    const trxData = res.data.data;
    console.log(trxData);
    setTransactionData(trxData);
    try {
    } catch (error) {
      console.log(error);
      alert("There is something wrong");
    }
  };

  // useEffect(() => {
  //   keepSlot();
  // }, []);

  useEffect(() => {
    calculateTransaction();
  }, []);
  return (
    <section className="px-40 py-10 bg-gray-200/20 min-h-screen">
      <div className="flex items-center justify-between">
        <Image
          src="/assets/logo-tagline.png"
          alt="logo"
          width={250}
          height={250}
        />
        <div>{/* <CountdownKeepSlot /> */}</div>
        <h1 className="font-semibold text-2xl flex items-center gap-x-4">
          Checkout Page <HandCoins />
        </h1>
      </div>

      <div className="flex items-center my-4 gap-x-3">
        <ArrowLeft className="size-4 " />{" "}
        <Link href="/">
          <p className="hover:underline hover:underline-offset-4 ">
            Kembali ke Awal
          </p>
        </Link>
      </div>

      <div className="flex w-full gap-x-5 ">
        <section
          id="order-details"
          className=" mb-5 p-5 rounded-lg shadow-sm bg-white inset-shadow-xs  w-1/2 h-full"
        >
          <h1 className="text-xl font-medium"> Rincian Pemesanan</h1>
          <hr className="border-dashed my-2" />
          <section className="grid grid-cols-1 gap-2">
            {selectedVenueSlots.map((cart, idx) => (
              <div
                key={idx}
                className="bg-gray-100/30 px-4 py-3 border-l-4 border-emerald-500  flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{cart.venueName}</p>
                  <div className="flex gap-x-5 mt-1 text-sm">
                    <p className="flex items-center gap-x-1">
                      <MapPin className="size-3" />
                      {cart.venueCity}
                    </p>

                    <p className="flex items-center gap-x-1 ">
                      <Clock className="size-3" />
                      {convertISOToTimeString(cart.start_time)} -{" "}
                      {convertISOToTimeString(cart.end_time)}
                    </p>
                    <p className="flex items-center gap-x-1 ">
                      <Calendar className="size-3" />
                      {convertDates(cart.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </section>
        <section id="left-content" className="  w-1/2">
          <section
            id="user-form"
            className="mb-5 p-5 rounded-lg shadow-sm inset-shadow-xs bg-white "
          >
            <h1 className="text-xl font-medium mb-3">Informasi Pemesan</h1>
            <hr className="border-dashed mb-2" />
            <form>
              <div className="flex w-full gap-5">
                <div className="w-1/2">
                  <label className="text-sm">Nama Depan</label>
                  <Input placeholder="John" />
                </div>
                <div className="w-1/2">
                  <label className="text-sm">Nama Belakang</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="flex w-full gap-5 mt-5">
                <div className="w-1/2">
                  <label className="text-sm">Email</label>
                  <Input type="email" placeholder="johndoe@mail.com" />
                </div>
                <div className="w-1/2">
                  <label className="text-sm">No.Telp/WA</label>
                  <Input type="tel" placeholder="+621111222" />
                </div>
              </div>
            </form>
          </section>
          <section
            id="order-summary"
            className="mb-5 p-5 rounded-lg shadow-sm inset-shadow-xs bg-white "
          >
            <h1 className="text-xl font-medium">Rincian Pembayaran</h1>
            <hr className="border-dashed my-2" />
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between text-sm">
                <p>Biaya Sewa Lapangan</p>
                <p>
                  {formatRupiah(transactionData?.totalVenuePriceFormula ?? 0)}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Biaya Administrasi</p>
                <p>{formatRupiah(transactionData?.adminFee ?? 0)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>
                  Biaya PPN{" "}
                  <span className="text-xs">
                    (10% Total Biaya Sewa Lapangan)
                  </span>{" "}
                </p>
                <p>{formatRupiah(transactionData?.ppn ?? 0)}</p>
              </div>
            </div>
            <hr className=" my-2" />
            <div className="flex justify-between text-sm">
              <p>Total Biaya</p>
              <p>{formatRupiah(transactionData?.totalFixPrice ?? 0)}</p>
            </div>
          </section>
          <Button className="w-full text-[16px]  bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg cursor-pointer ">
            <CircleDollarSign className="size-5" /> Bayar Sekarang
          </Button>
        </section>
      </div>
    </section>
  );
}
