"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export default function DateandTimePicker() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 justify-between">
        <Label>Tanggal Reservasi</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date-picker" className="font-normal">
              {date ? date.toLocaleDateString() : "Pilih Tanggal"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto mr-5 overflow-hidden p-3"
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-between gap-3">
        <Label>Jam Pemakaian</Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue="08:00:00"
          className=" w-1/2 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
      <div className="flex justify-between gap-3">
        <Label>Durasi Pemakaian</Label>
        <Input type="number" placeholder="3 jam" className="w-1/2"></Input>
      </div>
    </div>
  );
}
