import BookDetails from "@/components/Admin/BookDetail";
import BtnHref from "@/components/Admin/Button/BtnHref";
import Container from "@/components/Admin/Container";
import InformationTransaction from "@/components/Admin/InformationTransaction";
import InformationUser from "@/components/Admin/InformationUser";
import MainContainer from "@/components/Admin/MainContainer";
import { getTransactionDetails } from "@/services";
import DeleteAndReturnBtn from "./DeleteAndReturnBtn";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getTransactionDetails(id);
  return (
    <MainContainer>
      <div className="mb-5 flex gap-5 justify-between">
        <BtnHref href="/dashboard/transaction-borrow/">Kembali</BtnHref>
        <DeleteAndReturnBtn id={data.id} />
      </div>
      <Container>
        <InformationTransaction
          id={data.id}
          borrow_date={data.borrow_date}
          return_date={data.return_date}
          actual_return_date={data.actual_return_date}
          daily_fine={data.daily_fine}
          status={data.status}
        />
        <hr />
        <BookDetails
          image={data.book.image}
          title={data.book.title}
          writer={data.book.writer}
          publisher={data.book.publisher}
          publication_date={data.book.publication_date}
          category={data.book.category.name}
          stock={data.book.stock}
          description={data.book.description}
        />
        <hr />
        <InformationUser
          full_name={data.user?.full_name ?? "-"}
          username={data.user?.username ?? "-"}
          email={data.user?.email ?? "-"}
        />
      </Container>
    </MainContainer>
  );
}
