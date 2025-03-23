import TransactionList from "@/components/Admin/TransactionList";
import { getBorrow } from "@/services";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard - Borrowings",
};

export default async function Page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const { data } = await getBorrow(authToken);
  return <TransactionList data={data} />;
}
