import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import FormAdd from "./FormAdd";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Dashboard - Create Category",
// };

export default function Page() {
  return (
    <MainContainer>
      <section className=" w-3/6 mx-auto bg-background1 rounded-xl p-5 gap-5 flex flex-col shadow-lg">
        <TitleForm>Tambah Kategori</TitleForm>
        <FormAdd />
      </section>
    </MainContainer>
  );
}
