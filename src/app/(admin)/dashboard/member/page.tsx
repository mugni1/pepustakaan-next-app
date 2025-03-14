import MemberList from "@/components/MemberList";
import { getMember } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Member",
};

export default async function Page() {
  const { data } = await getMember();

  return <MemberList members={data} />;
}
