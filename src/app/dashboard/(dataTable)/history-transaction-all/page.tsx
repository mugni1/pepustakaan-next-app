import HistoryTransactionsList from "@/components/Admin/ListHistoryTransaction";
import Pagination from "@/components/Admin/Pagination/Pagination";
import { getHistoryTransaction } from "@/services";
import { cookies } from "next/headers";

// base url from env
const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  // token
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  // params
  const { page } = await searchParams;
  let url = baseURL + "/transactions?page=" + page; // url jika ada search params
  // jika tidak ada search params
  if (!page) {
    url = baseURL + "/transactions?page=1"; // url jika tidak ada search params
  }

  // fetch data
  const { data } = await getHistoryTransaction(authToken, url);

  // render
  return (
    <>
      <HistoryTransactionsList datas={data.data} />
      <Pagination
        url="/dashboard/history-transaction-all"
        from={data.from}
        to={data.to}
        current_page={data.current_page}
        prev_page_url={data.prev_page_url}
        next_page_url={data.next_page_url}
      />
    </>
  );
}
