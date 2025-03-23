import BooksList from "@/components/Admin/BooksList";
import { getBooks } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Books",
  description: "Books page",
};

export default async function Page() {
  const books = await getBooks();
  return <BooksList data={books.data} />;
}
