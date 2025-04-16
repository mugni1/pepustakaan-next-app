"use client";
import { updateCategory } from "@/_actions";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function FormEdit({ id }: { id: number }) {
  const updateCategoryWithID = updateCategory.bind(null, id);
  const [state, formAction] = useActionState(updateCategoryWithID, null);
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
    <form action={formAction} className="w-full flex flex-col gap-5">
      {/* input name  */}
      <div className="flex flex-col">
        <input
          type="text"
          className="py-1 px-2 outline-accent2 border border-foreground/60 rounded-md"
          placeholder="Nama Kategori"
          name="name"
          required
        />
        <i className="text-xs text-red-500">{state?.Error?.name}</i>
      </div>
      {/* end input name  */}

      {/* btn back and submit  */}
      <div className=" flex gap-5 items-center ">
        <BtnClick className=" bg-green-500 py-1 px-5">
          <span>Kirim</span>
        </BtnClick>
        <BtnHref className="bg-sky-500 text-white" href="/dashboard/category">
          Kembali
        </BtnHref>
      </div>
      {/* end btn back and submit  */}
    </form>
  );
}
