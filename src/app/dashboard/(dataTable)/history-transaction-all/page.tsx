import HistoryTransactionsList from "@/components/Admin/ListHistoryTransaction";
import MainContainer from "@/components/Admin/MainContainer";
import Pagination from "@/components/Admin/Pagination/Pagination";
import SearchAddBtn from "@/components/Admin/SearchAddBtn";
import { getHistoryTransaction } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - History Transaction All",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  const { page, keyword } = await searchParams;
  const { data } = await getHistoryTransaction("/transactions", page, keyword);
  return (
    <MainContainer>
      <SearchAddBtn />
      <HistoryTransactionsList datas={data.data} />
      <Pagination
        keyword={keyword}
        url="/dashboard/history-transaction-all"
        from={data.from}
        to={data.to}
        current_page={data.current_page}
        prev_page_url={data.prev_page_url}
        next_page_url={data.next_page_url}
      />
    </MainContainer>
  );
}
