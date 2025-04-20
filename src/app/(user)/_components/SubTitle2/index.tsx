"use client";
import { Books } from "@phosphor-icons/react";
import React, { ReactNode } from "react";

export default function SubTitle2({
  children,
  className = "bg-purple-600",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mb-3 w-full flex items-center `}>
      <span
        className={`py-1 px-3 rounded-md text-white font-semibold text-xl flex items-center gap-2 ${className}`}
      >
        <Books size={30} />
        {children}
      </span>
    </section>
  );
}
