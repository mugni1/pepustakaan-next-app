import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-96 bg-slate-400 animate-pulse rounded-xl flex justify-center items-center mt-10">
      <span className="text-xl text-slate-600">Sedang Memuat</span>
    </div>
  );
}
