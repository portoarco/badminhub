import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ArchiveX,
  ArrowBigRightDash,
  Clock,
  MapPin,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { venueBookingCart } from "../data/dummyVenueBookingCart";

interface IBookingList {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function BookingList({ open, setOpen }: IBookingList) {
  const router = useRouter();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader className="text-center mt-5">
          <SheetTitle className="text-xl font-medium">
            Daftar Pesanan
          </SheetTitle>
          <SheetDescription>Daftar venue yang akan dipesan</SheetDescription>
          <hr></hr>
        </SheetHeader>
        <section className="px-5 flex flex-col gap-3">
          {venueBookingCart && venueBookingCart.length > 0 ? (
            venueBookingCart.map((cart) => (
              <div
                key={cart.id}
                className="bg-gray-200/30 rounded-md px-4 py-3 border-l-4 border-emerald-500 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{cart.name}</p>
                  <div className="flex gap-x-5 mt-1 text-sm">
                    <p className="flex items-center gap-x-1">
                      <MapPin className="size-3" />
                      {cart.city}
                    </p>

                    <p className="flex items-center gap-x-1 ">
                      <Clock className="size-3" />
                      {cart.start_time} - {cart.end_time}
                    </p>
                  </div>
                </div>
                <button type="button" className="cursor-pointer">
                  <Trash className="size-5 " />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300 text-sm flex items-center justify-center gap-x-5">
              <ArchiveX /> Tidak ada item yang ditambahkan
            </p>
          )}
        </section>
        {venueBookingCart.length > 0 && (
          <SheetFooter>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              onClick={() => router.push("/checkout")}
            >
              Checkout Pesanan <ArrowBigRightDash />
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
