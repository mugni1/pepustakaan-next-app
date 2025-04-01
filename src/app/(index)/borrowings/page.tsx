import UserContainer from "@/components/User/Container/UserContainer";
import ListBookBorrows from "@/components/User/ListBookBorrows";
import SubTitle2 from "@/components/User/SubTitle2";
import { getBorrowBookUser } from "@/services";

export default async function Page() {
  const borrows = await getBorrowBookUser();
  return (
    <UserContainer>
      <SubTitle2 className="bg-emerald-600">DAFTAR PEMINJAMAN</SubTitle2>
      <ListBookBorrows data={borrows.data} />
    </UserContainer>
  );
}
