import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import { Metadata } from "next";
import FormAdd from "./FormAdd";

export const metadata: Metadata = {
  title: "Dashboard - Create Member",
};

export default function Page() {
  return (
    <MainContainer>
      <Container className="w-6/12 mx-auto my-auto flex flex-col gap-5">
        <TitleForm>Tambah Member</TitleForm>
        <FormAdd />
      </Container>
    </MainContainer>
  );
}
