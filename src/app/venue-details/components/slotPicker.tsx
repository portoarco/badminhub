"use client";
import { useVenueStore } from "@/app/store/venue-store";
import { IVenue } from "@/app/types/venue";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { convertTimeToISO } from "@/helper/convertTimeToISO";
import { generateDates } from "@/helper/generateDates";
import { CalendarDays, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

const timeSlots = [
  { id: 1, start_time: "08.00", end_time: "09.00" },
  { id: 2, start_time: "09.00", end_time: "10.00" },
  { id: 3, start_time: "10.00", end_time: "11.00" },
  { id: 4, start_time: "11.00", end_time: "12.00" },
  { id: 5, start_time: "12.00", end_time: "13.00" },
  { id: 6, start_time: "13.00", end_time: "14.00" },
  { id: 7, start_time: "14.00", end_time: "15.00" },
  { id: 8, start_time: "15.00", end_time: "16.00" },
  { id: 9, start_time: "16.00", end_time: "17.00" },
  { id: 10, start_time: "17.00", end_time: "18.00" },
  { id: 11, start_time: "18.00", end_time: "19.00" },
  { id: 12, start_time: "19.00", end_time: "20.00" },
  { id: 13, start_time: "20.00", end_time: "21.00" },
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
  const { selectedVenueSlots, addOrRemoveSlot } = useVenueStore();

  //
  const chooseSlot = (
    slotId: number,
    venueId: string,
    start_time: string,
    end_time: string
  ) => {
    const startTimeISO = `${selectedDate}T${convertTimeToISO(start_time)}Z`;
    const endTimeISO = `${selectedDate}T${convertTimeToISO(end_time)}Z`;

    const newSlot = {
      slotId,
      venueId,
      venueName: venueData.name,
      venueCity: venueData.city,
      venuePrice: venueData.price,
      start_time: startTimeISO,
      end_time: endTimeISO,
      date: selectedDate,
    };
    addOrRemoveSlot(newSlot);
  };

  useEffect(() => {
    setDates(generateDates(new Date(selectedDate), 10));
  }, [date]);

  return (
    <section>
      <h1 className="text-3xl font-medium"> Choose Your Time</h1>
      <section className="w-full mt-5 rounded-lg  inset-shadow-2xs shadow-md bg-white p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-5">
          {dates.map((item) => (
            <button
              key={`${item.id}-${item.fullDate}`}
              onClick={() => {
                setSelectedDate(item.fullDate);
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
          <div className="flex flex-col  gap-3 ">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className=" h-full max-lg:w-60  rounded-xl justify-between font-normal"
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
      <section className="w-full mt-5 rounded-lg shadow-md bg-white p-5">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
          {timeSlots.map((slot) => {
            // 🔹 pastikan time_slots adalah array sebelum dicek
            const isBooked =
              Array.isArray(venueData.time_slots) &&
              venueData.time_slots?.some((ts: any) => {
                const slotStartHour = slot.start_time.split(".")[0];
                const dbStartHour = new Date(ts.start_time)
                  .getUTCHours()
                  .toString()
                  .padStart(2, "0");
                const dbDate = new Date(ts.start_time)
                  .toISOString()
                  .split("T")[0];
                return (
                  slotStartHour === dbStartHour &&
                  dbDate === selectedDate &&
                  ts.isBooked === true
                );
              });

            const isSelected = selectedVenueSlots.some(
              (s: any) => s.slotId === slot.id && s.date === selectedDate
            );

            return (
              <button
                key={`${slot.id}-${selectedDate}`}
                className={`p-5 rounded-xl shadow-xs cursor-pointer transition-all
        ${
          isBooked
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : isSelected
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-blue-100"
        }`}
                onClick={() =>
                  !isBooked &&
                  chooseSlot(
                    slot.id,
                    venueData.id,
                    slot.start_time,
                    slot.end_time
                  )
                }
                disabled={isBooked}
              >
                <p
                  className={`text-sm mb-2 ${
                    isBooked ? "text-gray-400" : "text-black"
                  }`}
                >
                  {isBooked ? "Booked" : isSelected ? "Selected" : "Available"}
                </p>
                <p className="md:text-lg font-medium">
                  {slot.start_time} - {slot.end_time}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    </section>
  );
}
