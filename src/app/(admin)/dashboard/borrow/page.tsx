import BorrowList from "@/components/BorrowList";
import { getBorrow } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Borrowings",
};

export default async function Page() {
  const { data } = await getBorrow();
  return <BorrowList data={data} />;
}
