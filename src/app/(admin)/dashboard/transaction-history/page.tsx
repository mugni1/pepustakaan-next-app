import MainContainer from "@/components/Admin/MainContainer";
import HistoryTransactionsList from "@/components/HistoryTransactionList";
import { getHistoryTransactions } from "@/services";

export default async function Page() {
  const { data } = await getHistoryTransactions();
  return <HistoryTransactionsList datas={data} />;
}
