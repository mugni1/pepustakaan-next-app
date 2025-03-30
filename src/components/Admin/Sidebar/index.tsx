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
  TagSimple,
  UserCheck,
  Users,
} from "@phosphor-icons/react";
import ProfileMenu from "./ProfileMenu";
import TitleAside from "./TitleAside";

export default function Sidebar({ className }: { className: string }) {
  const pathTransactions = [
    "/dashboard/transaction-borrow",
    "/dashboard/transaction-return",
    "/dashboard/transaction-late",
  ];
  const pathHistoryTransactions = [
    "/dashboard/history-transaction-all",
    "/dashboard/history-transaction-borrow",
    "/dashboard/history-transaction-return",
    "/dashboard/history-transaction-fine",
  ];
  const pathName = usePathname();
  return (
    <aside
      className={`items-center min-h-screen bg-white border-e border-slate-200 fixed transition-all ease-in-out duration-100 ${className}`}
    >
      {/* TITLE DASHBOARD */}
      <TitleAside />
      {/* END TITLE DASHBOARD  */}

      {/* PROFILE */}
      <ProfileMenu />
      {/* END PROFILE */}

      {/* LIST NAVIGASI */}
      <ul className="w-full overflow-hidden">
        {/* Home  */}
        <BarMenu title="Beranda" href="/dashboard/home">
          <HouseLine size={24} />
        </BarMenu>
        {/* End Home  */}
        {/* Member  */}
        <BarMenu title="Anggota" href="/dashboard/member">
          <Users size={24} />
        </BarMenu>
        {/* End Member  */}
        {/* Admin  */}
        <BarMenu title="Admin" href="/dashboard/admin">
          <UserCheck size={24} />
        </BarMenu>
        {/* End Admin  */}
        {/* Books  */}
        <BarMenu title="Buku" href="/dashboard/books">
          <BookOpenText size={24} />
        </BarMenu>
        {/* Edn Books  */}
        {/* Tag  */}
        <BarMenu title="Kategori" href="/dashboard/category">
          <TagSimple size={24} />
        </BarMenu>
        {/* End tag  */}
        {/* Transaction  */}
        <li
          className={`w-full px-5 py-2 transition-all ease-in-out duration-150 flex flex-col cursor-pointer group hover:bg-purple-100 ${
            pathTransactions.some(
              (path) => pathName === path || pathName.startsWith(`${path}/`)
            )
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
              pathTransactions.some(
                (path) => pathName == path || pathName.startsWith(path + "/")
              )
                ? "h-28 visible"
                : "h-0"
            }`}
          >
            <BarMenu2 title="Peminjaman" href="/dashboard/transaction-borrow">
              <CaretCircleRight size={20} />
            </BarMenu2>
            <BarMenu2 title="Dikembalkan" href="/dashboard/transaction-return">
              <CaretCircleRight size={20} />
            </BarMenu2>
            <BarMenu2 title="Terlambat" href="/dashboard/transaction-late">
              <CaretCircleRight size={20} />
            </BarMenu2>
          </ul>
        </li>
        {/* End Transaction  */}
        {/* TRANSACTION HISTORY */}
        <li
          className={`w-full px-5 py-2 transition-all ease-in-out duration-150 flex flex-col cursor-pointer group hover:bg-purple-100 ${
            pathHistoryTransactions.some(
              (path) => pathName == path || pathName.startsWith(path + "/")
            )
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
              pathHistoryTransactions.some(
                (path) => pathName == path || pathName.startsWith(path + "/")
              )
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
              title="Peminjaman"
              href="/dashboard/history-transaction-borrow"
            >
              <CaretCircleRight size={20} />
            </BarMenu2>
            <BarMenu2
              title="Pengembalian"
              href="/dashboard/history-transaction-return"
            >
              <CaretCircleRight size={20} />
            </BarMenu2>
            <BarMenu2 title="Denda" href="/dashboard/history-transaction-fine">
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
