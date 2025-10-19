"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { IVenue } from "../types/venue";

interface IDropDownVenueList {
  venueList: IVenue[];
}

export default function DropDownVenueList({ venueList }: IDropDownVenueList) {
  const [selectedVenue, setSelectedVenue] = useState<string | undefined>(
    undefined
  );
  return (
    <div className="flex flex-col gap-2">
      <Label>Pilih Lapangan</Label>
      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-full font-normal shadow-none rounded-sm"
              variant={"outline"}
            >
              {selectedVenue ? selectedVenue : "Pilihan Lapangan"}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2">
            <DropdownMenuLabel>Daftar Lapangan</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {venueList.map((venue, idx) => (
              <DropdownMenuItem
                key={idx}
                onSelect={(selectedVenue) => {
                  setSelectedVenue(venue.name);
                }}
              >
                {venue.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
