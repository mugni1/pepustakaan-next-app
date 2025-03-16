"use client";
import { Clock } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function TimeNow() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      const formattedTime = now
        .toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(/\//g, "-")
        .replace(/\./g, ":");

      setTime(formattedTime);
    }, 1000);
  });
  return (
    <div className="h-full flex items-center">
      <div className=" flex bg-gradient-to-br from-fuchsia-500 to-purple-500 poppins-semibold text-white px-2 gap-2 py-1 rounded-lg">
        <span>
          <Clock size={24} />
        </span>
        <span>{time}</span>
      </div>
    </div>
  );
}
