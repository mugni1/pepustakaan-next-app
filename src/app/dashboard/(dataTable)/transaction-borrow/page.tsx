import Pagination from "@/components/Admin/Pagination/Pagination";
import TransactionList from "@/components/Admin/ListTransaction";
import { getTransaction } from "@/services";
import { Metadata } from "next";
import MainContainer from "@/components/Admin/MainContainer";
import SearchAddBtn from "@/components/Admin/SearchAddBtn";
import { TbArrowBigRightLines } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Dashboard - Transaction Borrow",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  const { page, keyword } = await searchParams;
  const { data } = await getTransaction("/borrowings-borrow", page, keyword);

  return (
    <MainContainer>
      <SearchAddBtn addLink="transaction-borrow/add">
        <TbArrowBigRightLines size={24} /> Pinjam
      </SearchAddBtn>
      <TransactionList data={data?.data} />
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
