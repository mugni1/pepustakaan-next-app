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
  title: "Books",
  description: "Books page",
};

export default async function Page() {
  const books = await getBooks();
  return (
    <main className="p-5">
      <section className=" w-full p-5 rounded-xl shadow-lg bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-400">
              <th className="py-2 mb-2">Gambar</th>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Penerbit</th>
              <th>Tahun Terbit</th>
              <th>Stock</th>
              <th>Aciton</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {books.data.map((book: Books, index: number) => (
              <tr className="w-full border-b border-slate-400">
                <td className="w-2/12 p-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${book.image}`}
                    alt=""
                    className="h-40 w-full object-cover object-center border shadow-md rounded-lg"
                  />
                </td>
                <td className="text-center">{book.title}</td>
                <td className="text-center">{book.writer}</td>
                <td className="text-center">{book.publisher}</td>
                <td className="text-center">{book.publication_date}</td>
                <td className="text-center">{book.stock}</td>
                <td className="text-center">. . .</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
