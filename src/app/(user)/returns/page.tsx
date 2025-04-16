import { getReturnBookUser } from "@/services";
import { Metadata } from "next";
import MainContainer from "../_components/MainContainer";
import SubTitle2 from "../_components/SubTitle2";
import ListBookReturns from "../_components/ListBookReturns";

export const metadata: Metadata = {
  title: "Pustaka - Return Books",
};

export default async function Page() {
  const returns = await getReturnBookUser();
  return (
    <MainContainer>
      <SubTitle2 className="bg-emerald-600">DAFTAR PENGEMBALIAN</SubTitle2>
      <ListBookReturns data={returns.data} />
    </MainContainer>
  );
}
