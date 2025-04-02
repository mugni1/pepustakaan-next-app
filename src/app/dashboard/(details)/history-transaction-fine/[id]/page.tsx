import BookDetails from "@/components/Admin/BookDetail";
import BtnHref from "@/components/Admin/Button/BtnHref";
import Container from "@/components/Admin/Container";
import InformationTransaction from "@/components/Admin/InformationTransaction";
import InformationUser from "@/components/Admin/InformationUser";
import MainContainer from "@/components/Admin/MainContainer";
import { getHistoryTransactionDetails } from "@/services";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getHistoryTransactionDetails(id);
  return (
    <MainContainer>
      <div className="mb-5 flex">
        <BtnHref href="/dashboard/history-transaction-fine">Kembali</BtnHref>
      </div>
      <Container>
        <InformationTransaction
          id={data.borrowing.id}
          borrow_date={data.borrowing.borrow_date}
          return_date={data.borrowing.return_date}
          actual_return_date={data.borrowing.actual_return_date}
          daily_fine={data.borrowing.daily_fine}
          status={data.transaction_type}
          amount={data.amount}
        />
        <hr />
        <BookDetails
          image={data.borrowing.book.image}
          title={data.borrowing.book.title}
          writer={data.borrowing.book.writer}
          publisher={data.borrowing.book.publisher}
          publication_date={data.borrowing.book.publication_date}
          category={data.borrowing.book.category.name}
          stock={data.borrowing.book.stock}
          description={data.borrowing.book.description}
        />
        <hr />
        <InformationUser
          full_name={data.borrowing.user?.full_name ?? "-"}
          username={data.borrowing.user?.username ?? "-"}
          email={data.borrowing.user?.email ?? "-"}
        />
      </Container>
    </MainContainer>
  );
}
