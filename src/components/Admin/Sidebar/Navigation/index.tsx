import React from "react";
import BarMenu from "./BarMenu";
import {
  LuArrowLeftRight,
  LuBookText,
  LuHistory,
  LuHouse,
  LuTags,
  LuUserRound,
  LuUserRoundCheck,
} from "react-icons/lu";
import { usePathname } from "next/navigation";
import BarMenu2 from "./BarMenu2";
import { CaretCircleRight } from "@phosphor-icons/react";

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
export default function Navigation() {
  const pathName = usePathname();
  return (
    <ul className="w-full overflow-hidden">
      {/* Home  */}
      <BarMenu title="Beranda" href="/dashboard/home">
        <LuHouse size={24} />
      </BarMenu>
      {/* End Home  */}
      {/* Member  */}
      <BarMenu title="Anggota" href="/dashboard/member">
        <LuUserRound size={24} />
      </BarMenu>
      {/* End Member  */}
      {/* Admin  */}
      <BarMenu title="Admin" href="/dashboard/admin">
        <LuUserRoundCheck size={24} />
      </BarMenu>
      {/* End Admin  */}
      {/* Books  */}
      <BarMenu title="Buku" href="/dashboard/books">
        <LuBookText size={24} />
      </BarMenu>
      {/* Edn Books  */}
      {/* Tag  */}
      <BarMenu title="Kategori" href="/dashboard/category">
        <LuTags size={24} />
      </BarMenu>
      {/* End tag  */}
      {/* Transaction  */}
      <li
        className={`w-full px-5 py-2 transition-all ease-in-out duration-150 flex flex-col cursor-pointer group hover:bg-accent2/10 ${
          pathTransactions.some(
            (path) => pathName === path || pathName.startsWith(`${path}/`)
          )
            ? "bg-accent2/10 "
            : "text-foreground"
        } `}
      >
        <div className="w-full flex justify-between items-center mb-2">
          <span>Transaksi Berlangsung</span>
          <LuArrowLeftRight size={24} />
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
          <BarMenu2
            title="Dikembalikan (Terlambat)"
            href="/dashboard/transaction-late"
          >
            <CaretCircleRight size={20} />
          </BarMenu2>
        </ul>
      </li>
      {/* End Transaction  */}
      {/* TRANSACTION HISTORY */}
      <li
        className={`w-full px-5 py-2 transition-all ease-in-out duration-150 flex flex-col cursor-pointer group hover:bg-accent2/10 ${
          pathHistoryTransactions.some(
            (path) => pathName == path || pathName.startsWith(path + "/")
          )
            ? "bg-accent2/10"
            : "text-foreground"
        } `}
      >
        <div className="w-full flex justify-between items-center mb-2">
          <span>Riwayat Transaksi</span>
          <LuHistory size={24} />
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
  );
}
