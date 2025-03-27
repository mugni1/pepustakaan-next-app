import BooksList from "@/components/Admin/BooksList";
import Pagination from "@/components/Admin/Pagination/Pagination";
import { getBooks } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Books",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const result = await getBooks(page);
  return (
    <>
      <BooksList data={result.data} />
      <Pagination
        url="/dashboard/books"
        current_page={result.meta.current_page}
        to={result.meta.to}
        from={result.meta.from}
        next_page_url={result.links.next}
        prev_page_url={result.links.prev}
      />
    </>
  );
}
