import HistoryTransactionsList from "@/components/HistoryTransactionList";
import { getHistoryTransactions } from "@/services";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const { data } = await getHistoryTransactions(authToken);
  return <HistoryTransactionsList datas={data} />;
}
