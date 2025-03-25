import BookDetails from "@/components/Admin/BookDetail";
import Container from "@/components/Admin/Container";
import InformationTransaction from "@/components/Admin/InformationTransaction";
import InformationUser from "@/components/Admin/InformationUser";
import MainContainer from "@/components/Admin/MainContainer";
import { getTransactionDetails } from "@/services";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // result transaction details
  const { data } = await getTransactionDetails(id);

  return (
    <MainContainer>
      <Container>
        {/* informasi  */}
        <InformationTransaction
          id={data.id}
          borrow_date={data.borrow_date}
          return_date={data.return_date}
          actual_return_date={data.actual_return_date}
          daily_fine={data.daily_fine}
          status={data.status}
        />
        {/* end informasi  */}
        <hr />
        {/* book  */}
        <BookDetails
          image={data.book.image}
          title={data.book.title}
          writer={data.book.writer}
          category={data.book.category.name}
          publisher={data.book.publisher}
          stock={data.book.stock}
          publication_date={data.book.publication_date}
          description={data.book.description}
        />
        {/* end book  */}
        <hr />
        {/* user detil  */}
        <InformationUser
          full_name={data.user.full_name}
          username={data.user.username}
          email={data.user.email}
          role={data.user.roles.name}
        />
        {/* end user detail  */}
      </Container>
    </MainContainer>
  );
}
