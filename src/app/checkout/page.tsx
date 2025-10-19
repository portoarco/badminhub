"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiCall } from "@/helper/apiCall";
import { isEmailValid } from "@/helper/checkEmail";
import { convertISOToTimeString } from "@/helper/convertISOtoRegularTime";
import { convertDates } from "@/helper/convertIdnDates";
import { formatRupiah } from "@/helper/formatRupiah";
import {
  ArrowLeft,
  Calendar,
  CircleDollarSign,
  CircleX,
  Clock,
  HandCoins,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CountdownKeepSlot from "../components/CountdownKeepSlotTimer";
import { useVenueStore } from "../store/venue-store";
import { ITransaction } from "../types/transaction";

export default function CheckoutPage() {
  const { selectedVenueSlots, clearSlots } = useVenueStore();
  const [transactionData, setTransactionData] = useState<ITransaction | null>(
    null
  );

  const [token, setToken] = useState("");

  const router = useRouter();
  const inFirstNameRef = useRef<HTMLInputElement>(null);
  const inLastNameRef = useRef<HTMLInputElement>(null);
  const inEmailRef = useRef<HTMLInputElement>(null);
  const inPhoneRef = useRef<HTMLInputElement>(null);
  //

  const keepSlot = async () => {
    try {
      const res = await apiCall.post("/venue/keep-slot", selectedVenueSlots);
      if (!res) return alert("There is something wrong!");
    } catch (error) {
      console.log(error);
    }
  };

  const removeSlots = async () => {
    try {
      const confirmation = window.confirm(
        "Anda yakin ingin membatalkan booking?"
      );
      if (!confirmation) return;
      const res = await apiCall.delete("/venue/remove-slot", {
        data: selectedVenueSlots,
      });
      clearSlots();
      if (!res) return alert("There is something wrong!");
      router.replace("/");
    } catch (error) {
      console.log(error);
      alert("There is something wrong!");
    }
  };

  const calculateTransaction = async () => {
    const res = await apiCall.post(
      "/transaction/calculate",
      selectedVenueSlots
    );
    if (!res) return alert("Error");
    const trxData = res.data.data;
    // console.log(trxData);
    setTransactionData(trxData);
    try {
    } catch (error) {
      console.log(error);
      alert("There is something wrong");
    }
  };

  const createTransaction = async () => {
    try {
      const firstName = inFirstNameRef.current?.value.trim();
      const lastName = inLastNameRef.current?.value.trim();
      const email = inEmailRef.current?.value.trim();
      const phone = inPhoneRef.current?.value.trim();

      if (!firstName || !lastName || !email || !phone)
        return alert("Semua informasi user harus diisi");
      const checkEmail = isEmailValid(email);
      if (!checkEmail) return alert("Email invalid");

      const paymentData = {
        slots: selectedVenueSlots,
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
        },
        transactionData,
      };
      // console.log(paymentData);
      const res = await apiCall.post(
        "/transaction/create-transaction",
        paymentData
      );
      setToken(res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const createSuccessBooking = async (trxData: any[]) => {
    try {
      const firstName = inFirstNameRef.current?.value.trim();
      const lastName = inLastNameRef.current?.value.trim();
      const email = inEmailRef.current?.value.trim();
      const phone = inPhoneRef.current?.value.trim();

      const payload = {
        trxData,
        slots: selectedVenueSlots,
        firstName,
        lastName,
        email,
        phone,
      };

      // console.log("data transaksi sukses:", payload);
      const res = await apiCall.post("/transaction/create-bokpay", payload);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js"; // perlu diganti bila sudah ke production => cek di documentation FE Integration

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;
    scriptTag.type = "text/javascript";
    scriptTag.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
    );
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (!token) return;
    if (typeof window !== "undefined" && window.snap)
      window.snap.pay(token, {
        onSuccess: (result) => {
          // console.log("Pembayaran berhasil", result);
          createSuccessBooking(result);
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          clearSlots();
          setToken("");
          setTimeout(() => {
            router.replace("/");
          }, 200);
        },
        onPending: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          setToken("");
        },
        onError: (error) => {
          console.log(error);
          alert("There is something wrong");
          setToken("");
        },
        onClose: () => {
          setToken("");
          alert("Anda belum selesaikan pembayaran");
        },
      });
  }, [token]);

  useEffect(() => {
    if (!selectedVenueSlots) return;
    if (selectedVenueSlots.length === 0 || !selectedVenueSlots || token) {
      router.replace("/");
    }
    setTimeout(() => {
      keepSlot();
      calculateTransaction();
    }, 100);
  }, [selectedVenueSlots]);

  return (
    <section className="md:p-10 p-5 bg-gray-200/20 min-h-screen">
      <div className="flex max-sm:flex-col gap-5 items-center justify-between">
        <Image
          src="/assets/logo-tagline.png"
          alt="logo"
          width={150}
          height={150}
        />
        <div>
          <CountdownKeepSlot />
        </div>
        <h1 className="font-semibold lg:text-2xl flex items-center gap-x-4">
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

      <div className="flex max-lg:flex-col w-full gap-x-5 ">
        <section
          id="order-details"
          className=" mb-5 p-5 rounded-lg shadow-sm bg-white inset-shadow-xs  lg:w-1/2 h-full"
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
                  <div className="flex max-lg:flex-col  gap-x-5 mt-1 text-sm">
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
        <section id="left-content" className="  lg:w-1/2">
          <section
            id="user-form"
            className="mb-5 p-5 rounded-lg shadow-sm inset-shadow-xs bg-white "
          >
            <h1 className="text-xl font-medium mb-3">Informasi Pemesan</h1>
            <hr className="border-dashed mb-2" />
            <form>
              <div className="flex max-sm:flex-col w-full gap-5">
                <div className="md:w-1/2">
                  <label className="text-sm">Nama Depan</label>
                  <Input
                    placeholder="John"
                    className="uppercase"
                    ref={inFirstNameRef}
                  />
                </div>
                <div className="md:w-1/2">
                  <label className="text-sm">Nama Belakang</label>
                  <Input
                    placeholder="Doe"
                    className="uppercase"
                    ref={inLastNameRef}
                  />
                </div>
              </div>
              <div className="flex max-sm:flex-col w-full gap-5 mt-5">
                <div className="md:w-1/2">
                  <label className="text-sm">Email</label>
                  <Input
                    type="email"
                    placeholder="johndoe@mail.com"
                    ref={inEmailRef}
                  />
                </div>
                <div className="md:w-1/2">
                  <label className="text-sm">No.Telp/WA</label>
                  <Input
                    type="number"
                    placeholder="621111222"
                    ref={inPhoneRef}
                  />
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
              <div className="flex items-center justify-between text-sm">
                <p className="max-sm:text-xs">Biaya Sewa Lapangan</p>
                <p>
                  {formatRupiah(transactionData?.totalVenuePriceFormula ?? 0)}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="max-sm:text-xs">Biaya Administrasi</p>
                <p>{formatRupiah(transactionData?.adminFee ?? 0)}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="max-sm:text-xs">
                  Biaya PPN{" "}
                  <span className="text-xs">
                    (10% Total Biaya Sewa Lapangan)
                  </span>{" "}
                </p>
                <p>{formatRupiah(transactionData?.ppn ?? 0)}</p>
              </div>
            </div>
            <hr className=" my-2" />
            <div className="flex items-center justify-between text-sm">
              <p className="max-sm:text-xs">Total Biaya</p>
              <p>{formatRupiah(transactionData?.totalFixPrice ?? 0)}</p>
            </div>
          </section>
          <div id="payment-simulator" className="my-3">
            <Link
              href="https://simulator.sandbox.midtrans.com/"
              className="hover:underline-offset-2 hover:underline"
              target="blank"
            >
              <p>Klik disini untuk membayar pesanan</p>
            </Link>
          </div>
          <div className="flex max-sm:flex-col gap-5 ">
            <Button
              className=" rounded-lg p-4 cursor-pointer shadow-md md:w-1/3"
              variant={"destructive"}
              onClick={removeSlots}
            >
              <CircleX className="size-4" />
              Batalkan Pemesanan
            </Button>
            <Button
              className=" md:w-1/2 text-[14px]  bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg cursor-pointer shadow-md "
              onClick={createTransaction}
            >
              <CircleDollarSign className="size-5" /> Bayar Sekarang
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
}
