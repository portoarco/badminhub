"use client";
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

export default function SlotPicker() {
  const [selectedDate, setSelectedDate] = useState(
    generateDates(new Date(), 10)[0].fullDate
  );
  const [dates, setDates] = useState(generateDates(new Date(), 10));
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setDates(generateDates(new Date(selectedDate), 10));
  }, [selectedDate]);
  return (
    <div>
      <h1 className="text-3xl font-medium"> Choose Your Time</h1>
      <div className="w-full mt-5 rounded-lg  inset-shadow-2xs shadow-md bg-white p-5">
        <div className="flex gap-x-10">
          {dates.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedDate(item.fullDate);
                setDate(new Date(item.fullDate));
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
      </div>
    </div>
  );
}
