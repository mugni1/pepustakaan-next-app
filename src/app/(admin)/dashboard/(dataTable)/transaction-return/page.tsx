import Pagination from "@/components/Admin/Pagination/Pagination";
import TransactionList from "@/components/Admin/ListTransaction";
import { getTransaction } from "@/services";
import { Metadata } from "next";
import MainContainer from "@/components/Admin/MainContainer";
import SearchAddBtn from "@/components/Admin/SearchAddBtn";
import { LuArrowRightFromLine } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Dashboard - Transaction Return",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  const { page, keyword } = await searchParams;
  const { data } = await getTransaction("/borrowings-return", page, keyword);

  return (
    <MainContainer>
      <SearchAddBtn addLink="transaction-borrow/add">
        <LuArrowRightFromLine size={24} /> Pinjam Buku
      </SearchAddBtn>
      <TransactionList data={data.data} />
      <Pagination
        keyword={keyword}
        url="/dashboard/transaction-return"
        current_page={data.current_page}
        from={data.from}
        to={data.to}
        prev_page_url={data.prev_page_url}
        next_page_url={data.next_page_url}
      />
    </MainContainer>
  );
}
