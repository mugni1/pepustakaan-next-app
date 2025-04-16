import Container from "@/components/Admin/Container";
import { SimpleBarChart } from "@/components/Admin/ReCharts/ReChart";
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
      {/* title  */}
      <section className="flex justify-between items-center text-foreground">
        <h1 className="font-bold text-xl">Sejarah Transaksi</h1>
        <span className="font-bold text-xl">
          Tahun : {!year ? new Date().getFullYear() : year}
        </span>
      </section>
      {/* end title  */}

      {/* simple bar chart  */}
      <FilterYearForm />
      <SimpleBarChart
        pengembalian={pengembalianCount}
        peminjaman={peminjamanCount}
        denda={dendaCount}
      />
      {/* end simple bar chart  */}
    </Container>
  );
}
