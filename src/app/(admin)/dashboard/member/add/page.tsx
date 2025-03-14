import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";

export default function Page() {
  return (
    <MainContainer>
      <Container className="w-8/12 mx-auto">
        <TitleForm>Tambah Anggota</TitleForm>
        <form className="w-full">
          <input type="text" />
        </form>
      </Container>
    </MainContainer>
  );
}
