"use client";
import { useEffect, useState } from "react";
import TableHead from "./TableHead";
import Link from "next/link";
import { DotsThreeOutline, MagnifyingGlass } from "@phosphor-icons/react";
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

export default function BooksList({ data }: { data: Books[] }) {
  const [books, setBooks] = useState<Books[]>(data);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    keyword.length > 0
      ? setBooks(
          data.filter((book) =>
            book.title.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setBooks(data);
  }, [keyword]);
  return (
    <>
      {/* main content  */}
      <section className="w-full flex items-center justify-between mb-5">
        <Link
          href={"books/add"}
          className="bg-gradient-to-r from-fuchsia-500 to-purple-700 text-white py-2 px-5 rounded font-bold shadow-md"
        >
          Tambah Buku
        </Link>
        <div className="relative h-fit w-auto group text-slate-600">
       <span className="absolute h-full flex items-center px-2"><MagnifyingGlass size={24} /></span>
        <input
          type="text"
          className="p-2 border border-slate-400 rounded-md bg-white outline-purple-500 ps-10"
          placeholder="Cari Buku"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
       </div>
      </section>
      <section className=" w-full p-5 rounded-xl shadow-lg bg-white">
        <table className="w-full">
          <TableHead />
          <tbody className="w-full">
            {books.map((book: Books, index: number) => (
              <tr key={index} className="w-full border-b border-slate-400">
                <td className="w-2/12 p-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${book.image}`}
                    alt=""
                    className="h-40 w-8/12 mx-auto object-cover object-center border border-slate-400 shadow-md rounded-lg"
                  />
                </td>
                <td className="text-center w-3/12 font-semibold">
                  {book.title}
                </td>
                <td className="text-center">{book.writer}</td>
                <td className="text-center">{book.publisher}</td>
                <td className="text-center">
                  <span className="py-1 px-5 bg-purple-600 text-white font-semibold rounded-md">
                    {book.publication_date}
                  </span>
                </td>
                <td className="text-center w-1/12">
                  <span className="py-1 px-2 bg-sky-600 text-white font-semibold rounded-md">
                    {book.stock}
                  </span>
                </td>
                <td className="text-center relative w-1/12 group">
                  <span className="cursor-pointer text-slate-600 w-full flex justify-center ">
                    <DotsThreeOutline size={24} />
                  </span>
                  <div className="absolute flex flex-col bottom-5 -right-8 -left-8 py-5 border border-slate-400 bg-white rounded-md invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 gap-1">
                    <Link href={`books/detail/${book.id}`}>Lihat</Link>
                    <Link href={`books/update/${book.id}`}>Lihat</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* end man content  */}
    </>
  );
}
