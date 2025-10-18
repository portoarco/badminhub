"use client";
import { useEffect, useState } from "react";
import { useVenueStore } from "../store/venue-store";
import { useRouter } from "next/navigation";
import { apiCall } from "@/helper/apiCall";
const COUNTDOWN_DURATION = 30 * 60 * 1000; //keep 30 menit
const STORAGE_KEY = "cd-keep-slot";

export default function CountdownKeepSlot() {
  const [timeLeft, setTimeLeft] = useState(0);
  const { clearSlots, selectedVenueSlots } = useVenueStore();
  const router = useRouter();

  const removeSlotfromDb = async () => {
    try {
      const res = await apiCall.delete("/venue/remove-slot", {
        data: selectedVenueSlots,
      });
      clearSlots();
      if (!res) return alert("There is something wrong!");
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let startTime = localStorage.getItem(STORAGE_KEY);
    if (!startTime) {
      const now = Date.now();
      localStorage.setItem(STORAGE_KEY, now.toString());
      startTime = now.toString();
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - parseInt(startTime as string, 10);
      const remaining = COUNTDOWN_DURATION - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        localStorage.removeItem(STORAGE_KEY);
        clearInterval(interval);
        clearSlots();
        removeSlotfromDb();
        // router.replace("/");
      } else {
        setTimeLeft(Math.floor(remaining / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-xl text-red-500 font-medium">
          Waktu Keep Slot sisa: {String(hours).padStart(2, "0")}:
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </p>
        {timeLeft === 0 && (
          <p className="text-red-600 font-semibold">
            Waktu habis! Silakan lakukan booking ulang.
          </p>
        )}
      </div>
    </>
  );
}
