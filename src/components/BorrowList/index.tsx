"use client";
import { MagnifyingGlass, Pencil, Trash } from "@phosphor-icons/react";
import MainContainer from "../Admin/MainContainer";
import Container from "../Admin/Container";
import BtnHref from "../Admin/Button/BtnHref";

export default function BorrowList() {
  return (
    <MainContainer>
      {/* search  */}
      <section className="w-full flex items-center justify-between mb-5">
        <BtnHref href="borrow/add">Tambah Anggota</BtnHref>
        <div className="relative h-fit w-auto group text-slate-600">
          <span className="absolute h-full flex items-center px-2">
            <MagnifyingGlass size={24} />
          </span>
          <input
            type="text"
            className="p-2 border border-slate-400 rounded-md bg-white outline-purple-500 ps-10"
            placeholder="Cari Member"
            // value={keyword}
            // onChange={(e) => setKeyword(e.target.value)}
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
              <th className="w-1/12" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-500">
              <td className="text-center">Asep Abdul Mugni</td>
              <td className="text-center">Menjadi Sukse dalam setahun</td>
              <td className="text-center">2025-02-23</td>
              <td className="text-center">2025-04-25</td>
              <td className="text-center px-2">Rp 1.000</td>
              <td className="text-center">
                <span className="py-1 px-3 text-green-600 bg-green-200 rounded-lg">
                  dipinjam
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
              {/* end delete update show  */}
            </tr>
          </tbody>
        </table>
      </Container>
    </MainContainer>
  );
}
