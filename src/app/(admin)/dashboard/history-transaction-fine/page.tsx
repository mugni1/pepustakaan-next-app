import MainContainer from "@/components/Admin/MainContainer";
import HistoryTransactionsList from "@/components/HistoryTransactionList";
import { getHistoryTransactionsFine } from "@/services";

export default async function Page() {
  const { data } = await getHistoryTransactionsFine();
  return <HistoryTransactionsList datas={data} />;
}
