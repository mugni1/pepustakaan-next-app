import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import FormAdd from "./FormAdd";
import { Metadata } from "next";
import { getBooksTitleStock, getMemberUsername } from "@/services";

export const metadata: Metadata = {
  title: "Dashboard - Borrow Book",
};

export default async function Page() {
  const books = await getBooksTitleStock();
  const members = await getMemberUsername();
  return (
    <MainContainer>
      <Container className="w-8/12 mx-auto flex flex-col gap-5">
        <TitleForm>Tambah Peminjaman</TitleForm>
        <FormAdd books={books.data} members={members.data} />
      </Container>
    </MainContainer>
  );
}
