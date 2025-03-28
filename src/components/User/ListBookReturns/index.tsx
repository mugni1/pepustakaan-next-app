"use client";
import Image from "next/image";
import { useState } from "react";

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
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${borrow.book.image}`}
              alt=""
              className="object-cover h-full w-full object-center"
              height={150}
              width={100}
            />
          </div>
          {/* end card  */}
          {/* card body  */}
          <div className="w-8/12 flex flex-col p-2">
            <h2 className="poppins-semibold text-lg line-clamp-1">
              {borrow.book.title}
            </h2>
            <span className="text-slate-600 text-sm">{borrow.book.writer}</span>
            <span className="py-1 px-2 rounded-md bg-sky-100 text-sky-600 text-sm w-fit my-2 poppins-semibold">
              ID : {borrow.id}
            </span>
            <div className="flex flex-col text-xs">
              <span>Tgl Pengembalian : {borrow.return_date}</span>
              <span>Tgl Dikembalikan : {borrow.actual_return_date}</span>
            </div>
            <span
              className={`font-semibold py-1 px-2 text-xs my-2 ${
                borrow.status === "dikembalikan"
                  ? "text-green-600 bg-green-200  rounded-md w-fit"
                  : "text-red-600 bg-red-200 rounded-md w-fit"
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
