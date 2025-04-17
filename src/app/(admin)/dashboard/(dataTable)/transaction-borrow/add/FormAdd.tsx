"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import { useActionState, useEffect } from "react";
import React from "react";
import { toast } from "react-toastify";
import { createBorrow } from "@/_actions";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
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
      <section className="w-full flex gap-5 items-stretch">
        <BtnClick typeBtn="submit" className="bg-green-500">
          Submit
        </BtnClick>
        <BtnClick click={() => router.back()} className="bg-sky-500 text-white">
          Back
        </BtnClick>
      </section>
      {/* end btn  */}
    </form>
  );
}
