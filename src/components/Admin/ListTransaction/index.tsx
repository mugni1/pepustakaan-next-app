"use client";
import { ArrowArcLeft, Eye } from "@phosphor-icons/react";
import Container from "../Container";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

interface User {
  id: number;
  username: string;
}
interface Book {
  id: number;
  title: string;
}
interface Props {
  id: number;
  users: User | null;
  books: Book | null;
  borrow_date?: string;
  return_date?: string;
  actual_return_date?: string;
  status: string;
  daily_fine: number;
}

export default function TransactionList({ data }: { data: Props[] }) {
  const [datas, setDatas] = useState(data || []);
  const [keyword, setKeyword] = useState("");
  const token = Cookies.get("auth_token");
  // FILTER DATAS
  useEffect(() => {
    if (keyword.length > 0) {
      setDatas(
        data.filter((borrow) =>
          borrow.id.toString().toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      setDatas(data);
    }
  }, [keyword, data]);

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
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            swal({
              icon: "success",
              title: "Success!",
              text: res.data.message,
            });
            setDatas(datas.filter((data) => data.id != id));
          })
          .catch(() => {
            swal({ icon: "error", title: "Error!", text: "Terjadi kesalahan" });
          });
      }
    });
  }

  // PATHNAME
  const pathName = usePathname();
  return (
    <Container className="mb-5">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-500 poppins-bold">
            <th className="py-2 w-1/12">ID Transaksi</th>
            <th className="w-2/12 py-5 ">Peminjam</th>
            <th className="w-3/12">Judul Buku</th>
            <th className="w-1/12 px-2">Tgl Peminjaman</th>
            {pathName == "/dashboard/transaction-borrow" && (
              <th className="w-1/12 px-2">Tgl Pengembalian</th>
            )}
            {pathName == "/dashboard/transaction-late" && (
              <th className="w-1/12 px-2">Tgl Pengembalian</th>
            )}
            {pathName == "/dashboard/transaction-late" && (
              <th className="w-1/12 px-2">Tgl Dikembalikan</th>
            )}
            {pathName == "/dashboard/transaction-return" && (
              <th className="w-1/12 px-2">Tgl Dikembalikan</th>
            )}
            {pathName == "/dashboard/transaction-borrow" && (
              <th className="w-1/12 px-2">Denda telat/hari</th>
            )}
            {pathName == "/dashboard/transaction-return" && (
              <th className="w-1/12 px-2">Denda telat/hari</th>
            )}
            <th className="w-2/12">Status</th>
            <th className="w-1/12" colSpan={3}>
              Tindakan
            </th>
          </tr>
        </thead>
        <tbody>
          {datas?.map((data: Props, index: number) => (
            <tr
              key={`${index}${data.id}`}
              className="border-b border-slate-500"
            >
              <td className="poppins-semibold text-center  px-2">
                <div className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white py-1 px-4 rounded-md w-full">
                  {data.id}
                </div>
              </td>
              <td className="text-center poppins-semibold">
                {data.users?.username || (
                  <span className="text-red-500">UserDeleted</span>
                )}
              </td>
              <td className="text-center">
                {data.books?.title || (
                  <span className="text-red-500">BookDeleted</span>
                )}
              </td>
              <td className="text-center">{data.borrow_date}</td>
              {pathName == "/dashboard/transaction-late" && (
                <td className="text-center">{data.return_date}</td>
              )}
              {pathName == "/dashboard/transaction-borrow" && (
                <td className="text-center">{data.return_date}</td>
              )}
              {pathName == "/dashboard/transaction-late" && (
                <td className="text-center">{data.actual_return_date}</td>
              )}
              {pathName == "/dashboard/transaction-return" && (
                <td className="text-center">{data.actual_return_date}</td>
              )}
              {pathName == "/dashboard/transaction-borrow" && (
                <td className="text-center px-2">
                  Rp{data.daily_fine?.toLocaleString("id-ID")}
                </td>
              )}
              {pathName == "/dashboard/transaction-return" && (
                <td className="text-center px-2">
                  Rp{data.daily_fine?.toLocaleString("id-ID")}
                </td>
              )}
              <td className="text-center">
                <span
                  className={`py-1 px-3 rounded-lg ${
                    data.status == "dipinjam" && "text-amber-600 bg-amber-200"
                  }  ${
                    data.status == "dikembalikan" &&
                    "text-green-600 bg-green-200"
                  } ${data.status == "terlambat" && "text-red-600 bg-red-200"}`}
                >
                  {data.status}
                </span>
              </td>
              {/* return  show  */}
              <td className="text-center px-1  py-2">
                {pathName == "/dashboard/transaction-borrow" && (
                  <Link href={`/dashboard/transaction-borrow/${data.id}`}>
                    <button className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer">
                      <Eye size={24} />
                    </button>
                  </Link>
                )}
                {pathName == "/dashboard/transaction-return" && (
                  <Link href={`/dashboard/transaction-return/${data.id}`}>
                    <button className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer">
                      <Eye size={24} />
                    </button>
                  </Link>
                )}
                {pathName == "/dashboard/transaction-late" && (
                  <Link href={`/dashboard/transaction-late/${data.id}`}>
                    <button className=" p-2 rounded-full bg-sky-500 text-white cursor-pointer">
                      <Eye size={24} />
                    </button>
                  </Link>
                )}
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
              {/* end return  show  */}
            </tr>
          ))}
          {datas?.length == 0 && (
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
