import MainContainer from "@/components/Admin/MainContainer";
import HistoryTransactionsList from "@/components/HistoryTransactionList";
import { getHistoryTransactionsReturn } from "@/services";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const { data } = await getHistoryTransactionsReturn(authToken);
  return <HistoryTransactionsList datas={data} />;
}
