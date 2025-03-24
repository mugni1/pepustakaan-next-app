import CategoryList from "@/components/Admin/CategoryList";
import { getCategorys } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Categorys",
};

export default async function Page() {
  const categories = await getCategorys();
  return <CategoryList datas={categories.data} />;
}
