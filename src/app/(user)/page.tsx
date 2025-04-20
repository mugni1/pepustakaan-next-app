import { getBooks } from "@/services";
import { Metadata } from "next";
import MainContainer from "./_components/MainContainer";
import SearchBookForm from "./_components/SearchBookForm";
import SubTitle from "./_components/SubTitle";
import ListBooks from "./_components/ListBooks";
import NoResult from "./_components/ListBooks/NoResult";
import PaginationUser from "./_components/Pagination/Pagination";

interface Props {
  searchParams: Promise<{ page: string; q: string }>;
}

export const metadata: Metadata = {
  title: "HOME",
  description:
    "Perpus adalah aplikasi perpustakaan online yang dibuat oleh Asep Abdul Mugni. Aplikasi ini berfungsi sebagai pengelolaan buku perpustakaan, peminjaman buku, dan pengembalian buku. Aplikasi ini dibuat dengan menggunakan teknologi Next.js dan Tailwind CSS.",
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { q } = await searchParams;
  const result = await getBooks(page, q);

  return (
    <MainContainer>
      <SearchBookForm />

      {/* TITLE  */}
      <SubTitle>Daftar Buku</SubTitle>
      {/* END TITLE  */}

      {/* LIST BOOK */}
      {result.data.length > 0 ? (
        <ListBooks books={result.data} />
      ) : (
        <NoResult q={q} />
      )}
      {/* END LIST BOOK  */}

      {/* PAGINATION  */}
      {result.meta.to >= 10 && (
        <div className="mb-20">
          <PaginationUser
            url="/"
            current_page={result.meta.current_page}
            to={result.meta.to}
            from={result.meta.from}
            next_page_url={result.links.next}
            prev_page_url={result.links.prev}
            q={q}
          />
        </div>
      )}
      {/* END PAGINATION  */}
    </MainContainer>
  );
}
