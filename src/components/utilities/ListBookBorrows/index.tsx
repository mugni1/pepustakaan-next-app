"use client";
import { ClockCounterClockwise } from "@phosphor-icons/react";
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
  const [borrows, setBorrows] = useState<Borrow[]>(data || []);
  const [isClient, setIsClient] = useState(false); //  Tambahkan state isClient

  useEffect(() => {
    setIsClient(true); //  Setelah komponen dimuat di klien, set isClient = true
  }, []);

  if (borrows.length < 1) {
    return <h1>No data results</h1>;
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
            {/* Countdown */}
            <div className="py-1 flex flex-col text-sm">
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
                      const lateDays = Math.ceil(
                        lateTime / (1000 * 60 * 60 * 24)
                      );
                      return (
                        <>
                          <div className="text-red-500">
                            Sudah lewat {lateDays > 0 && `${lateDays} hari`},
                            denda
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
