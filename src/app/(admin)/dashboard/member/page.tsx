import MemberList from "@/components/Admin/MemberList";
import { getMember } from "@/services";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard - Member",
};

export default async function Page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const { data } = await getMember(authToken);

  return <MemberList members={data} />;
}
