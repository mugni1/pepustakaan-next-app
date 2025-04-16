"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
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
    <form className=" flex gap-2 mb-3" onSubmit={handleSubmit}>
      <input
        type="number"
        name="year"
        id="year"
        min="2000"
        max="2200"
        placeholder="Masukan Tahun"
        className="py-1 px-3 border rounded-md border-foreground outline-foreground w-2/12 "
        ref={year}
      />
      <BtnClick>Simpan</BtnClick>
    </form>
  );
}
