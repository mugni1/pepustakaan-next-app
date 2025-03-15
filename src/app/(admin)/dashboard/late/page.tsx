import TransactionList from "@/components/TransactionList";
import { getLate } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Borrowings",
};

export default async function Page() {
  const { data } = await getLate();
  return <TransactionList data={data} />;
}
