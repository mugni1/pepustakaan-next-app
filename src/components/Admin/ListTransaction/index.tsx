"use client";
import { Eye } from "@phosphor-icons/react";
import Container from "../Container";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LuArrowLeftToLine } from "react-icons/lu";
import { returnBook } from "@/_actions";
import { toast } from "react-toastify";
import DataTableNoResult from "@/app/(admin)/_components/DataTableNoResult";

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
  // FILTER DATAS
  useEffect(() => {
    setDatas(data);
  }, [data]);

  async function resReturn(id: number) {
    const res = await returnBook(id);
    if (res.status == "success") {
      toast.success(res.message);
    }
    if (res.status == "failed") {
      toast.error(res.message);
    }
  }

  // HANDLE RETURN
  function handleReturn(id: number) {
    swal({
      icon: "warning",
      dangerMode: true,
      title: "Peringatan!",
      text: "Apakah anggota sudah mengembalikan buku?",
      buttons: ["Batal", "Ya"],
    }).then((isTrue) => {
      if (isTrue) {
        resReturn(id);
      }
    });
  }

  // PATHNAME
  const pathName = usePathname();
  return (
    <Container className="mb-5">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border py-2 text-accent2 bg-accent2/10  w-1/12">
              ID Transaksi
            </th>
            <th className="border py-2 text-accent2 bg-accent2/10 w-2/12  ">
              Peminjam
            </th>
            <th className="border py-2 text-accent2 bg-accent2/10 w-2/12">
              Judul Buku
            </th>
            <th className="border py-2 text-accent2 bg-accent2/10 w-1/12 px-2">
              Tgl Peminjaman
            </th>
            <th className="border py-2 text-accent2 bg-accent2/10 w-1/12 px-2">
              Tgl Pengembalian
            </th>
            {pathName == "/dashboard/transaction-late" ||
            pathName == "/dashboard/transaction-return" ? (
              <th className="border py-2 text-accent2 bg-accent2/10 w-1/12 px-2">
                Tgl Dikembalikan
              </th>
            ) : null}
            {pathName == "/dashboard/transaction-borrow" && (
              <th className="border py-2 text-accent2 bg-accent2/10 w-1/12 px-2">
                Denda telat/hari
              </th>
            )}
            <th className="border py-2 text-accent2 bg-accent2/10 w-1/12">
              Status
            </th>
            <th
              className="border py-2 text-accent2 bg-accent2/10 w-1/12"
              colSpan={3}
            >
              Tindakan
            </th>
          </tr>
        </thead>
        <tbody>
          {datas?.map((data: Props, index: number) => (
            <tr key={`${index}${data.id}`}>
              <td className="font-bold text-center px-2 border">
                <div className="bg-gradient-to-r from-accent1 to-accent2 text-white py-1 px-4 rounded-md w-full">
                  {data.id}
                </div>
              </td>
              <td className="text-center  border">
                {data.users?.username || (
                  <span className="text-red-500">UserDeleted</span>
                )}
              </td>
              <td className="text-center border">
                {data.books?.title || (
                  <span className="text-red-500">BookDeleted</span>
                )}
              </td>
              <td className="text-center border">
                <span className="text-amber-600 font-semibold">
                  {data.borrow_date}
                </span>
              </td>
              <td className="text-center border">
                <span className="text-sky-600 font-semibold">
                  {data.return_date}
                </span>
              </td>
              {pathName == "/dashboard/transaction-late" ||
              pathName == "/dashboard/transaction-return" ? (
                <td className="text-center border">
                  <span
                    className={`font-semibold ${
                      pathName == "/dashboard/transaction-late"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {data.actual_return_date}
                  </span>
                </td>
              ) : null}
              {pathName == "/dashboard/transaction-borrow" && (
                <td className="text-center border px-2">
                  Rp{data.daily_fine?.toLocaleString("id-ID")}
                </td>
              )}
              <td className="text-center border">
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
              <td className="text-center px-1  py-2 border">
                <div className="w-full flex gap-2 items-center justify-center">
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
                  {data.status == "dipinjam" && (
                    <button
                      onClick={() => handleReturn(data.id)}
                      className=" p-2 rounded-full bg-emerald-500 text-white cursor-pointer"
                    >
                      <LuArrowLeftToLine size={24} />
                    </button>
                  )}
                </div>
              </td>
              {/* end return  show  */}
            </tr>
          ))}
          {datas?.length == 0 && <DataTableNoResult />}
        </tbody>
      </table>
    </Container>
  );
}
