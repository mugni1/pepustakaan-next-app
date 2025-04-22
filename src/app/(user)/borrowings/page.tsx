import { getBorrowBookUser } from "@/services";
import { Metadata } from "next";
import MainContainer from "../_components/MainContainer";
import SubTitle2 from "../_components/SubTitle2";
import ListBookBorrows from "../_components/ListBookBorrows";

export const metadata: Metadata = {
  title: "Pustaka - Borrow Books",
};

export default async function Page() {
  const borrows = await getBorrowBookUser();
  return (
    <MainContainer>
      <SubTitle2>Sedang dipinjam</SubTitle2>
      <ListBookBorrows data={borrows.data} />
    </MainContainer>
  );
}
