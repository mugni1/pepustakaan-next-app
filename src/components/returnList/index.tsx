"use client";
import { Eye, MagnifyingGlass, Pencil, Trash } from "@phosphor-icons/react";
import MainContainer from "../Admin/MainContainer";
import Container from "../Admin/Container";
import BtnHref from "../Admin/Button/BtnHref";
import { useEffect, useState } from "react";
interface User {
  id: number;
  full_name: string;
  username: string;
}
interface Book {
  id: number;
  title: string;
}
interface Props {
  id: number;
  user: User | null;
  book: Book | null;
  borrow_date: string;
  return_date: string;
  status: string;
  daily_fine: number;
}

export default function ReturnList({ data }: { data: Props[] }) {
  const [borrows, setBorrows] = useState(data);
  const [keyword, setKeyword] = useState("");
  // unMount Categories
  useEffect(() => {
    keyword.length > 0
      ? setBorrows(
          data.filter((borrow) =>
            borrow.user?.username.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setBorrows(data);
  }, [keyword]);
  return (
    <MainContainer>
      {/* search  */}
      <section className="w-full flex items-center justify-end mb-5">
        <div className="relative h-fit w-auto group text-slate-600">
          <span className="absolute h-full flex items-center px-2">
            <MagnifyingGlass size={24} />
          </span>
          <input
            type="text"
            className="p-2 border border-slate-400 rounded-md bg-white outline-purple-500 ps-10"
            placeholder="Cari Member"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </section>
      {/* end search  */}
      <Container>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-500">
              <th className="w-3/12 py-5">Peminjam</th>
              <th className="w-3/12">Judul Buku</th>
              <th className="w-1/12 px-2">Tgl peminjaman</th>
              <th className="w-1/12 px-2">Tgl dikembalikan</th>
              <th className="w-1/12 px-2">Denda telat/hari</th>
              <th className="w-2/12">Status</th>
              <th className="w-1/12" colSpan={3}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow: Props, index) => (
              <tr key={index} className="border-b border-slate-500">
                <td className="text-center">{borrow.user?.full_name}</td>
                <td className="text-center">{borrow.book?.title}</td>
                <td className="text-center">{borrow.borrow_date}</td>
                <td className="text-center">{borrow.return_date}</td>
                <td className="text-center px-2">
                  Rp{borrow.daily_fine.toLocaleString("id-ID")}
                </td>
                <td className="text-center">
                  <span className="py-1 px-3 text-amber-600 bg-amber-200 rounded-lg">
                    {borrow.status}
                  </span>
                </td>
                {/* delete update show  */}
                <td className="text-center px-1 py-3">
                  <button
                    //   onClick={() => handleDelete(member.id)}
                    className="p-2 rounded-full bg-red-500 text-white cursor-pointer"
                  >
                    <Trash size={24} />
                  </button>
                </td>
                <td className="text-center px-1">
                  <button
                    // onClick={() => router.push(`books/edit/${book.id}`)}
                    className=" p-2 rounded-full bg-amber-500 text-white cursor-pointer"
                  >
                    <Pencil size={24} />
                  </button>
                </td>
                <td className="text-center px-1">
                  <button
                    // onClick={() => router.push(`books/detail/${book.id}`)}
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
    </MainContainer>
  );
}
