import Pagination from "@/components/Admin/Pagination/Pagination";
import TransactionList from "@/components/Admin/ListTransaction";
import { getTransactionReturn } from "@/services";
import { Metadata } from "next";
import MainContainer from "@/components/Admin/MainContainer";
import SearchAddBtn from "@/components/Admin/SearchAddBtn";

export const metadata: Metadata = {
  title: "Dashboard - Borrowings",
};
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  // url
  const { page, keyword } = await searchParams;
  const { data } = await getTransactionReturn(page, keyword);

  return (
    <MainContainer>
      <SearchAddBtn />
      <TransactionList data={data.data} />
      <Pagination
        keyword={keyword}
        url="/dashboard/transaction-borrow"
        current_page={data.current_page}
        from={data.from}
        to={data.to}
        prev_page_url={data.prev_page_url}
        next_page_url={data.next_page_url}
      />
    </MainContainer>
  );
}
