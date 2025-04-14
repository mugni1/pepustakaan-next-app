"use client";
import { Eye } from "@phosphor-icons/react";
import Container from "../Container";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Book {
  title: string;
}
interface User {
  username: string;
}
interface Transaction {
  id: number;
  actual_return_date: string;
  books: Book;
  users: User;
}
interface DataTransaction {
  id: number;
  amount: number;
  borrowings: Transaction;
  transaction_type: string;
}

export default function HistoryTransactionsList({
  datas,
}: {
  datas: DataTransaction[];
}) {
  const [historyTrans, setHistoryTrans] = useState<DataTransaction[]>(
    datas || []
  ); // hanya daftar history

  // FILTER DATAS
  useEffect(() => {
    setHistoryTrans(datas);
  }, [datas]);

  // usePathname()
  const pathName = usePathname();
  return (
    <Container className="mb-5">
      <table className="w-full">
        <thead>
          <tr className="border-b  border-slate-600 poppins-bold">
            <th className="py-2 w-1/12">ID Transaksi</th>
            <th className="py-2 w-2/12">Peminjam</th>
            <th className="w-2/12">Judul Buku</th>
            <th className="w-2/12">Status</th>
            <th className="w-2/12">Denda</th>
            <th className="w-1/12">Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {historyTrans?.map((HT: DataTransaction, index: number) => (
            <tr key={`${index}`} className="border-b border-slate-600">
              <td className="poppins-semibold text-center px-2">
                <div className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white py-1 px-4 rounded-md w-full">
                  {HT.borrowings.id}
                </div>
              </td>
              <td className=" text-center poppins-semibold">
                {HT.borrowings.users?.username || (
                  <span className="text-red-500">UserDeleted</span>
                )}
              </td>
              <td className=" text-center">
                {HT.borrowings.books?.title || (
                  <span className="text-red-500">BookDeleted</span>
                )}
              </td>
              <td className=" text-center">
                <span
                  className={`py-1 px-3 rounded-lg text-sm ${
                    HT.transaction_type == "peminjaman" &&
                    "bg-amber-100 text-amber-600"
                  } ${
                    HT.transaction_type == "pengembalian" &&
                    "bg-green-100 text-green-600"
                  }  ${
                    HT.transaction_type == "denda" && "bg-red-100 text-red-600"
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
              <td className="text-center px-1 py-2">
                {pathName == "/dashboard/history-transaction-all" && (
                  <Link href={"history-transaction-all/" + HT.id}>
                    <button className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer">
                      <Eye size={24} />
                    </button>
                  </Link>
                )}
                {pathName == "/dashboard/history-transaction-borrow" && (
                  <Link href={"history-transaction-borrow/" + HT.id}>
                    <button className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer">
                      <Eye size={24} />
                    </button>
                  </Link>
                )}
                {pathName == "/dashboard/history-transaction-return" && (
                  <Link href={"history-transaction-return/" + HT.id}>
                    <button className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer">
                      <Eye size={24} />
                    </button>
                  </Link>
                )}
                {pathName == "/dashboard/history-transaction-fine" && (
                  <Link href={"history-transaction-fine/" + HT.id}>
                    <button className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer">
                      <Eye size={24} />
                    </button>
                  </Link>
                )}
              </td>
            </tr>
          ))}
          {historyTrans?.length == 0 && (
            <tr className="border-b">
              <td
                colSpan={7}
                className="text-center text-red-500 poppins-bold py-5"
              >
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
