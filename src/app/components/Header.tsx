import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import DateandTimePicker from "./DateandTimePicker";
import DropDownVenueList from "./DropDownVenue";
import { IVenue } from "../types/venue";

interface IHeader {
  venueListData: IVenue[];
}

export default function Header({ venueListData }: IHeader) {
  return (
    <header className="relative -top-10 w-full h-[500px] md:h-[700px] sm:h-[550px]">
      {/* Background Image */}
      <Image
        src="/assets/hero2.jpg"
        alt="hero"
        fill
        priority
        className="object-cover brightness-60"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between h-full md:h-1/2 w-full px-6 md:px-10 gap-y-8 md:gap-y-0 top-1/4">
        {/* Left side text */}
        <div className="w-full  text-center md:text-left">
          <h1 className="text-white text-4xl  sm:text-5xl md:text-5xl lg:text-7xl font-semibold leading-tight">
            Temukan Lapangan,
            <br />
            <span className="text-[#22de54] block mt-3 sm:mt-5">
              Pesan Sekarang!
            </span>
          </h1>
          <p className="text-gray-300 mt-4 sm:mt-5 text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0">
            Nikmati kemudahan dalam mencari dan memesan lapangan olahraga secara
            praktis, cepat, dan sesuai dengan jadwal Anda.
          </p>
        </div>

        {/* Right side card */}
        <div className="w-full max-lg:hidden sm:w-[400px] md:w-1/3 p-3 rounded-xl bg-gray-300/50 backdrop-blur-sm">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl sm:text-3xl font-medium">
                Cek Ketersediaan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-y-4">
                <DropDownVenueList venueList={venueListData} />
                <DateandTimePicker />
              </form>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-base sm:text-lg py-5"
                onClick={() => alert("Mohon maaf, fitur ini belum tersedia")}
              >
                Cek Ketersediaan
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </header>
  );
}
