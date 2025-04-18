import BtnClick from "@/components/Admin/Button/BtnClick";
import React from "react";
import { useFormStatus } from "react-dom";
import { IoSaveSharp } from "react-icons/io5";
import { RiLoader3Fill } from "react-icons/ri";

export default function SaveBtnForm() {
  const { pending } = useFormStatus();
  return (
    <BtnClick
      disabled={pending}
      typeBtn="submit"
      className="bg-emerald-500 flex justify-center items-center"
    >
      {pending ? (
        <span className="flex items-center gap-1">
          <RiLoader3Fill className="animate-spin" size={24} /> Tunggu
        </span>
      ) : (
        <span className=" flex items-center gap-1">
          <IoSaveSharp size={20} /> Simpan
        </span>
      )}
    </BtnClick>
  );
}
