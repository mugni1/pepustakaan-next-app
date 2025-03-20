"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import SubTitle from "../SubTitle";

interface Book {
  id: number;
  image: string;
  title: string;
  writer: string;
  stock: number;
}

export default function ListBooks({ books }: { books: Book[] }) {
  const [datas, setDatas] = useState(books || []);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    keyword.length > 0
      ? setDatas(
          books.filter((book) =>
            book.title.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setDatas(books);
  }, [keyword]);
  return (
    <>
      {/* search and add button  */}
      <section className="w-full flex items-center justify-between mb-5">
        <div className="relative h-fit w-auto group text-slate-600">
          <span className="absolute h-full flex items-center px-2">
            <MagnifyingGlass size={20} />
          </span>
          <input
            type="text"
            className="px-2 py-1 border border-slate-400 rounded-md bg-white outline-purple-500 ps-9 shadow-md"
            placeholder="Cari Buku"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </section>
      {/* end search  and add button */}

      <SubTitle>Terbaru</SubTitle>
      <section className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5 mt-2">
        {datas?.map((book: Book, index) => (
          <div
            key={book.id + index}
            className="columns-1 rounded-xl shadow-lg border border-slate-200 overflow-hidden"
          >
            {/* head  */}
            <div className="w-full h-52 md:h-60 xl:h-72">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${book.image}`}
                className="object-cover h-full w-full"
                alt=""
              />
            </div>
            {/* end head  */}
            {/* body  */}
            <div className="p-3 flex flex-col">
              <span className="poppins-semibold line-clamp-1">
                {book.title}
              </span>
              <span className="text-slate-400 mb-1">{book.writer}</span>
              <span
                className={` ${
                  book.stock > 0
                    ? "bg-green-200 text-green-600"
                    : "bg-red-200 text-red-600"
                } py-1 px-3 rounded-md w-fit flex items-center poppins-semibold`}
              >
                Stock : {book.stock}
              </span>
            </div>

            {/* end body */}
          </div>
        ))}
      </section>
    </>
  );
}
