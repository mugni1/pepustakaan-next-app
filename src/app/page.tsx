import UserContainer from "@/components/utilities/Container/UserContainer";
import ListBooks from "@/components/utilities/ListBooks";
import NavigationBar from "@/components/utilities/NavigationBar";
import SubTitle from "@/components/utilities/SubTitle";
import { getBooks } from "@/services";

export default async function Home() {
  const { data } = await getBooks();

  return (
    <UserContainer>
      <ListBooks books={data} />
    </UserContainer>
  );
}
