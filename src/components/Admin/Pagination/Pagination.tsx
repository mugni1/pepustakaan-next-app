"use client";
import React from "react";
import Container from "../Container";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface Props {
  keyword: string;
  url: string;
  current_page: number;
  from: number;
  to: number;
  prev_page_url: string;
  next_page_url: string;
}

export default function Pagination({
  keyword = "",
  url,
  current_page,
  from = 0,
  to = 0,
  prev_page_url,
  next_page_url,
}: Props) {
  const router = useRouter();
  return (
    <Container>
      <section className="flex gap-5 justify-between  items-center">
        <button
          className={`py-2 px-6 text-white transition-all ease-in-out active:scale-95 font-semibold rounded-md flex items-center gap-2 ${
            !prev_page_url
              ? "bg-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-accent1 to-accent2 cursor-pointer"
          }`}
          disabled={!prev_page_url}
          onClick={() =>
            router.push(`${url}?page=${current_page - 1}&keyword=${keyword}`)
          }
        >
          <ArrowCircleLeft size={28} />
          <span>Sebelumnya</span>
        </button>
        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold">Halaman ke {current_page}</span>
          <span className="font-semibold text-sm text-slate-600">
            Data {from != null ? from : 0} - {to != null ? to : 0}
          </span>
        </div>
        <button
          className={`py-2 px-6 text-white transition-all ease-in-out active:scale-95 font-semibold rounded-md flex items-center gap-2 ${
            !next_page_url
              ? "bg-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-accent1 to-accent2 cursor-pointer"
          }`}
          disabled={!next_page_url}
          onClick={() =>
            router.push(`${url}?page=${current_page + 1}&keyword=${keyword}`)
          }
        >
          <span>Selanjutnya</span>
          <ArrowCircleRight size={28} />
        </button>
      </section>
    </Container>
  );
}
