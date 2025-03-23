import HistoryTransactionsList from "@/components/HistoryTransactionList";
import { getHistoryTransactionsFine } from "@/services";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const { data } = await getHistoryTransactionsFine(authToken);
  return <HistoryTransactionsList datas={data} />;
}
