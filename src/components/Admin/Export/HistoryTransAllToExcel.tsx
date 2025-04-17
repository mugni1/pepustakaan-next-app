"use client";
import { exportToExcel } from "@/_lib/xlsx";
import React from "react";
import { FaFileExcel } from "react-icons/fa";

interface Book {
  title: string;
}
interface User {
  username: string;
}
interface Transaction {
  id: number;
  actual_return_date: string;
  books: Book;
  users: User;
}
interface DataTransaction {
  id: number;
  amount: number;
  borrowings: Transaction;
  transaction_type: string;
}

export default function HistoryTransAllToExcel({
  data,
  title,
}: {
  data: DataTransaction[];
  title: string;
}) {
  const exportData = data.map((item: DataTransaction) => ({
    "ID Transaksi": item.borrowings?.id,
    Peminjam: item.borrowings?.users?.username || "UserDeleted",
    "Judul Buku": item.borrowings?.books?.title || "BookDeleted",
    Status: item.transaction_type,
    Denda: "Rp " + item.amount,
  }));
  return (
    <button
      className="p-3 rounded-md bg-emerald-500 text-white cursor-pointer"
      onClick={() => exportToExcel(exportData, `${title}.xlsx`)}
    >
      <FaFileExcel size={20} />
    </button>
  );
}
