"use client";
import { ArrowArcLeft, Eye, MagnifyingGlass } from "@phosphor-icons/react";
import MainContainer from "../Admin/MainContainer";
import Container from "../Admin/Container";
import BtnHref from "../Admin/Button/BtnHref";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { usePathname } from "next/navigation";

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

export default function TransactionList({ data }: { data: Props[] }) {
  const [datas, setDatas] = useState(data);
  const [keyword, setKeyword] = useState("");

  // FILTER DATAS
  useEffect(() => {
    keyword.length > 0
      ? setDatas(
          data.filter((borrow) =>
            borrow.user?.username.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setDatas(data);
  }, [keyword]);

  // HANDLE RETURN
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

  // PATHNAME
  const pathName = usePathname();
  return (
    <MainContainer>
      {/* search  */}
      <section
        className={`w-full flex items-center mb-5 ${
          pathName == "/dashboard/transaction-borrow"
            ? "justify-between"
            : "justify-end"
        }`}
      >
        {pathName == "/dashboard/transaction-borrow" && (
          <BtnHref href="transaction-borrow/add">Tambah Peminjaman</BtnHref>
        )}
        <div className="relative h-fit w-auto group text-slate-600">
          <span className="absolute h-full flex items-center px-2">
            <MagnifyingGlass size={20} />
          </span>
          <input
            type="text"
            className=" py-1 px-2 border border-slate-400 rounded-md bg-white outline-purple-500 ps-10"
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
            {datas.map((data: Props, index) => (
              <tr key={index} className="border-b border-slate-500">
                <td className="text-center">{data.user?.username}</td>
                <td className="text-center">{data.book?.title}</td>
                <td className="text-center">{data.borrow_date}</td>
                <td className="text-center">{data.return_date}</td>
                <td className="text-center px-2">
                  Rp{data.daily_fine.toLocaleString("id-ID")}
                </td>
                <td className="text-center">
                  <span
                    className={`py-1 px-3 rounded-lg ${
                      data.status == "dipinjam" && "text-amber-600 bg-amber-200"
                    }  ${
                      data.status == "dikembalikan" &&
                      "text-green-600 bg-green-200"
                    } ${
                      data.status == "terlambat" && "text-red-600 bg-red-200"
                    }`}
                  >
                    {data.status}
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
                {data.status == "dipinjam" && (
                  <td className="text-center px-1  py-2">
                    <button
                      onClick={() => handleReturn(data.id)}
                      className=" p-2 rounded-full bg-emerald-500 text-white cursor-pointer"
                    >
                      <ArrowArcLeft size={28} />
                    </button>
                  </td>
                )}
                {/* end delete update show  */}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </MainContainer>
  );
}
