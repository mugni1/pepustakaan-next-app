import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import FormAdd from "./FormAdd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Add Book",
};

export default function Page() {
  return (
    <MainContainer>
      <Container className="w-8/12 mx-auto flex flex-col gap-5">
        <TitleForm>Tambah Buku Baru</TitleForm>
        <FormAdd />
      </Container>
    </MainContainer>
  );
}
