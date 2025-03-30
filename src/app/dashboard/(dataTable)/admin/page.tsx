import MemberAndAdminList from "@/components/Admin/ListAdminAndMember";
import Pagination from "@/components/Admin/Pagination/Pagination";
import { getAdminList } from "@/services";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const result = await getAdminList(page);
  return (
    <>
      <MemberAndAdminList members={result.data} />
      <Pagination
        url="/dashboard/admin"
        current_page={result.meta.current_page}
        to={result.meta.to}
        from={result.meta.from}
        next_page_url={result.links.next}
        prev_page_url={result.links.prev}
      />
    </>
  );
}
