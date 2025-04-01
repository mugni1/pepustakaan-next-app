"use client";
import React from "react";
import Container from "@/components/Admin/Container";
import { useRouter } from "next/navigation";
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react";

interface Props {
  url: string;
  current_page: number;
  from: number;
  to: number;
  prev_page_url: string;
  next_page_url: string;
  q?: string;
}

export default function PaginationUser({
  url,
  current_page,
  from = 0,
  to = 0,
  prev_page_url,
  next_page_url,
  q,
}: Props) {
  const router = useRouter();
  return (
    <Container className="my-5 border border-purple-500">
      <section className="flex gap-5 justify-between  items-center">
        {/* btn prev  */}
        <button
          className={`py-2 px-3 text-white transition-all ease-in-out active:scale-95 poppins-semibold rounded-lg flex items-center gap-2 ${
            !prev_page_url
              ? "bg-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-fuchsia-600 to-purple-600 cursor-pointer"
          }`}
          disabled={!prev_page_url}
          onClick={() =>
            router.push(
              !q
                ? `${url}?page=${current_page - 1}`
                : `${url}?page=${current_page - 1}&q=${q}`
            )
          }
        >
          <ArrowCircleLeft size={28} />
          <span>Sebelumnya</span>
        </button>
        {/* end btn prev  */}
        <div className="flex flex-col justify-center items-center">
          <span className="poppins-semibold">Halaman ke {current_page}</span>
          <span className="poppins-semibold text-sm text-slate-600">
            Data {from != null ? from : 0} - {to != null ? to : 0}
          </span>
        </div>
        {/* btn next  */}
        <button
          className={`py-2 px-3 text-white transition-all ease-in-out active:scale-95 poppins-semibold rounded-lg flex items-center gap-2 ${
            !next_page_url
              ? "bg-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-fuchsia-600 to-purple-600 cursor-pointer"
          }`}
          disabled={!next_page_url}
          onClick={() =>
            router.push(
              !q
                ? `${url}?page=${current_page + 1}`
                : `${url}?page=${current_page + 1}&q=${q}`
            )
          }
        >
          <span>Selanjutnya</span>
          <ArrowCircleRight size={28} />
        </button>
        {/* end btn next  */}
      </section>
    </Container>
  );
}
