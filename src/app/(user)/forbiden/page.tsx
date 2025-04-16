import BtnHref from "@/components/Admin/Button/BtnHref";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "403 - FORBIDEN",
};
export default function Page() {
  return (
    <section className="w-full min-h-screen flex justify-center items-center font-gabarito">
      <div className="w-full flex flex-col justify-center items-center ">
        <h1 className="text-xl md:text-2xl font-bold ">Tidak dapat di akses</h1>
        <p className="mb-5 text-base text-foreground/80">
          Silahkan Login terlebih dahulu
        </p>
        <BtnHref href="/login">SIGN IN</BtnHref>
      </div>
    </section>
  );
}
