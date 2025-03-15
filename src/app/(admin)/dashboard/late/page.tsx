import LateList from "@/components/lateList";
import { getLate } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Borrowings",
};

export default async function Page() {
  const { data } = await getLate();
  return <LateList data={data} />;
}
