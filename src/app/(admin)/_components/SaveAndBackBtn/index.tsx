import React from "react";
import SaveBtnForm from "./SaveBtnForm";
import BtnHref from "@/components/Admin/Button/BtnHref";
import { FaArrowLeft } from "react-icons/fa";

export default function SaveAndBackBtn({ backLink }: { backLink: string }) {
  return (
    <section className="w-full flex gap-5 items-stretch">
      <SaveBtnForm />
      <BtnHref
        href={`/dashboard/${backLink}`}
        className="bg-sky-500 text-white"
      >
        <FaArrowLeft size={20} /> Back
      </BtnHref>
    </section>
  );
}
