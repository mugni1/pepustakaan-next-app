import MemberAndAdminList from "@/components/Admin/ListAdminAndMember";
import MainContainer from "@/components/Admin/MainContainer";
import Pagination from "@/components/Admin/Pagination/Pagination";
import SearchAddBtn from "@/components/Admin/SearchAddBtn";
import { getMember } from "@/services";
import { Metadata } from "next";
import { AiOutlineUserAdd } from "react-icons/ai";

export const metadata: Metadata = {
  title: "Dashboard - Member",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  const { page, keyword } = await searchParams;
  const result = await getMember(page, keyword);

  return (
    <MainContainer>
      <SearchAddBtn addLink="member/add">
        {" "}
        <AiOutlineUserAdd size={24} /> Tambah
      </SearchAddBtn>
      <MemberAndAdminList members={result.data} />
      <Pagination
        keyword={keyword}
        url="/dashboard/member"
        current_page={result.meta.current_page}
        to={result.meta.to}
        from={result.meta.from}
        next_page_url={result.links.next}
        prev_page_url={result.links.prev}
      />
    </MainContainer>
  );
}
