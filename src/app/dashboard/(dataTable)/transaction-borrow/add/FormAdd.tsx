"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import { useEffect } from "react";
import React from "react";
import { toast } from "react-toastify";
import { createBorrow } from "@/_actions";

interface Member {
  id: number;
  username: string;
}

interface Book {
  id: number;
  title: string;
  stock: number;
}

export default function FormAdd({
  books,
  members,
}: {
  books: Book[];
  members: Member[];
}) {
  useEffect(() => {
    toast.info("Omagaaaaaaaa");
  }, []);
  return (
    <form action={createBorrow}>
      {/* input  */}
      <section className="w-full grid grid-cols-2 gap-5 mb-5">
        {/* select members  */}
        <select
          required
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md text-slate-600"
          name="memberID"
        >
          <option value="" disabled>
            - Pilih Anggota -
          </option>
          {members.map((member: Member, index: number) => (
            <option key={index + member.id} value={member.id}>
              {member.username}
            </option>
          ))}
        </select>
        {/* end select mebers  */}
        {/* select book  */}
        <select
          required
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md text-slate-600"
          name="bookID"
        >
          <option value="">- Pilih Buku -</option>
          {books.map((book: Book, index) => (
            <option key={index} value={book.id}>
              {book.title} ({book.stock})
            </option>
          ))}
        </select>
        {/* end select book  */}
        <div className="w-full flex flex-col">
          <label htmlFor="returnDate">Taggal di kembalikan</label>
          <input
            required
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md text-slate-600"
            type="date"
            id="returnDate"
            name="returnDate"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="dailyFine">Denda telat / hari</label>
          <input
            required
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md text-slate-600"
            type="number"
            placeholder="30000"
            id="dailyFine"
            name="dailyFine"
          />
        </div>
      </section>
      {/* end input  */}
      {/* btn  */}
      <section className="w-full flex gap-5 items-stretch">
        <BtnClick typeBtn="submit" className="bg-green-500">
          Submit
        </BtnClick>
        <BtnHref
          href="/dashboard/transaction-borrow"
          className="bg-sky-500 text-white"
        >
          Back
        </BtnHref>
      </section>
      {/* end btn  */}
    </form>
  );
}
