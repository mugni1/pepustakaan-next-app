import MemberList from "@/components/MemberList";
import { getMember } from "@/services";
import { Metadata } from "next";
import Cookies from "js-cookie";

export const metadata: Metadata = {
  title: "Dashboard - Member",
};

export default async function Page() {
  const { data } = await getMember(Cookies.get("auth_token"));

  return <MemberList members={data} />;
}
