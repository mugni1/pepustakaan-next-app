"use client";
import { usePathname } from "next/navigation";
import BarMenu from "./BarMenu";
import BarMenu2 from "./BarMenu2";
import {
  ArrowUUpLeft,
  ArrowUUpRight,
  BookOpenText,
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
      className={`items-center min-h-screen bg-white border-e border-slate-300 fixed transition-all ease-in-out duration-100 overflow-hidden ${className}`}
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
            pathName == "/dashboard/borrow" ||
            pathName == "/dashboard/return" ||
            pathName == "/dashboard/late" ||
            pathName.startsWith(`/dashboard/borrow/`) ||
            pathName.startsWith(`/dashboard/return/`) ||
            pathName.startsWith(`/dashboard/late/`)
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
              pathName == "/dashboard/borrow" ||
              pathName == "/dashboard/return" ||
              pathName == "/dashboard/late" ||
              pathName.startsWith(`/dashboard/borrow/`) ||
              pathName.startsWith(`/dashboard/return/`) ||
              pathName.startsWith(`/dashboard/late/`)
                ? "h-28 visible"
                : "h-0"
            }`}
          >
            <BarMenu2 title="Peminjaman" href="/dashboard/borrow">
              <ArrowUUpLeft size={24} />
            </BarMenu2>
            <BarMenu2 title="Pengembalian" href="/dashboard/return">
              <ArrowUUpRight size={24} />
            </BarMenu2>
            <BarMenu2 title="Terlambat" href="/dashboard/late">
              <HourglassSimpleMedium size={24} />
            </BarMenu2>
          </ul>
        </li>
        {/* End Transaction  */}
        <BarMenu title="Riwayat Transaksi" href="/dashboard/transaction">
          <ClockCounterClockwise size={24} />
        </BarMenu>
      </ul>
      {/* end list navigasi  */}
    </nav>
  );
}
