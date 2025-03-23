import UserContainer from "@/components/User/Container/UserContainer";
import ListBooks from "@/components/User/ListBooks";
import { getBooks } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perpus - Home",
  description:
    "Perpus adalah aplikasi perpustakaan online yang dibuat oleh Asep Abdul Mugni. Aplikasi ini berfungsi sebagai pengelolaan buku perpustakaan, peminjaman buku, dan pengembalian buku. Aplikasi ini dibuat dengan menggunakan teknologi Next.js dan Tailwind CSS.",
};

export default async function Home() {
  // await new Promise((res) => setTimeout(res, 10000));
  const { data } = await getBooks();

  return (
    <UserContainer>
      <ListBooks books={data} />
    </UserContainer>
  );
}
