import { getReturnBookUser } from "@/services";
import { Metadata } from "next";
import MainContainer from "../_components/MainContainer";
import ListBookReturns from "../_components/ListBookReturns";
import SubTitle from "../_components/SubTitle";

export const metadata: Metadata = {
  title: "Pustaka - Return Books",
};

export default async function Page() {
  const returns = await getReturnBookUser();
  return (
    <MainContainer>
      <SubTitle>Sudah dikembalikan</SubTitle>
      <ListBookReturns data={returns.data} />
    </MainContainer>
  );
}
