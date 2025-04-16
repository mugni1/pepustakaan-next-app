"use client";
import { createCategory } from "@/_actions";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
export default function FormAdd() {
  const [state, formAction] = useActionState(createCategory, null);

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
        />
        <i className="text-xs text-red-500">{state?.Error?.name}</i>
      </div>
      {/* end input title  */}
      {/* btn back and submit  */}
      <div className=" flex gap-5 items-center ">
        <BtnClick className=" bg-green-500 ">
          <span>Kirim</span>
        </BtnClick>
        <BtnHref
          href="/dashboard/category"
          className="bg-sky-500 text-background1"
        >
          Kembali
        </BtnHref>
      </div>
      {/* end btn back and submit  */}
    </form>
  );
}
