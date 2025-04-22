"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function SearchBookForm() {
  const q = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = () => {
    event?.preventDefault();
    router.push(`/?q=${q.current?.value}`);
  };
  return (
    <main className="mb-5">
      <form onSubmit={handleSubmit} className="gap-3 flex">
        <input
          type="text"
          className="py-1 px-3 border rounded-md shadow-md border-slate-500 outline-accent2 w-full md:w-6/12 xl:w-4/12"
          placeholder="Cari buku"
          ref={q}
        />
        <button className="bg-gradient-to-r from-accent1 to-accent2 px-2 py-1 rounded-md text-background1 shadow-md cursor-pointer">
          <MagnifyingGlass size={28} />
        </button>
      </form>
    </main>
  );
}
