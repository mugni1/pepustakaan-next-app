import MainContainer from "@/components/Admin/MainContainer";
import HistoryTransactionsList from "@/components/HistoryTransactionList";
import { getHistoryTransactionsBorrow } from "@/services";

export default async function Page() {
  const { data } = await getHistoryTransactionsBorrow();
  return <HistoryTransactionsList datas={data} />;
}
