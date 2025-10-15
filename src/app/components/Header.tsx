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

export default function Header() {
  return (
    <header>
      <div></div>
      <div className="relative w-full h-150">
        <Image
          src="/assets/hero2.jpg"
          alt="hero"
          fill
          priority
          className="object-cover brightness-60"
        />
        <div className="absolute inset-0 items-center flex justify-between h-full w-full px-10">
          <div className="w-1/2">
            <h1 className=" text-white text-7xl font-semibold">
              Temukan Lapangan, <br />
              <span className="text-[#22de54] block mt-5">Pesan Sekarang!</span>
            </h1>
            <p className="text-gray-300 mt-5 text-lg">
              Nikmati kemudahan dalam mencari dan memesan lapangan olahraga
              secara praktis, cepat, dan sesuai dengan jadwal Anda
            </p>
          </div>
          <div className="w-1/4 p-3  rounded-xl  bg-gradient-to-r from-teal-400 to-yellow-200">
            <Card className=" ">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Cek Ketersediaan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-y-4">
                  <DropDownVenueList />
                  <DateandTimePicker />
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-yellow-400">
                  Cek Ketersediaan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </header>
  );
}
