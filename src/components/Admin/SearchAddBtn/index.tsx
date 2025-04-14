"use client";
import BtnHref from "@/components/Admin/Button/BtnHref";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";

export default function SearchAddBtn({
  addLink,
  children,
}: {
  addLink?: string;
  children?: ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const [key, setKey] = useState<string>("");

  function handleSearch() {
    event?.preventDefault();
    router.push(`${pathName}?keyword=${key}`);
  }

  return (
    <section
      className={`w-full flex items-center  mb-5 ${
        !addLink ? "justify-end" : "justify-between"
      }`}
    >
      {/* btn href  */}
      {addLink && <BtnHref href={addLink}>{children}</BtnHref>}
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
          placeholder="Cari..."
          required
          onChange={(e) => setKey(e.target.value)}
        />
      </form>
      {/* end search  */}
    </section>
  );
}
