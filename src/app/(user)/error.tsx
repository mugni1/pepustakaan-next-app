"use client";

import BtnClick from "@/components/Admin/Button/BtnClick";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-full flex flex-col justify-center items-center ">
        <span className="text-2xl text-red-600 font-bold">500</span>
        <h1 className="text-xl md:text-2xl font-semibold">Terjadi kesalahan</h1>
        <p className="mb-5">Server Sedang sibuk</p>
        <BtnClick
          className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white"
          click={() => reset()}
        >
          Coba lagi
        </BtnClick>
      </div>
    </div>
  );
}
