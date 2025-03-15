"use client";
import { ArrowArcLeft, Eye, MagnifyingGlass } from "@phosphor-icons/react";
import MainContainer from "../Admin/MainContainer";
import Container from "../Admin/Container";
import BtnHref from "../Admin/Button/BtnHref";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

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

export default function BorrowList({ data }: { data: Props[] }) {
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

  function handleReturn(id: number) {
    swal({
      icon: "warning",
      dangerMode: true,
      title: "Warning!",
      text: "Apakah kamu ingin mengembalikan buku ini?",
      buttons: ["Batal", "Ya"],
    }).then((isTrue) => {
      if (isTrue) {
        axios({
          method: "PATCH",
          url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/borrowings/${id}`,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        })
          .then((res) => {
            console.log(res);
            swal({ icon: "success", title: "Success!" });
          })
          .catch((err) => {
            console.log(err);
            swal({ icon: "error", title: "Error!" });
          });
      }
    });
  }
  return (
    <MainContainer>
      {/* search  */}
      <section className="w-full flex items-center justify-between mb-5">
        <BtnHref href="borrow/add">Tambah Peminjaman</BtnHref>
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
                <td className="text-center">{borrow.user?.username}</td>
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
                <td className="text-center px-1  py-2">
                  <button
                    // onClick={() => router.push(`books/detail/${book.id}`)}
                    className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer"
                  >
                    <Eye size={24} />
                  </button>
                </td>
                <td className="text-center px-1  py-2">
                  <button
                    onClick={() => handleReturn(borrow.id)}
                    className=" p-2 rounded-full bg-emerald-500 text-white cursor-pointer"
                  >
                    <ArrowArcLeft size={28} />
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
