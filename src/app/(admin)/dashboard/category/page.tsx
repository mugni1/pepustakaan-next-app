import CategoryList from "@/components/CategoryList";
import { getCategorys } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Categorys",
};
export default async function Page() {
  const categories = await getCategorys();
  return (
    <main className="w-full p-5">
      <CategoryList datas={categories.data} />
    </main>
  );
}
