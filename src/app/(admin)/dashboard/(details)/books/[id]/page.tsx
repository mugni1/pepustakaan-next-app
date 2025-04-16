import BookDetails from "@/components/Admin/BookDetail";
import BtnHref from "@/components/Admin/Button/BtnHref";
import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import { getBooksDetail } from "@/services";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getBooksDetail(id);
  return (
    <MainContainer>
      <BtnHref
        href="/dashboard/books"
        className="w-fit bg-gradient-to-br from-fuchsia-500 to-purple-500 text-white mb-5"
      >
        Back
      </BtnHref>
      <Container className="py-1">
        <BookDetails
          image={data.image}
          title={data.title}
          writer={data.writer}
          category={data.category.name}
          stock={data.stock}
          publisher={data.publisher}
          publication_date={data.publication_date}
          description={data.description}
        />
      </Container>
    </MainContainer>
  );
}
