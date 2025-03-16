"use client";
import { Eye, MagnifyingGlass } from "@phosphor-icons/react";
import Container from "../Admin/Container";
import MainContainer from "../Admin/MainContainer";
import { useEffect, useState } from "react";

interface Book {
  title: string;
}

interface User {
  full_name: string;
  username: string;
}

interface Transaction {
  id: number;
  actual_return_date: string;
  status: string;
  book: Book;
  user: User;
}

interface DetailTransaction {
  id: number;
  amount: number;
  borrowing: Transaction;
  transaction_type: string;
}

export default function HistoryTransactionsList({
  datas,
}: {
  datas: DetailTransaction[];
}) {
  const [historyTrans, setHistoryTrans] = useState(datas);

  const [keyword, setKeyword] = useState("");

  // FILTER DATAS
  useEffect(() => {
    keyword.length > 0
      ? setHistoryTrans(
          datas.filter((HT) =>
            HT.borrowing.user.username
              .toLowerCase()
              .includes(keyword.toLowerCase())
          )
        )
      : setHistoryTrans(datas);
  }, [keyword]);
  return (
    <MainContainer>
      {/* search  */}
      <section className={`w-full flex items-center mb-5 justify-end`}>
        <div className="relative h-fit w-auto group text-slate-600 shadow-md">
          <span className="absolute h-full flex items-center px-2">
            <MagnifyingGlass size={20} />
          </span>
          <input
            type="text"
            className=" py-1 px-2 border border-slate-400 rounded-md bg-white outline-purple-500 ps-10"
            placeholder="Cari Peminjam"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </section>
      {/* end search  */}
      <Container>
        <table className="w-full">
          <thead>
            <tr className="border-b  border-slate-600 poppins-bold">
              <th className="py-2 w-1/12">ID Transaksi</th>
              <th className="py-2 w-2/12">Peminjam</th>
              <th className="w-2/12">Judul Buku</th>
              <th className="w-2/12">Status</th>
              <th className="w-2/12">Denda</th>
              <th className="w-2/12">Dikembalikan</th>
              <th className="w-1/12">Action</th>
            </tr>
          </thead>
          <tbody>
            {historyTrans.map((HT, index) => (
              <tr key={index} className="border-b border-slate-600">
                <td className="poppins-semibold text-center ">
                  <span className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white py-1 px-4 rounded-md">
                    {HT.borrowing.id}
                  </span>
                </td>
                <td className=" text-center">{HT.borrowing.user.username}</td>
                <td className=" text-center">{HT.borrowing.book.title}</td>
                <td className=" text-center">
                  <span
                    className={`py-1 px-3 rounded-lg shadow-md text-sm ${
                      HT.transaction_type == "peminjaman" &&
                      "bg-amber-100 text-amber-600"
                    } ${
                      HT.transaction_type == "pengembalian" &&
                      "bg-green-100 text-green-600"
                    }  ${
                      HT.transaction_type == "denda" &&
                      "bg-red-100 text-red-600"
                    }`}
                  >
                    {HT.transaction_type}
                  </span>
                </td>
                <td
                  className={`poppins-semibold text-center ${
                    HT.amount > 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  <span>Rp{HT.amount.toLocaleString("id-ID")}</span>
                </td>
                <td className="text-center">
                  <span>2025-06-15</span>
                </td>
                <td className="text-center px-1  py-2">
                  <button
                    // onClick={() => router.push(`books/detail/${book.id}`)}
                    className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer"
                  >
                    <Eye size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </MainContainer>
  );
}
