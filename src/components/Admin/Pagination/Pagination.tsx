"use client";
import React from "react";
import Container from "../Container";
import Link from "next/link";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface Props {
  url: string;
  current_page: number;
  from: number;
  to: number;
  prev_page_url: string;
  next_page_url: string;
}

export default function Pagination({
  url,
  current_page,
  from = 0,
  to = 0,
  prev_page_url,
  next_page_url,
}: Props) {
  const router = useRouter();
  return (
    <section className="px-5 mb-5">
      <Container>
        <section className="flex gap-5 justify-between  items-center">
          <button
            className={`py-2 px-6 text-white transition-all ease-in-out active:scale-95 poppins-semibold rounded-lg flex items-center gap-2 ${
              !prev_page_url
                ? "bg-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-fuchsia-600 to-purple-600 cursor-pointer"
            }`}
            disabled={!prev_page_url}
            onClick={() => router.push(`${url}?page=${current_page - 1}`)}
          >
            <ArrowCircleLeft size={28} />
            <span>Sebelumnya</span>
          </button>
          <div className="flex flex-col justify-center items-center">
            <span className="poppins-semibold">Halaman ke {current_page}</span>
            <span className="poppins-semibold text-sm text-slate-600">
              Data {from != null ? from : 0} - {to != null ? to : 0}
            </span>
          </div>
          <button
            aria-disabled
            className={`py-2 px-6 text-white transition-all ease-in-out active:scale-95 poppins-semibold rounded-lg flex items-center gap-2 ${
              !next_page_url
                ? "bg-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-fuchsia-600 to-purple-600 cursor-pointer"
            }`}
            disabled={!next_page_url}
            onClick={() => router.push(`${url}?page=${current_page + 1}`)}
          >
            <span>Selanjutnya</span>
            <ArrowCircleRight size={28} />
          </button>
        </section>
      </Container>
    </section>
  );
}
