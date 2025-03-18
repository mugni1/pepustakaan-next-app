"use client";
import { Calendar, ClockCounterClockwise } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";

interface Book {
  id: number;
  image: string;
  writer: string;
  title: string;
}

interface Borrow {
  id: number;
  book: Book;
  borrow_date: string;
  return_date: string;
  status: string;
  daily_fine: number;
  actual_return_date: string;
}

export default function ListBookReturns({ data }: { data: Borrow[] }) {
  const [borrows, setBorrows] = useState<Borrow[]>(data || []);

  if (borrows.length < 1) {
    return <h1>Belum Ada Transaksi</h1>;
  }

  return (
    <section className="w-full grid grid-cols-1 xl:grid-cols-3 gap-5">
      {borrows.map((borrow: Borrow) => (
        <div
          key={borrow.id}
          className="border rounded-lg flex shadow-lg overflow-hidden border-slate-200"
        >
          {/* card image  */}
          <div className="w-4/12">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${borrow.book.image}`}
              alt=""
              className="object-cover h-full w-full object-center"
            />
          </div>
          {/* end card  */}
          {/* card body  */}
          <div className="w-8/12 flex flex-col p-2">
            <h2 className="poppins-semibold text-lg line-clamp-1">
              {borrow.book.title}
            </h2>
            <span className="text-slate-600">{borrow.book.writer}</span>
            <span className="py-1 px-2 rounded-md bg-sky-100 text-sky-600 text-xs w-fit my-2">
              Pinjaman ID : {borrow.id}
            </span>
            {/* TAnggal */}
            <div className="py-1 flex flex-col text-sm">
              <span className="flex items-center gap-1 poppins-semibold">
                <Calendar size={20} /> Dikembalikan
              </span>
              <span>{borrow.actual_return_date}</span>
            </div>
            {/* end Tanggal */}
            <span
              className={`font-semibold ${
                borrow.status === "dikembalikan"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {borrow.status}
            </span>
          </div>
          {/* end card body */}
        </div>
      ))}
    </section>
  );
}
