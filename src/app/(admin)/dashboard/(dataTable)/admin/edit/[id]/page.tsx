import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import { Metadata } from "next";
import FormEdit from "./FormUpdate";
import { getUserDetail } from "@/services";
import { User } from "@/_types/User";

export const metadata: Metadata = {
  title: "Dashboard - Edit Member",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data }: { data: User } = await getUserDetail(id);

  return (
    <MainContainer>
      <Container className="w-6/12 mx-auto my-auto flex flex-col gap-5">
        <TitleForm>Edit `{data.username}` member</TitleForm>
        <FormEdit member={data} />
      </Container>
    </MainContainer>
  );
}
