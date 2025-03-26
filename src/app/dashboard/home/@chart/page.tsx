import Container from "@/components/Admin/Container";
import { SimpleBarChart } from "@/components/Admin/ReCharts/ReChart";
import SubTitle from "@/components/User/SubTitle";
import { getCountHistoryTrans } from "@/services";
import React from "react";
import FilterYearForm from "./_FilterYearForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ year: string }>;
}) {
  const { year } = await searchParams;
  const peminjamanCount = await getCountHistoryTrans("borrow", year);
  const pengembalianCount = await getCountHistoryTrans("return", year);
  const dendaCount = await getCountHistoryTrans("fine", year);
  return (
    <Container className="mt-10 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <SubTitle>Sejarah Transaksi</SubTitle>
        <span className="poppins-bold text-xl">
          Tahun : {!year ? new Date().getFullYear() : year}
        </span>
      </div>
      <FilterYearForm />
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
