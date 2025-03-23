"use client";
import { Calendar } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function TimeNow() {
  const [time, setTime] = useState("");

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
    <div className="h-full flex items-center">
      <div className=" flex bg-gradient-to-br from-fuchsia-200 to-purple-200 poppins-semibold text-purple-600 px-2 gap-2 py-1 rounded-lg">
        <span>
          <Calendar size={24} />
        </span>
        <span>{time}</span>
      </div>
    </div>
  );
}
