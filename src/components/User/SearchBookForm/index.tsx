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
          className="py-1 px-3 border rounded-md shadow-md border-slate-500 outline-purple-500"
          placeholder="Cari buku"
          ref={q}
        />
        <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 px-2 py-1 rounded-md text-white shadow-md cursor-pointer">
          <MagnifyingGlass size={28} />
        </button>
      </form>
    </main>
  );
}
