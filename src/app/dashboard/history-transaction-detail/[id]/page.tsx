import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";

export default async function Page() {
  return (
    <MainContainer>
      <Container>
        <section className="flex flex-col gap-5">
          <TitleForm>Detail Transaksi</TitleForm>
        </section>
      </Container>
    </MainContainer>
  );
}
