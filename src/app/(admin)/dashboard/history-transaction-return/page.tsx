import MainContainer from "@/components/Admin/MainContainer";
import HistoryTransactionsList from "@/components/HistoryTransactionList";
import { getHistoryTransactionsReturn } from "@/services";

export default async function Page() {
  const { data } = await getHistoryTransactionsReturn();
  return <HistoryTransactionsList datas={data} />;
}
