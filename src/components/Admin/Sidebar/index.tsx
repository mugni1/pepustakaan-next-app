"use client";
import { usePathname } from "next/navigation";
import BarMenu from "./BarMenu";
import BarMenu2 from "./BarMenu2";
import {
  ArrowUUpLeft,
  ArrowUUpRight,
  BookOpenText,
  CaretCircleRight,
  CashRegister,
  ClockCounterClockwise,
  HourglassSimpleMedium,
  HouseLine,
  Tag,
  UsersThree,
} from "@phosphor-icons/react";

export default function Sidebar({ className }: { className: string }) {
  const pathName = usePathname();
  return (
    <nav
      className={`items-center min-h-screen bg-white border-e border-slate-200 fixed transition-all ease-in-out duration-100 overflow-hidden ${className}`}
    >
      {/* brand  */}
      <div className="h-16 flex items-center justify-center w-full text-xl">
        <span className="poppins-bold">PUSTAKA</span>
      </div>
      {/* end brand  */}
      {/* list navigasi  */}
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
    </nav>
  );
}
