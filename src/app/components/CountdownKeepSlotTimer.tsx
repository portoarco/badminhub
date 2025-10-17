"use client";
import { useEffect, useState } from "react";
const COUNTDOWN_DURATION = 1 * 60 * 1000; //keep 1 menit
const STORAGE_KEY = "cd-keep-slot";

export default function CountdownKeepSlot() {
  const [timeLeft, setTimeLeft] = useState(0);

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
