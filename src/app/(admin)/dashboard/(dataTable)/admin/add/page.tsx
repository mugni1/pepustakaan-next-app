import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import FormAdd from "./FormAdd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Create Admin",
};

export default function Page() {
  return (
    <MainContainer>
      <Container className="w-6/12 mx-auto my-auto flex flex-col gap-5">
        <TitleForm>Tambah Admin</TitleForm>
        <FormAdd />
      </Container>
    </MainContainer>
  );
}
