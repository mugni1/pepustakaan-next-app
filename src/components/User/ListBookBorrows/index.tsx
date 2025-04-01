"use client";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import Image from "next/image";
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
}

export default function ListBookBorrows({ data }: { data: Borrow[] }) {
  const [borrows] = useState<Borrow[]>(data || []);
  const [isClient, setIsClient] = useState(false); //  Tambahkan state isClient

  useEffect(() => {
    setIsClient(true); //  Setelah komponen dimuat di klien, set isClient = true
  }, []);

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
              width={100}
              height={150}
            />
          </div>
          {/* end card  */}
          {/* card body  */}
          <div className="w-8/12 flex flex-col p-2">
            <h2 className="poppins-semibold text-lg line-clamp-1">
              {borrow.book.title}
            </h2>
            <span className="text-slate-600 text-sm">{borrow.book.writer}</span>
            <span className="py-1 px-2 rounded-md bg-sky-100 text-sky-600 text-sm poppins-semibold w-fit my-2">
              ID : {borrow.id}
            </span>
            <span className="text-xs">
              Tgl Peminjaman : {borrow.borrow_date}
            </span>
            <span className="text-xs">
              Tgl Pengembalian : {borrow.return_date}
            </span>
            {/* Countdown */}
            <div className="py-2 flex flex-col text-sm">
              <span className="flex items-center gap-1 poppins-semibold">
                <ClockCounterClockwise size={20} /> Pengembalian
              </span>
              {isClient && ( // tampilkan saat isClients == true
                <Countdown
                  date={new Date(borrow.return_date).getTime()}
                  daysInHours={true}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      const returnDate = new Date(borrow.return_date).getTime();
                      const currentDate = new Date().getTime();
                      const lateTime = currentDate - returnDate;
                      const lateDays = Math.floor(
                        lateTime / (1000 * 60 * 60 * 24)
                      );
                      return (
                        <>
                          <div className="text-red-500">
                            {lateDays > 0
                              ? `Sudah lewat ${lateDays} hari, denda`
                              : "Segera kembalikan, denda"}
                          </div>
                          <div className="text-red-500 poppins-semibold">
                            Rp{" "}
                            {(lateDays * borrow.daily_fine).toLocaleString(
                              "id-ID"
                            )}
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <span className="text-green-500">
                          {days}H - {hours} Jam : {minutes} Menit : {seconds}{" "}
                          detik
                        </span>
                      );
                    }
                  }}
                />
              )}
            </div>
            {/* end Countdown */}
          </div>
          {/* end card body */}
        </div>
      ))}
    </section>
  );
}
