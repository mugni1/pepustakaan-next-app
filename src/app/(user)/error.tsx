"use client";

import BtnClick from "@/components/Admin/Button/BtnClick";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="w-full min-h-screen flex justify-center items-center font-gabarito">
      <div className="w-full flex flex-col justify-center items-center ">
        <h1 className="text-xl md:text-2xl font-semibold ">
          Terjadi kesalahan
        </h1>
        <p className="mb-5 text-foreground/70">Server Sedang sibuk</p>
        <BtnClick
          className="bg-gradient-to-r from-accent1 to-accent2 text-background1"
          click={() => reset()}
        >
          Coba lagi
        </BtnClick>
      </div>
    </section>
  );
}
