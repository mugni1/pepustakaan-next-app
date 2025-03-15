"use client";
import { useEffect, useState } from "react";
import TableHead from "./TableHead";
import { Eye, MagnifyingGlass, Pencil, Trash } from "@phosphor-icons/react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import axios from "axios";
import BtnHref from "../Admin/Button/BtnHref";
import Container from "../Admin/Container";
import MainContainer from "../Admin/MainContainer";

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
  const router = useRouter();

  const handleDelete = (id: number) => {
    swal({
      icon: "warning",
      dangerMode: true,
      title: "Warning",
      text: "Apakah kamu yakin ingin menghapus?",
      buttons: ["Batal", "Ya"],
    }).then((isTrue) => {
      if (isTrue) {
        axios({
          method: "delete",
          url: process.env.NEXT_PUBLIC_BASE_API_URL + "/books/" + id,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        })
          .then((res) => {
            swal({
              icon: "success",
              title: "Success!",
              text: res.data?.message,
            });
            setBooks(books.filter((book: Books) => book.id != id));
          })
          .catch((err) => {
            swal({
              icon: "error",
              title: "ERROR",
              text: "Please try again later",
            });
          });
      }
    });
  };

  // unMount Categories
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
    <MainContainer>
      {/* search and add button  */}
      <section className="w-full flex items-center justify-between mb-5">
        <BtnHref href="books/add">Tambah Buku</BtnHref>
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

      {/* table */}
      <Container>
        <table className="w-full">
          <TableHead />
          <tbody className="w-full">
            {books.map((book: Books, index: number) => (
              <tr key={index} className="w-full border-b border-slate-400">
                {/* cover book  */}
                <td className="w-2/12 p-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${book.image}`}
                    alt=""
                    className="h-32 w-24 mx-auto object-cover object-center border border-slate-400 shadow-md rounded-lg"
                  />
                </td>
                {/* end cover book  */}
                <td className="text-start w-2/12 poppins-semibold">
                  {book.title}
                </td>
                <td className="text-center w-2/12">{book.writer}</td>
                <td className="text-center w-2/12">{book.publisher}</td>
                <td className="text-center w-2/12">
                  <span
                    className={`poppins-bold  px-4 py-1 rounded-md ${
                      book.stock > 0
                        ? "text-green-600 bg-green-200"
                        : "text-red-600 bg-red-200"
                    }`}
                  >
                    {book.stock}
                  </span>
                </td>
                {/* delete update show  */}
                <td className="text-center px-1">
                  <button
                    onClick={() => handleDelete(book.id)}
                    className=" p-2 rounded-full bg-red-500 text-white cursor-pointer"
                  >
                    <Trash size={24} />
                  </button>
                </td>
                <td className="text-center px-1">
                  <button
                    onClick={() => router.push(`books/edit/${book.id}`)}
                    className=" p-2 rounded-full bg-amber-500 text-white cursor-pointer"
                  >
                    <Pencil size={24} />
                  </button>
                </td>
                <td className="text-center px-1">
                  <button
                    onClick={() => router.push(`books/detail/${book.id}`)}
                    className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer"
                  >
                    <Eye size={24} />
                  </button>
                </td>
                {/* end delete update show  */}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      {/* end table */}
    </MainContainer>
  );
}
