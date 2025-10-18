import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { convertISOToTimeString } from "@/helper/convertISOtoRegularTime";
import {
  ArchiveX,
  ArrowBigRightDash,
  Calendar,
  Clock,
  MapPin,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useVenueStore } from "../store/venue-store";
import { convertDates } from "@/helper/convertIdnDates";
import { ISelectedVenueSlot } from "../types/venue";
import { apiCall } from "@/helper/apiCall";

interface IBookingList {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function BookingList({ open, setOpen }: IBookingList) {
  const router = useRouter();
  const { selectedVenueSlots, removeSlotBySlotId } = useVenueStore();

  // keep slot aktif (selama 15 menit, bila lebih dari 15, maka clear interval dan redirect ke landing )
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
          {selectedVenueSlots && selectedVenueSlots.length > 0 ? (
            selectedVenueSlots.map((cart, idx) => (
              <div
                key={idx}
                className="bg-gray-200/30 rounded-md px-4 py-3 border-l-4 border-emerald-500 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{cart.venueName}</p>
                  <div className="flex gap-x-5 mt-1 text-sm">
                    <p className="flex items-center gap-x-1">
                      <MapPin className="size-3" />
                      {cart.venueCity}
                    </p>
                  </div>
                  <div className="flex gap-x-5 items-center text-sm">
                    <div id="booking-date">
                      <p className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {convertDates(cart.date)}
                      </p>
                    </div>
                    <div id="booking-time">
                      <p className="flex items-center gap-x-1 ">
                        <Clock className="size-3" />
                        {convertISOToTimeString(
                          cart.start_time.toString()
                        )} - {convertISOToTimeString(cart.end_time.toString())}
                      </p>
                    </div>
                  </div>
                </div>
                <button type="button" className="cursor-pointer">
                  <Trash
                    className="size-5 "
                    onClick={() => {
                      const confirm = window.confirm(
                        "Anda yakin ingin menghapus?"
                      );
                      if (!confirm) return;
                      removeSlotBySlotId(cart.slotId);
                    }}
                  />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300 text-sm flex items-center justify-center gap-x-5">
              <ArchiveX /> Tidak ada item yang ditambahkan
            </p>
          )}
        </section>
        {selectedVenueSlots.length > 0 && (
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
