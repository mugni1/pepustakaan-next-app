import Container from "@/components/Admin/Container";
import HistoryTransAllToExcel from "@/components/Admin/Export/HistoryTransAllToExcel";
import HistoryTransactionsList from "@/components/Admin/ListHistoryTransaction";
import MainContainer from "@/components/Admin/MainContainer";
import Pagination from "@/components/Admin/Pagination/Pagination";
import SearchAddBtn from "@/components/Admin/SearchAddBtn";
import { getHistoryTransaction } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - History Transaction Fine",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  const { page, keyword } = await searchParams;
  const { data } = await getHistoryTransaction(
    "/transactions-fine",
    page,
    keyword
  );
  return (
    <MainContainer>
      <SearchAddBtn />
      <HistoryTransactionsList datas={data?.data} />
      <Pagination
        keyword={keyword}
        url="/dashboard/history-transaction-fine"
        from={data.from}
        to={data.to}
        current_page={data.current_page}
        prev_page_url={data.prev_page_url}
        next_page_url={data.next_page_url}
      />
      <Container className="mt-5 flex justify-between items-center">
        <b className="poppins-bold text-xl">Export</b>
        <div>
          <HistoryTransAllToExcel
            title={`History-transaksi-denda-page-(${data.current_page})`}
            data={data.data}
          />
        </div>
      </Container>
    </MainContainer>
  );
}
