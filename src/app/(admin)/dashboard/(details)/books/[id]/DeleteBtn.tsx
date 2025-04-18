"use client";
import { deleteBook } from "@/_actions/BookDelete";
import BtnClick from "@/components/Admin/Button/BtnClick";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { toast } from "react-toastify";
import swal from "sweetalert";

export default function BackAndDeleteBtn({ id }: { id: number }) {
  const router = useRouter();

  async function handleDeleteBook() {
    const res = await deleteBook(id);
    if (res.status == "failed") {
      toast.error(res.message);
    }
    if (res.status == "success") {
      toast.success(res.message);
      redirect("/dashboard/books");
    }
  }

  function handleDelete() {
    swal({
      icon: "warning",
      dangerMode: true,
      buttons: ["Tidak", "Ya"],
      title: "Peringatan!",
      text: "Apakah anda yakin ingin menghapus buku ini?",
    }).then((isTrue) => {
      if (isTrue) {
        handleDeleteBook();
      }
    });
  }
  return (
    <section className="flex justify-between items-center">
      <BtnClick
        click={() => router.back()}
        className="w-fit bg-gradient-to-br from-accent1 to-accent2 text-white mb-5"
      >
        Kembali
      </BtnClick>
      <BtnClick
        click={() => handleDelete()}
        className="w-fit bg-red-500 text-white mb-5 flex gap-1 items-center"
      >
        <LuTrash2 size={20} />
        Hapus
      </BtnClick>
    </section>
  );
}
