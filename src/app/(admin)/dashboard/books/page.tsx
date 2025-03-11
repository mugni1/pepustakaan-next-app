import BooksList from "@/components/BooksList";
import { getBooks } from "@/services";
import { Metadata } from "next";

interface Books {
  category: { id: number; name: string };
  created_at: string;
  description: string;
  id: number;
  image: string;
  publication_date: string;
  publisher: string;
  stock: number;
  title: string;
  updated_at: string;
  writer: string;
}

export const metadata: Metadata = {
  title: "Dashboard - Books",
  description: "Books page",
};

export default async function Page() {
  const books = await getBooks();
  return (
    <main className="p-5">
      <BooksList data={books.data} />
    </main>
  );
}
