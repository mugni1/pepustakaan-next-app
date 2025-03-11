"use client";
import BtnHref from "@/components/BtnHref";
import ButtonSolid from "@/components/BtnHref";
import Link from "next/link";
import { useRef } from "react";
export default function Page() {
  const name = useRef<HTMLInputElement>(null);
  return (
    <main className="w-full p-5">
      <section className=" w-4/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col">
        <h1 className=" w-full text-center font-bold text-2xl">
          Tambah Buku Baru
        </h1>
        <form
          //   onSubmit={(e) => handleSubmit(e)}
          className="w-full grid grid-cols-2 gap-5"
        >
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Judul Buku"
            ref={name}
            required
          />
          <div className=" flex gap-5 items-center">
            <button className=" bg-gradient-to-br from-fuchsia-500 to-purple-600 py-1 px-5 rounded-md shadow-md font-bold text-white text-lg">
              Submit
            </button>
            <BtnHref href="/dashboard/category">Back</BtnHref>
          </div>
        </form>
      </section>
    </main>
  );
}
