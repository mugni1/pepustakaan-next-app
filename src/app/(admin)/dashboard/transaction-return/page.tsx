import TransactionList from "@/components/TransactionList";
import { getReturn } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Borrowings",
};

export default async function Page() {
  const { data } = await getReturn();
  return <TransactionList data={data} />;
}
