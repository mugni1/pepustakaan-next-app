"use client";
import BtnHref from "@/components/Admin/Button/BtnHref";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function SearchAddBtn() {
  const pathName = usePathname();
  const router = useRouter();
  const [key, setKey] = useState<string>("");
  const addLink = pathName == "/dashboard/member" ? "member/add" : "admin/add";

  function handleSearch() {
    event?.preventDefault();
    router.push(`${pathName}?keyword=${key}`);
  }

  return (
    <section className="w-full flex items-center justify-between mb-5">
      {/* btn href  */}
      <BtnHref href={addLink}>
        <AiOutlineUserAdd size={24} /> Tambah
      </BtnHref>
      {/* end btn href  */}

      {/* search */}
      <form
        action={() => handleSearch()}
        className="relative h-fit w-auto group text-slate-600"
      >
        <button
          type="submit"
          className="absolute h-full flex items-center px-2 right-0"
        >
          <MagnifyingGlass size={24} />
        </button>
        <input
          type="text"
          className="py-1 ps-2 border border-slate-400 rounded-md bg-white outline-purple-500 pe-9 shadow-md"
          placeholder="Cari Anggota"
          onChange={(e) => setKey(e.target.value)}
        />
      </form>
      {/* end search  */}
    </section>
  );
}
