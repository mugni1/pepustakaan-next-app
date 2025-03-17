import ListBooks from "@/components/utilities/ListBooks";
import NavigationBar from "@/components/utilities/NavigationBar";
import SubTitle from "@/components/utilities/SubTitle";
import { getBooks } from "@/services";

export default async function Home() {
  const { data } = await getBooks();

  return (
    <main className="w-full">
      <section className="mx-auto container px-5 flex flex-col gap-3 py-5">
        <SubTitle>Terbaru</SubTitle>
        <ListBooks books={data} />
      </section>

      <NavigationBar />
    </main>
  );
}
