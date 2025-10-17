"use client";
import { IVenue } from "@/app/types/venue";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { generateDates } from "@/helper/generateDates";
import { CalendarDays, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

const dummySlot = [
  { id: 1, isBooked: false, start_time: "08.00", end_time: "09.00" },
  { id: 2, isBooked: false, start_time: "09.00", end_time: "10.00" },
  { id: 3, isBooked: false, start_time: "10.00", end_time: "11.00" },
  { id: 4, isBooked: true, start_time: "11.00", end_time: "12.00" },
  { id: 5, isBooked: true, start_time: "12.00", end_time: "13.00" },
  { id: 6, isBooked: true, start_time: "13.00", end_time: "14.00" },
  { id: 7, isBooked: false, start_time: "14.00", end_time: "15.00" },
  { id: 8, isBooked: false, start_time: "15.00", end_time: "16.00" },
  { id: 9, isBooked: false, start_time: "16.00", end_time: "17.00" },
  { id: 10, isBooked: false, start_time: "17.00", end_time: "18.00" },
  { id: 11, isBooked: true, start_time: "18.00", end_time: "19.00" },
  { id: 12, isBooked: true, start_time: "19.00", end_time: "20.00" },
  { id: 13, isBooked: true, start_time: "20.00", end_time: "21.00" },
];

interface ISlotPicker {
  venueData: IVenue;
}

export default function SlotPicker({ venueData }: ISlotPicker) {
  const [selectedDate, setSelectedDate] = useState(
    generateDates(new Date(), 10)[0].fullDate
  );
  const [dates, setDates] = useState(generateDates(new Date(), 10));
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  //
  const [selectedSlot, setSelectedSlot] = useState();

  //
  const chooseSlot = (venueId: any, start_date: string, end_date: string) => {
    console.log(venueId);
    console.log(start_date);
    console.log(end_date);
  };

  useEffect(() => {
    setDates(generateDates(new Date(selectedDate), 10));
  }, [date]);
  return (
    <section>
      <h1 className="text-3xl font-medium"> Choose Your Time</h1>
      <section className="w-full mt-5 rounded-lg  inset-shadow-2xs shadow-md bg-white p-5">
        <div className="flex gap-x-10">
          {dates.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedDate(item.fullDate);
                // setDate(new Date(item.fullDate));
              }}
              className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl min-w-[70px] transition-all cursor-pointer
              ${
                selectedDate === item.fullDate
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-sm capitalize">{item.dayName}</span>
              <span className="font-semibold">{item.dateText}</span>
            </button>
          ))}
          <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className=" h-full rounded-xl justify-between font-normal"
                >
                  {date ? (
                    date.toLocaleDateString()
                  ) : (
                    <>
                      <CalendarDays />
                      <p>Select Date</p>
                    </>
                  )}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (date) {
                      const yyyy = date.getFullYear();
                      const mm = String(date.getMonth() + 1).padStart(2, "0");
                      const dd = String(date.getDate()).padStart(2, "0");
                      const localDate = `${yyyy}-${mm}-${dd}`;
                      setDate(date);
                      setSelectedDate(localDate);
                    }
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
      <section className="w-full mt-5 rounded-lg  inset-shadow-2xs shadow-md bg-white p-5">
        <div className="grid grid-cols-6 gap-5">
          {dummySlot.map((slot, idx) => (
            <button
              key={slot.id}
              className={` ${
                slot.isBooked ? "bg-gray-100" : "bg-gray-300"
              } p-5 rounded-xl shadow-xs cursor-pointer`}
              onClick={() =>
                chooseSlot(venueData.objectId, slot.start_time, slot.end_time)
              }
              disabled={slot.isBooked}
            >
              <p
                className={`${
                  slot.isBooked ? "text-gray-400" : "text-black  "
                } text-sm mb-2 `}
              >
                {slot.isBooked ? "Booked" : "Available"}
              </p>
              <p
                className={`${
                  slot.isBooked ? "text-gray-400" : "text-black"
                } text-lg font-medium`}
              >
                {slot.start_time} - {slot.end_time}
              </p>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
