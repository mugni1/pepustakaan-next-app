"use client";

import BtnClick from "@/components/Admin/Button/BtnClick";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="min-h-screen flex  justify-between  items-center w-full ">
      <div className="w-fit mx-auto flex flex-col items-center justify-center gap-2">
        <h1 className="poppins-semibold text-2xl">Please try again later</h1>
        <p>{error.message}</p>
        <BtnClick
          click={() => reset()}
          className="bg-gradient-to-br from-fuchsia-500 to-purple-500"
        >
          Coba Lagi
        </BtnClick>
      </div>
    </section>
  );
}
