"use client";
import { CashRegister, Coin } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { FaCoins, FaRegCalendarCheck } from "react-icons/fa";

interface Book {
  id: number;
  image: string;
  writer: string;
  title: string;
}

interface Borrow {
  id: number;
  books: Book;
  borrow_date: string;
  return_date: string;
  status: string;
  daily_fine: number;
  actual_return_date: string;
}

function getFine(
  return_date: string,
  actual_return_date: string,
  daily_fine: number
) {
  const actualDate = new Date(actual_return_date).getTime();
  const returnDate = new Date(return_date).getTime();
  const satuHari = 1000 * 60 * 60 * 24;
  const delay = Math.ceil((actualDate - returnDate) / satuHari);
  const totalFine = daily_fine * delay;
  if (delay > 0) {
    return (
      <span className="text-red-500 font-semibold">
        Rp{totalFine.toLocaleString("id-ID")}
      </span>
    );
  } else {
    return (
      <span className="text-emerald-500 font-semibold">Tidak ada denda</span>
    );
  }
}
function getDelay(return_date: string, actual_return_date: string) {
  const delay =
    new Date(actual_return_date).getTime() - new Date(return_date).getTime();
  const satuHari = 1000 * 60 * 60 * 24;
  const totalDelay = delay / satuHari;
  return totalDelay;
}

export default function ListBookReturns({ data }: { data: Borrow[] }) {
  const [borrows] = useState<Borrow[]>(data || []);

  if (borrows.length < 1) {
    return <h1>Belum Ada Transaksi</h1>;
  }

  return (
    <section className="w-full grid grid-cols-1 xl:grid-cols-3 gap-5">
      {borrows.map((borrow: Borrow, index: number) => (
        <div
          key={`${index}${borrow.status}`}
          className="border rounded-lg flex shadow-lg overflow-hidden border-slate-200"
        >
          {/* card image  */}
          <div className="w-4/12">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${borrow.books.image}`}
              alt=""
              className="object-cover h-full w-full object-center"
              height={150}
              width={100}
            />
          </div>
          {/* end card  */}
          {/* card body  */}
          <div className="w-8/12 flex flex-col p-2">
            {/* title  */}
            <h2 className="font-semibold text-lg line-clamp-1">
              {borrow.books.title}
            </h2>
            {/* waiter  */}
            <span className="text-slate-600 text-sm">
              {borrow.books.writer}
            </span>
            {/* id  */}
            <span className="px-2 rounded-md bg-gradient-to-br from-accent1 to-accent2 text-base text-background1 w-fit my-2 font-extrabold">
              ID : {borrow.id}
            </span>
            {/* status  */}
            <div className="flex flex-col text-sm mb-2 font-semibold gap-1">
              <span className="flex items-center gap-1 font-semibold">
                <FaRegCalendarCheck size={20} /> Tgl Dikembalikan
              </span>
              <span
                className={`px-2 text-xs py-1 gap-1 flex items-center ${
                  borrow.status === "dikembalikan"
                    ? "text-green-600 bg-green-200 rounded w-fit"
                    : "text-red-600 bg-red-200 rounded w-fit"
                }`}
              >
                <span>{borrow.actual_return_date}</span>
                {borrow.status == "terlambat" && (
                  <span>
                    : {getDelay(borrow.return_date, borrow.actual_return_date)}{" "}
                    hari
                  </span>
                )}
              </span>
            </div>
            {/* total fine */}
            <div className="flex flex-col">
              <span className="flex items-center gap-1 font-semibold">
                <FaCoins size={18} />
                Denda
              </span>
              <span className="text-sm">
                {getFine(
                  borrow.return_date,
                  borrow.actual_return_date,
                  borrow.daily_fine
                )}
              </span>
            </div>
          </div>
          {/* end card body */}
        </div>
      ))}
    </section>
  );
}
