import React from "react";
import Container from "@/components/Admin/Container";
import Link from "next/link";

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
  return (
    <Container className="my-5 border border-purple-500">
      <section className="flex gap-5 justify-between  items-center">
        <Link
          scroll={false}
          className={`py-2 px-6 bg-purple-500 text-white poppins-semibold rounded-lg ${
            !prev_page_url && "invisible"
          }`}
          href={
            !q
              ? `${url}?page=${current_page - 1}`
              : `${url}?page=${current_page - 1}&q=${q}`
          }
        >
          Prev
        </Link>
        <div className="flex flex-col justify-center items-center">
          <span className="poppins-semibold">Halaman ke {current_page}</span>
          <span className="poppins-semibold text-sm text-slate-600">
            Data {from != null ? from : 0} - {to != null ? to : 0}
          </span>
        </div>
        <Link
          scroll={false}
          className={`py-2 px-6 bg-purple-500 text-white poppins-semibold rounded-lg ${
            !next_page_url && "invisible"
          }`}
          href={
            !q
              ? `${url}?page=${current_page + 1}`
              : `${url}?page=${current_page + 1}&q=${q}`
          }
        >
          Next
        </Link>
      </section>
    </Container>
  );
}
