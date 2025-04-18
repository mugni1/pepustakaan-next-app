"use client";
import { returnBook } from "@/_actions";
import React from "react";
import swal from "sweetalert";

export default function DeleteAndReturnBtn({ id }: { id: number }) {
  async function handleReturnBook() {
    const res = await returnBook(id);
  }
  function handleReturn() {
    swal({
      icon: "warning",
      title: "Peringatan!",
      text: "Apakah yakin mengembalikan buku ini?",
      dangerMode: true,
      buttons: ["Tidak", "Ya"],
    }).then((isTrue) => {
      if (isTrue) {
        handleReturnBook();
      }
    });
  }
  return (
    <div className="flex gap-3">
      <button className="font-bold text-background1 bg-red-500 px-5 rounded-md shadow-md cursor-pointer">
        Hapus Pinjaman
      </button>
      <button
        onClick={() => handleReturn()}
        className="font-bold text-background1 bg-emerald-500 px-5 rounded-md shadow-md cursor-pointer"
      >
        Kembalikan Buku
      </button>
    </div>
  );
}
