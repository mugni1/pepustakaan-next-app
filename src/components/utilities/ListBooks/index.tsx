"use client";
import { useState } from "react";

interface Book {
  id: number;
  image: string;
  title: string;
  writer: string;
  stock: number;
}

export default function ListBooks({ books }: { books: Book[] }) {
  const [datas, setDatas] = useState(books || []);
  return (
    <section className="w-full grid grid-cols-5 gap-5">
      {datas?.map((book: Book) => (
        <div
          key={book.id}
          className="columns-1 rounded-xl shadow-lg border border-slate-200 overflow-hidden"
        >
          {/* head  */}
          <div className="w-full h-72">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${book.image}`}
              className="object-cover h-full w-full"
              alt=""
            />
          </div>
          {/* end head  */}
          {/* body  */}
          <div className="p-3 flex flex-col">
            <span className="poppins-semibold line-clamp-1">{book.title}</span>
            <span className="text-slate-400">{book.writer}</span>
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
  );
}
