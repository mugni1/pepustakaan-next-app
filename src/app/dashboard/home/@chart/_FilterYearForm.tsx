"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function FilterYearForm() {
  const year = useRef<null | HTMLInputElement>(null);
  const router = useRouter();
  const handleSubmit = () => {
    event?.preventDefault();
    router.push(
      `/dashboard/home?year=${year.current?.value ?? new Date().getFullYear()}`
    );
  };
  return (
    <form className=" flex gap-2" onSubmit={handleSubmit}>
      <input
        type="number"
        name="year"
        id="year"
        min="2000"
        max="2200"
        placeholder="Pilih Tahun"
        className="py-1 px-3 border rounded-md border-slate-600"
        ref={year}
      />
      <button className=" h-auto px-5 bg-green-500 text-white poppins-semibold rounded-md cursor-pointer active:scale-95 transition-all ease-in-out active:bg-slate-500 ">
        Simpan
      </button>
    </form>
  );
}
