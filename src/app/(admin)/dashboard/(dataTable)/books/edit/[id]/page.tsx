import MainContainer from "@/components/Admin/MainContainer";
import Container from "@/components/Admin/Container";
import TitleForm from "@/components/Admin/Title/TitleForm";
import FormEdit from "./FormEdit";
import { getBooksDetail, getCategorys, getCategorysDetail } from "@/services";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBooksDetail(id);
  const categories = await getCategorys();
  return (
    <MainContainer>
      <Container className=" w-4/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col ">
        <div className="flex flex-col">
          <TitleForm>
            <span>Edit Buku</span>
          </TitleForm>
        </div>
        <FormEdit categories={categories.data} book={book.data} />
      </Container>
    </MainContainer>
  );
}
