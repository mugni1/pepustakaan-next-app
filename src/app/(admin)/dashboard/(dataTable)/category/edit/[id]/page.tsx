import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import FormEdit from "./FormEdit";
import { getCategorysDetail } from "@/services";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const { data } = await getCategorysDetail(id);
  return (
    <MainContainer>
      <section className=" w-3/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col">
        <TitleForm>Edit Kategori</TitleForm>
        <FormEdit id={data.id} name={data.name} />
      </section>
    </MainContainer>
  );
}
