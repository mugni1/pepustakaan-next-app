import Pagination from "@/components/Admin/Pagination/Pagination";
import TransactionList from "@/components/Admin/ListTransaction";
import { getTransaction } from "@/services";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard - Transaction Late",
};
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  // url
  const { page } = await searchParams;
  let url = baseUrl + "/borrowings-late?page=" + page;
  if (!page) {
    url = baseUrl + "/borrowings-late";
  }

  const { data } = await getTransaction(authToken, url);

  return (
    <>
      <TransactionList data={data.data} />
      <Pagination
        url="/dashboard/transaction-late"
        current_page={data.current_page}
        from={data.from}
        to={data.to}
        prev_page_url={data.prev_page_url}
        next_page_url={data.next_page_url}
      />
    </>
  );
}
