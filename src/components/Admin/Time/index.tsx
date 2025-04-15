"use client";
import { useEffect, useState } from "react";
import { LuClock } from "react-icons/lu";

export default function TimeNow() {
  const [time, setTime] = useState("Tunggu Sebentar...");

  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      const formattedTime = now
        .toLocaleString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(/\./g, ":");

      setTime(formattedTime);
    }, 1000);
  });
  return (
    <div className=" flex items-center font-semibold bg-accent1/10 text-accent2 px-2 gap-2 py-1 rounded-lg">
      <LuClock size={20} />
      <span>{time}</span>
    </div>
  );
}
