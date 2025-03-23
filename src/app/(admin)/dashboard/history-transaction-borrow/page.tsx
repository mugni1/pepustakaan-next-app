import HistoryTransactionsList from "@/components/Admin/HistoryTransactionList";
import { getHistoryTransactionsBorrow } from "@/services";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const { data } = await getHistoryTransactionsBorrow(authToken);
  return <HistoryTransactionsList datas={data} />;
}
