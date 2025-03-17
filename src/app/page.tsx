import UserContainer from "@/components/utilities/Container/UserContainer";
import ListBooks from "@/components/utilities/ListBooks";
import NavigationBar from "@/components/utilities/NavigationBar";
import SubTitle from "@/components/utilities/SubTitle";
import { getBooks } from "@/services";

export default async function Home() {
  const { data } = await getBooks();

  return (
    <UserContainer>
      <section className=" px-5 flex flex-col gap-3 py-5">
        <SubTitle>Terbaru</SubTitle>
        <ListBooks books={data} />
      </section>
    </UserContainer>
  );
}
