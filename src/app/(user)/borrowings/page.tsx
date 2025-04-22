import { getBorrowBookUser } from "@/services";
import { Metadata } from "next";
import MainContainer from "../_components/MainContainer";
import ListBookBorrows from "../_components/ListBookBorrows";
import SubTitle from "../_components/SubTitle";

export const metadata: Metadata = {
  title: "Pustaka - Borrow Books",
};

export default async function Page() {
  const borrows = await getBorrowBookUser();
  return (
    <MainContainer>
      <SubTitle>Sedang dipinjam</SubTitle>
      <ListBookBorrows data={borrows.data} />
    </MainContainer>
  );
}
