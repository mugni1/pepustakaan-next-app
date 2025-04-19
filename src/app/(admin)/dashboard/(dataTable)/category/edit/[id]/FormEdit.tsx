"use client";
import { updateCategory } from "@/_actions";
import SaveAndBackBtn from "@/app/(admin)/_components/SaveAndBackBtn";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function FormEdit({ id, name }: { id: number; name: string }) {
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
          defaultValue={name}
          required
        />
        <i className="text-xs text-red-500">{state?.Error?.name}</i>
      </div>
      {/* end input name  */}

      {/* btn back and submit  */}
      <SaveAndBackBtn backLink="category" />
      {/* end btn back and submit  */}
    </form>
  );
}
