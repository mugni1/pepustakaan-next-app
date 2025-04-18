"use client";
import { deleteBorrow, returnBook } from "@/_actions";
import BtnClick from "@/components/Admin/Button/BtnClick";
import { redirect } from "next/navigation";
import React from "react";
import { LuArrowLeftToLine, LuTrash } from "react-icons/lu";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function DeleteAndReturnBtn({ id }: { id: number }) {
  async function handleReturnBook() {
    const res = await returnBook(id);
    if (res.status == "failed") {
      toast.error(res.message);
    }
    if (res.status == "success") {
      toast.success(res.message);
      redirect("/dashboard/transaction-borrow/");
    }
  }
  async function handleDeleteBorrow() {
    const res = await deleteBorrow(id);
    if (res.status == "failed") {
      toast.error(res.message);
    }
    if (res.status == "success") {
      toast.success(res.message);
      redirect("/dashboard/transaction-borrow/");
    }
  }
  function handleReturn() {
    swal({
      icon: "warning",
      title: "Peringatan!",
      text: "Apakah yakin ingin mengembalikan buku ini?",
      dangerMode: true,
      buttons: ["Tidak", "Ya"],
    }).then((isTrue) => {
      if (isTrue) {
        handleReturnBook();
      }
    });
  }
  function handleDelete() {
    swal({
      icon: "warning",
      title: "Peringatan!",
      text: "Apakah yakin ingin menghapus pinjaman ini?",
      dangerMode: true,
      buttons: ["Tidak", "Ya"],
    }).then((isTrue) => {
      if (isTrue) {
        handleDeleteBorrow();
      }
    });
  }
  return (
    <div className="flex gap-3">
      <BtnClick
        click={() => handleDelete()}
        className="font-bold text-background1 bg-red-500 px-5 rounded-md shadow-md cursor-pointer flex items-center gap-1"
      >
        <LuTrash size={20} />
        Hapus
      </BtnClick>
      <BtnClick
        click={() => handleReturn()}
        className="font-bold text-background1 bg-emerald-500 px-5 rounded-md shadow-md cursor-pointer flex items-center gap-1"
      >
        <LuArrowLeftToLine size={20} /> Kembalikan
      </BtnClick>
    </div>
  );
}
