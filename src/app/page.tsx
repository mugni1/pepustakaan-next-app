import UserContainer from "@/components/utilities/Container/UserContainer";
import ListBooks from "@/components/utilities/ListBooks";
import { getBooks } from "@/services";

export default async function Home() {
  const { data } = await getBooks();

  return (
    <UserContainer>
      <ListBooks books={data} />
    </UserContainer>
  );
}
