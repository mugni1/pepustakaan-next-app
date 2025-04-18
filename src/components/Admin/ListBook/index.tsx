"use client";
import { useEffect, useState } from "react";
import TableHead from "./TableHead";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import Container from "../Container";
import Image from "next/image";
import Link from "next/link";
import DataTableNoResult from "@/app/(admin)/_components/DataTableNoResult";
import { deleteBook } from "@/_actions/BookDelete";
import { toast } from "react-toastify";

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
  //token
  const [books, setBooks] = useState<Books[]>(data || []);
  const router = useRouter();

  async function handleDeleteBook(id: number) {
    const res = await deleteBook(id);
    if (res.status == "failed") {
      toast.error(res.message);
    }
    if (res.status == "success") {
      toast.success(res.message);
    }
  }

  const handleDelete = (id: number) => {
    swal({
      icon: "warning",
      dangerMode: true,
      title: "Peringatan!",
      text: "Apakah kamu yakin ingin menghapus?",
      buttons: ["Batal", "Ya"],
    }).then((isTrue) => {
      if (isTrue) {
        handleDeleteBook(id);
      }
    });
  };

  // unMount Categories
  useEffect(() => {
    setBooks(data);
  }, [data]);

  return (
    <Container className="mb-5">
      <table className="w-full">
        <TableHead />
        <tbody className="w-full">
          {books?.map((book: Books, index: number) => (
            <tr key={index + book.id}>
              {/* cover book  */}
              <td className="p-4 border">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${book.image}`}
                  alt=""
                  className="h-32 w-24 mx-auto object-cover object-center border shadow-md rounded-lg"
                  width={100}
                  height={150}
                />
              </td>
              {/* end cover book  */}
              <td className=" border text-center">{book.title}</td>
              <td className="text-center border">{book.writer}</td>
              <td className="text-center border">{book.publisher}</td>
              <td className="text-center border">
                <span
                  className={`font-bold  px-4 py-1 rounded-md ${
                    book.stock > 0
                      ? "text-green-600 bg-green-200"
                      : "text-red-600 bg-red-200"
                  }`}
                >
                  {book.stock}
                </span>
              </td>
              {/* delete update show  */}
              <td className="text-center border px-1">
                <div className="w-full text-center gap-2 flex mx-auto justify-center">
                  <button
                    onClick={() => handleDelete(book.id)}
                    className=" p-2 rounded-full bg-red-500 text-white cursor-pointer"
                  >
                    <Trash size={24} />
                  </button>
                  <Link href={`books/edit/${book.id}`}>
                    <button className=" p-2 rounded-full bg-amber-500 text-white cursor-pointer">
                      <Pencil size={24} />
                    </button>
                  </Link>
                  <Link href={`books/${book.id}`}>
                    <button className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer">
                      <Eye size={24} />
                    </button>
                  </Link>
                </div>
              </td>
              {/* end delete update show  */}
            </tr>
          ))}
          {books.length <= 0 && <DataTableNoResult />}
        </tbody>
      </table>
    </Container>
  );
}
