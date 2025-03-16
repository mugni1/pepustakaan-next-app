"use client";
import { usePathname } from "next/navigation";
import BarMenu from "./BarMenu";
import BarMenu2 from "./BarMenu2";
import {
  BookOpenText,
  CaretCircleRight,
  CashRegister,
  ClockCounterClockwise,
  HouseLine,
  Tag,
  UsersThree,
} from "@phosphor-icons/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Sidebar({ className }: { className: string }) {
  const pathName = usePathname();
  const [fullName, setFullName] = useState<string | undefined>("");
  const [roleName, setRoleName] = useState<string | undefined>("");
  const [initialName, setInitialName] = useState<string | undefined>("");

  // set Role and Name
  useEffect(() => {
    setFullName(Cookies.get("fullName"));
    setRoleName(Cookies.get("roleName"));
    setInitialName(
      Cookies.get("fullName")?.substring(0, 1)?.toUpperCase() || "?"
    );
  }, []);
  return (
    <aside
      className={`items-center min-h-screen bg-white border-e border-slate-200 fixed transition-all ease-in-out duration-100 overflow-hidden ${className}`}
    >
      {/* TITLE DASHBOARD */}
      <div className="h-16 flex items-center justify-center w-full text-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white">
        <span className="poppins-bold">PUSTAKA</span>
      </div>
      {/* END TITLE DASHBOARD  */}

      {/* PROFILE */}
      <section className="flex w-full items-center px-5 py-5 gap-2">
        {/* avatar  */}
        <div className="w-4/12 flex items-center">
          <div className="h-12 w-12 rounded-full bg-emerald-500 text-center flex items-center justify-center text-2xl text-white">
            <span>{initialName}</span>
          </div>
        </div>
        {/* end awatar */}
        {/* name and status  */}
        <div className="w-8/12 flex flex-col gap-1">
          <span className="poppins-semibold line-clamp-1">
            {fullName ? fullName : "Anonim"}
          </span>
          <span className="py-1 text-xs text-center w-full rounded-md bg-amber-200 text-amber-600 poppins-semibold">
            {roleName ? roleName : "no role"}
          </span>
        </div>
        {/* edn name and status */}
      </section>
      {/* END PROFILE */}

      {/* LIST NAVIGASI */}
      <ul className="w-full">
        {/* Home  */}
        <BarMenu title="Beranda" href="/dashboard/home">
          <HouseLine size={24} />
        </BarMenu>
        {/* End Home  */}
        {/* Member  */}
        <BarMenu title="Anggota" href="/dashboard/member">
          <UsersThree size={24} />
        </BarMenu>
        {/* End Member  */}
        {/* Books  */}
        <BarMenu title="Buku" href="/dashboard/books">
          <BookOpenText size={24} />
        </BarMenu>
        {/* Edn Books  */}
        {/* Tag  */}
        <BarMenu title="Kategori" href="/dashboard/category">
          <Tag size={24} />
        </BarMenu>
        {/* End tag  */}
        {/* Transaction  */}
        <li
          className={`w-full px-5 py-2 transition-all ease-in-out duration-150 flex flex-col cursor-pointer group hover:bg-purple-100 ${
            pathName == "/dashboard/transaction-borrow" ||
            pathName == "/dashboard/transaction-return" ||
            pathName == "/dashboard/transaction-late" ||
            pathName.startsWith(`/dashboard/transaction-borrow/`) ||
            pathName.startsWith(`/dashboard/transaction-return/`) ||
            pathName.startsWith(`/dashboard/transaction-late/`)
              ? "bg-purple-100"
              : ""
          } `}
        >
          <div className="w-full flex justify-between items-center mb-2">
            <span>Transaksi</span>
            <CashRegister size={24} />
          </div>
          <ul
            className={`w-full group-hover:h-28 overflow-hidden group-hover:visible transition-all ease-in-out duration-200 ${
              pathName == "/dashboard/transaction-borrow" ||
              pathName == "/dashboard/transaction-return" ||
              pathName == "/dashboard/transaction-late" ||
              pathName.startsWith(`/dashboard/transaction-borrow/`) ||
              pathName.startsWith(`/dashboard/transaction-return/`) ||
              pathName.startsWith(`/dashboard/transaction-late/`)
                ? "h-28 visible"
                : "h-0"
            }`}
          >
            <BarMenu2
              title="List Peminjaman"
              href="/dashboard/transaction-borrow"
            >
              <CaretCircleRight size={20} />
            </BarMenu2>
            <BarMenu2
              title="List Pengembalian"
              href="/dashboard/transaction-return"
            >
              <CaretCircleRight size={20} />
            </BarMenu2>
            <BarMenu2 title="List Terlambat" href="/dashboard/transaction-late">
              <CaretCircleRight size={20} />
            </BarMenu2>
          </ul>
        </li>
        {/* End Transaction  */}
        {/* TRANSACTION HISTORY */}
        <li
          className={`w-full px-5 py-2 transition-all ease-in-out duration-150 flex flex-col cursor-pointer group hover:bg-purple-100 ${
            pathName == "/dashboard/history-transaction-all" ||
            pathName == "/dashboard/history-transaction-borrow" ||
            pathName == "/dashboard/history-transaction-return" ||
            pathName == "/dashboard/history-transaction-fine" ||
            pathName.startsWith(`/dashboard/history-transaction-all/`) ||
            pathName.startsWith(`/dashboard/history-transaction-borrow/`) ||
            pathName.startsWith(`/dashboard/history-transaction-return/`) ||
            pathName.startsWith(`/dashboard/history-transaction-fine/`)
              ? "bg-purple-100"
              : ""
          } `}
        >
          <div className="w-full flex justify-between items-center mb-2">
            <span>Riwayat Transaksi</span>
            <ClockCounterClockwise size={24} />
          </div>
          <ul
            className={`w-full group-hover:h-40 overflow-hidden group-hover:visible transition-all ease-in-out duration-200 ${
              pathName == "/dashboard/history-transaction-all" ||
              pathName == "/dashboard/history-transaction-borrow" ||
              pathName == "/dashboard/history-transaction-return" ||
              pathName == "/dashboard/history-transaction-fine" ||
              pathName.startsWith(`/dashboard/history-transaction-all/`) ||
              pathName.startsWith(`/dashboard/history-transaction-borrow/`) ||
              pathName.startsWith(`/dashboard/history-transaction-return/`) ||
              pathName.startsWith(`/dashboard/history-transaction-fine/`)
                ? "h-40 visible"
                : "h-0"
            }`}
          >
            <BarMenu2
              title="Semua Riwayat"
              href="/dashboard/history-transaction-all"
            >
              <CaretCircleRight size={20} />
            </BarMenu2>
            <BarMenu2
              title="List Peminjaman"
              href="/dashboard/history-transaction-borrow"
            >
              <CaretCircleRight size={20} />
            </BarMenu2>
            <BarMenu2
              title="List Pengembalian"
              href="/dashboard/history-transaction-return"
            >
              <CaretCircleRight size={20} />
            </BarMenu2>
            <BarMenu2
              title="List Denda"
              href="/dashboard/history-transaction-fine"
            >
              <CaretCircleRight size={20} />
            </BarMenu2>
          </ul>
        </li>
        {/* END TRANSACTION HISTORY */}
      </ul>
      {/* END LIST NAVIGASI  */}
    </aside>
  );
}
