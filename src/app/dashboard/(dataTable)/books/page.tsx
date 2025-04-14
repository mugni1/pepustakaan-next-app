import BooksList from "@/components/Admin/ListBook";
import MainContainer from "@/components/Admin/MainContainer";
import Pagination from "@/components/Admin/Pagination/Pagination";
import SearchAddBtn from "@/components/Admin/SearchAddBtn";
import { getBooks } from "@/services";
import { Metadata } from "next";
import { FaBookMedical } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Dashboard - Books",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  const { page, keyword } = await searchParams;
  const result = await getBooks(page, keyword);
  return (
    <MainContainer>
      <SearchAddBtn addLink="books/add/">
        <FaBookMedical /> Tambah
      </SearchAddBtn>
      <BooksList data={result.data} />
      <Pagination
        keyword={keyword}
        url="/dashboard/books"
        current_page={result.meta.current_page}
        to={result.meta.to}
        from={result.meta.from}
        next_page_url={result.links.next}
        prev_page_url={result.links.prev}
      />
    </MainContainer>
  );
}
