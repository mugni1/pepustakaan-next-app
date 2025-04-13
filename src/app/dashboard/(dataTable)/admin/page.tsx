import MemberAndAdminList from "@/components/Admin/ListAdminAndMember";
import Pagination from "@/components/Admin/Pagination/Pagination";
import { getAdmin } from "@/services";
import { Metadata } from "next";
import SearchAddBtn from "./SearchAddBtn";
import MainContainer from "@/components/Admin/MainContainer";

export const metadata: Metadata = {
  title: "Dashboard - Admin",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  const { page, keyword } = await searchParams;
  const result = await getAdmin(page, keyword);

  return (
    <MainContainer>
      <SearchAddBtn />

      <MemberAndAdminList members={result.data} />

      <Pagination
        keyword={keyword}
        url="/dashboard/admin"
        current_page={result.meta.current_page}
        to={result.meta.to}
        from={result.meta.from}
        next_page_url={result.links.next}
        prev_page_url={result.links.prev}
      />
    </MainContainer>
  );
}
