import Container from "@/components/Admin/Container";
import { SimpleBarChart } from "@/components/Admin/ReCharts/ReChart";
import SubTitle from "@/components/User/SubTitle";
import { getCountHistoryTrans } from "@/services";
import React from "react";

export default async function Page() {
  const peminjamanCount = await getCountHistoryTrans("borrow");
  const pengembalianCount = await getCountHistoryTrans("return");
  const dendaCount = await getCountHistoryTrans("fine");
  return (
    <Container className="mt-10 flex flex-col gap-2">
      <SubTitle>Sejarah Transaksi</SubTitle>
      <form className=" flex gap-5">
        <input
          type="number"
          name="year"
          id="year"
          min="2000"
          max="2200"
          placeholder="Pilih Tahun"
          className="py-1 px-3 border rounded-md border-slate-600"
        />
        <button className=" h-auto px-5 bg-green-500 text-white poppins-semibold rounded-md">
          Simpan
        </button>
      </form>
      <div className="border border-slate-600 w-full pt-4 pb-2 pe-4 rounded-lg">
        <SimpleBarChart
          pengembalian={pengembalianCount}
          peminjaman={peminjamanCount}
          denda={dendaCount}
        />
      </div>
    </Container>
  );
}
