import UserContainer from "@/components/User/Container/UserContainer";
import ListBookBorrows from "@/components/User/ListBookBorrows";
import SubTitle2 from "@/components/User/SubTitle2";
import { getBorrowBookUser } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DAFTAR PINJAMAN",
};

export default async function Page() {
  const borrows = await getBorrowBookUser();
  return (
    <UserContainer>
      <SubTitle2 className="bg-amber-600">DAFTAR PEMINJAMAN</SubTitle2>
      <ListBookBorrows data={borrows.data} />
    </UserContainer>
  );
}
