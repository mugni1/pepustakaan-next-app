import UserContainer from "@/components/utilities/Container/UserContainer";
import ListBookBorrows from "@/components/utilities/ListBookBorrows";
import ListBookReturns from "@/components/utilities/ListBookReturns";
import { getBorrowBookUser, getReturnBookUser } from "@/services";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const borrows = await getBorrowBookUser(token);
  const returns = await getReturnBookUser(token);

  console.log(returns.data);
  return (
    <UserContainer>
      <h1 className="poppins-bold text-lg xl:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-500 to-purple-500 mb-1">
        Buku Yang Sedang Di Pinjam
      </h1>
      <h3 className="poppins-semibold">Total {borrows.data?.length ?? 0}</h3>
      <ListBookBorrows data={borrows.data} />

      <h1 className="poppins-bold text-lg xl:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-500 to-purple-500 mt-5 mb-1">
        Buku Yang Sudah Di Kembalikan
      </h1>
      <h3 className="poppins-semibold">Total {returns.data?.length ?? 0}</h3>
      <ListBookReturns data={returns.data} />
    </UserContainer>
  );
}
