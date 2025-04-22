"use client";
import { CalendarDots, ClockCountdown } from "@phosphor-icons/react";
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
  books: Book;
  borrow_date: string;
  return_date: string;
  status: string;
  daily_fine: number;
}

function getLateDay(return_date: string) {
  const returnDate = new Date(return_date).getTime();
  const currentDate = new Date().getTime();
  const lateTime = currentDate - returnDate;
  const lateDays = Math.floor(lateTime / (1000 * 60 * 60 * 24));
  return lateDays;
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
    <section className="w-full grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
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
              width={100}
              height={150}
            />
          </div>
          {/* end card  */}
          {/* card body  */}
          <div className="w-8/12 flex flex-col p-2">
            {/* title  */}
            <h2 className="font-bold text-lg line-clamp-1">
              {borrow.books.title}
            </h2>
            {/* end title  */}
            {/* writer  */}
            <span className="text-slate-600 text-sm">
              {borrow.books.writer}
            </span>
            {/* end writer  */}
            {/* id  */}
            <span className="px-2 rounded-md bg-gradient-to-br from-accent1 to-accent2 text-base text-background1 w-fit my-2 font-extrabold">
              ID : {borrow.id}
            </span>
            {/* status  */}
            {/* date  */}
            <div className="flex flex-col">
              <span className="flex items-center gap-1 font-semibold text-xs md:text-sm">
                <CalendarDots size={20} />
                <span>Pinjam & Pengembalian</span>
              </span>
              <div className="flex gap-1 items-center text-xs md:text-sm">
                <span className="text-amber-500">{borrow.borrow_date}</span>
                <span>&gt;</span>
                <span className="text-emerald-500">{borrow.return_date}</span>
              </div>
            </div>
            {/* Countdown */}
            <div className="py-2 flex flex-col text-xs md:text-sm">
              <div className="flex items-center gap-1 font-semibold">
                <ClockCountdown size={20} />
                <span>Batas Waktu</span>
              </div>
              {isClient ? ( // tampilkan saat isClients == true
                <Countdown
                  date={new Date(borrow.return_date).getTime()} // tujuan
                  daysInHours={true}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      const lateDays = getLateDay(borrow.return_date);
                      return (
                        <div className="flex flex-col">
                          <span className="text-red-500 font-bold">
                            {lateDays > 0
                              ? `Sudah lewat ${lateDays} hari, denda`
                              : "Segera kembalikan, denda"}
                          </span>
                          <span className="text-red-500 font-bold">
                            Rp
                            {(lateDays * borrow.daily_fine).toLocaleString(
                              "id-ID"
                            )}
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <span className="text-green-500 font-bold">
                          {days} Hari, {hours} Jam : {minutes} Mnt : {seconds}{" "}
                          detik
                        </span>
                      );
                    }
                  }}
                />
              ) : (
                <span className="font-semibold text-accent2">
                  Memuat waktu..
                </span>
              )}
            </div>
          </div>
          {/* end card body */}
        </div>
      ))}
    </section>
  );
}
