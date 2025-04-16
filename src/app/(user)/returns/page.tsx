import UserContainer from "@/components/User/Container/UserContainer";
import ListBookReturns from "@/components/User/ListBookReturns";
import SubTitle2 from "@/components/User/SubTitle2";
import { getReturnBookUser } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DAFTAR PENGEMBALIAN",
};

export default async function Page() {
  const returns = await getReturnBookUser();
  return (
    <UserContainer>
      <SubTitle2 className="bg-emerald-600">DAFTAR PENGEMBALIAN</SubTitle2>
      <ListBookReturns data={returns.data} />
    </UserContainer>
  );
}
