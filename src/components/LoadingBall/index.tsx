import React from "react";

export default function LoadingBall() {
  return (
    <div className="w-full flex min-h-screen justify-center items-center transition-all ease-in-out duration-300">
      <div className="mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-center gap-5">
          <div className="h-4 w-4 bg-slate-600 rounded-full animate-bounce-custom1"></div>
          <div className="h-4 w-4 bg-slate-600 rounded-full animate-bounce-custom2"></div>
          <div className="h-4 w-4 bg-slate-600 rounded-full animate-bounce-custom3"></div>
        </div>
        <span className="poppins-semibold">Memuat halaman</span>
      </div>
    </div>
  );
}
