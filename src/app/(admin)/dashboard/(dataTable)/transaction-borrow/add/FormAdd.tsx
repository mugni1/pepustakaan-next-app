"use client";

import { useActionState, useEffect } from "react";
import React from "react";
import { toast } from "react-toastify";
import { createBorrow } from "@/_actions";
import { useRouter } from "next/navigation";
import SaveAndBackBtn from "@/app/(admin)/_components/SaveAndBackBtn";

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
  const [state, formAction] = useActionState(createBorrow, null);

  useEffect(() => {
    if (state?.status == "warning") {
      toast.warning(state.message);
    }
    if (state?.status == "success") {
      toast.success(state.message);
    }
    if (state?.status == "failed") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      {/* input  */}
      <section className="w-full grid grid-cols-2 gap-5 mb-5">
        {/* select members  */}
        <div className="w-full flex flex-col">
          <select
            className="py-1 px-2 outline-accent2 border border-foreground/70 rounded-md text-foreground/70"
            name="memberID"
          >
            <option value="">- Pilih Anggota -</option>
            {members.map((member: Member, index: number) => (
              <option key={index + member.id} value={member.id}>
                {member.username}
              </option>
            ))}
          </select>
          <i className="text-xs text-red-500 mt-1">{state?.Error?.memberID}</i>
        </div>
        {/* end select mebers  */}
        {/* select book  */}
        <div className="w-full flex flex-col">
          <select
            className="py-1 px-2 outline-accent2 border border-foreground/70 rounded-md text-foreground/70"
            name="bookID"
          >
            <option value="">- Pilih Buku -</option>
            {books.map((book: Book, index) => (
              <option key={index} value={book.id}>
                {book.title} ({book.stock})
              </option>
            ))}
          </select>
          <i className="text-xs text-red-500 mt-1">{state?.Error?.bookID}</i>
        </div>
        {/* end select book  */}
        <div className="w-full flex flex-col">
          <label htmlFor="returnDate">Taggal di kembalikan</label>
          <input
            className="py-1 px-2 outline-accent2 border border-foreground/70 rounded-md text-foreground/70"
            type="date"
            id="returnDate"
            name="returnDate"
          />
          <i className="text-xs text-red-500 mt-1">
            {state?.Error?.returnDate}
          </i>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="dailyFine">Denda telat / hari</label>
          <input
            className="py-1 px-2 outline-accent2 border border-foreground/70 rounded-md text-foreground/70"
            type="number"
            placeholder="30000"
            id="dailyFine"
            name="dailyFine"
          />
          <i className="text-xs text-red-500 mt-1">{state?.Error?.dailyFine}</i>
        </div>
      </section>
      {/* end input  */}
      {/* btn  */}
      <SaveAndBackBtn backLink="transaction-borrow" />
      {/* end btn  */}
    </form>
  );
}
