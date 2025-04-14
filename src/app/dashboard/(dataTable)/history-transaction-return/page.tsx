import HistoryTransactionsList from "@/components/Admin/ListHistoryTransaction";
import MainContainer from "@/components/Admin/MainContainer";
import Pagination from "@/components/Admin/Pagination/Pagination";
import SearchAddBtn from "@/components/Admin/SearchAddBtn";
import { getHistoryTransactionReturn } from "@/services";
// base url from env
const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  // params
  const { page, keyword } = await searchParams;
  // fetch data
  const { data } = await getHistoryTransactionReturn(page, keyword);

  // render
  return (
    <MainContainer>
      <SearchAddBtn />
      <HistoryTransactionsList datas={data.data} />
      <Pagination
        keyword={keyword}
        url="/dashboard/history-transaction-return"
        from={data.from}
        to={data.to}
        current_page={data.current_page}
        prev_page_url={data.prev_page_url}
        next_page_url={data.next_page_url}
      />
    </MainContainer>
  );
}
