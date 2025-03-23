import UserContainer from "@/components/utilities/Container/UserContainer";
import ListBooks from "@/components/utilities/ListBooks";
import { getBooks } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perpus - Home",
  description:
    "Perpus adalah aplikasi perpustakaan online yang dibuat oleh Asep Abdul Mugni. Aplikasi ini berfungsi sebagai pengelolaan buku perpustakaan, peminjaman buku, dan pengembalian buku. Aplikasi ini dibuat dengan menggunakan teknologi Next.js dan Tailwind CSS.",
};

export default async function Home() {
  await new Promise((res) => setTimeout(res, 2000));
  const { data } = await getBooks();

  return (
    <UserContainer>
      <ListBooks books={data} />
    </UserContainer>
  );
}
