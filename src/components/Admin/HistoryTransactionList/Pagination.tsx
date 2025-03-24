import React from "react";
import Container from "../Container";
import Link from "next/link";

interface Props {
  url: string;
  current_page: number;
  prev_page_url: string;
  next_page_url: string;
}

export default function Pagination({
  url,
  current_page,
  prev_page_url,
  next_page_url,
}: Props) {
  return (
    <section className="px-5 mb-5">
      <Container>
        <section className="flex gap-5 justify-between  items-center">
          <Link
            scroll={false}
            className={`py-2 px-6 bg-purple-500 text-white poppins-semibold rounded-lg ${
              !prev_page_url && "invisible"
            }`}
            href={`${url}?page=${current_page - 1}`}
          >
            Prev
          </Link>
          <div>
            <span> Page {current_page}</span>
          </div>
          <Link
            scroll={false}
            className={`py-2 px-6 bg-purple-500 text-white poppins-semibold rounded-lg ${
              !next_page_url && "invisible"
            }`}
            href={`${url}?page=${current_page + 1}`}
          >
            Next
          </Link>
        </section>
      </Container>
    </section>
  );
}
