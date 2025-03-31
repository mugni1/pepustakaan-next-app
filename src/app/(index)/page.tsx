import UserContainer from "@/components/User/Container/UserContainer";
import ListBooks from "@/components/User/ListBooks";
import PaginationUser from "@/components/User/Pagination/Pagination";
import { getBooks } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perpus - Home",
  description:
    "Perpus adalah aplikasi perpustakaan online yang dibuat oleh Asep Abdul Mugni. Aplikasi ini berfungsi sebagai pengelolaan buku perpustakaan, peminjaman buku, dan pengembalian buku. Aplikasi ini dibuat dengan menggunakan teknologi Next.js dan Tailwind CSS.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string; q: string }>;
}) {
  const { page } = await searchParams;
  const { q } = await searchParams;
  const result = await getBooks(page, q);

  return (
    <UserContainer>
      <ListBooks books={result.data} />
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
    </UserContainer>
  );
}
