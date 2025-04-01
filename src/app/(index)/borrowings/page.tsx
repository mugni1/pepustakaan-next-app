import UserContainer from "@/components/User/Container/UserContainer";
import ListBookBorrows from "@/components/User/ListBookBorrows";
import ListBookReturns from "@/components/User/ListBookReturns";
import { getBorrowBookUser, getReturnBookUser } from "@/services";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const borrows = await getBorrowBookUser(token);
  const returns = await getReturnBookUser(token);
  return (
    <UserContainer>
      <h1 className="poppins-bold text-lg xl:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-500 to-purple-500 mb-1">
        Buku Yang Sedang Di Pinjam
      </h1>
      <h3 className="poppins-semibold">Total {borrows.data?.length ?? 0}</h3>
      <ListBookBorrows data={borrows.data} />
    </UserContainer>
  );
}
