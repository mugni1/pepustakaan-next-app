import TransactionList from "@/components/TransactionList";
import { getLate } from "@/services";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard - Borrowings",
};

export default async function Page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const { data } = await getLate(authToken);
  return <TransactionList data={data} />;
}
