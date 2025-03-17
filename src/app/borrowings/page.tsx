import UserContainer from "@/components/utilities/Container/UserContainer";
import ListBookBorrows from "@/components/utilities/ListBookBorrows";
import { getBorrowBookUser } from "@/services";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const { data } = await getBorrowBookUser(token);
  return (
    <UserContainer>
      <h1 className="poppins-bold text-lg xl:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-500 to-purple-500 mb-3">
        Buku Yang Di Pinjam
      </h1>
      <h3 className="poppins-semibold">Total {data?.length ?? 0}</h3>
      <ListBookBorrows data={data} />
    </UserContainer>
  );
}
