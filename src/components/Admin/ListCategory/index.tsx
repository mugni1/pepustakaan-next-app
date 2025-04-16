"use client";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { MagnifyingGlass, Pencil, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import MainContainer from "../MainContainer";
import Container from "../Container";
import BtnHref from "../Button/BtnHref";
import Cookies from "js-cookie";
import { LuTag } from "react-icons/lu";
import { toast } from "react-toastify";
import { deleteCategory } from "@/_actions";
import DataTableNoResult from "@/app/(admin)/_components/DataTableNoResult";

interface Props {
  id: number;
  name: string;
}
export default function CategoryList({ datas }: { datas: Props[] }) {
  const [categories, setCategories] = useState(datas || []);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (keyword.length > 0) {
      setCategories(
        datas.filter((category) =>
          category.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      setCategories(datas);
    }
  }, [keyword, datas]);

  async function handleDeleteCategory(id: number) {
    const res = await deleteCategory(id);
    if (res.status == "warning") {
      toast.warning(res.message);
    }
    if (res?.status == "success") {
      toast.success(res.message);
    }
    if (res?.status == "failed") {
      toast.error(res.message);
    }
  }

  function handleDelete(id: number) {
    swal({
      icon: "warning",
      dangerMode: true,
      title: "Warning",
      text: "Apakah kamu yakin ingin menghapus?",
      buttons: ["Cancel", "OK"],
    }).then((isTrue) => {
      if (isTrue) {
        handleDeleteCategory(id);
      }
    });
  }

  return (
    <MainContainer>
      {/* btn href adn search */}
      <section className="w-full flex items-center justify-between mb-5">
        <BtnHref href="category/add">
          <LuTag size={20} /> Tambah
        </BtnHref>
        <div className="relative h-fit w-auto group text-slate-600">
          <span className="absolute h-full flex items-center px-2">
            <MagnifyingGlass size={20} />
          </span>
          <input
            type="text"
            className="px-2 py-1 border border-slate-400 rounded-md bg-white outline-purple-500 ps-9 shadow-md"
            placeholder="Cari Kategori"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </section>
      {/* end btn href and search*/}
      {/* table  */}
      <Container>
        <table className="w-full">
          {/* thead  */}
          <thead>
            <tr className="border-b border-slate-400 poppins-bold">
              <th className="py-4 mb-2 w-1/12 bg-accent2/10 text-accent2 border">
                No
              </th>
              <th className="bg-accent2/10 text-accent2 border">Nama</th>
              <th
                className="w-1/12 bg-accent2/10 text-accent2 border"
                colSpan={2}
              >
                Tindakan
              </th>
            </tr>
          </thead>
          {/* end thead  */}
          {/* tbody  */}
          <tbody className="w-full">
            {categories?.map((category: Props, index: number) => (
              <tr
                key={index + category.id}
                className="w-full border-b border-slate-400"
              >
                <td className="text-center w-1/12 font-semibold border">
                  {index + 1}
                </td>
                <td className="text-center font-semibold border">
                  {category.name}
                </td>
                <td className="text-center p-2 border">
                  <div className="w-full flex items-center gap-2">
                    <button
                      onClick={() =>
                        router.push(`category/edit/${category.id}`)
                      }
                      className=" p-2 rounded-full bg-amber-500 text-white cursor-pointer"
                    >
                      <Pencil size={24} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className=" p-2 rounded-full bg-red-500 text-white cursor-pointer"
                    >
                      <Trash size={24} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length <= 0 && <DataTableNoResult />}
          </tbody>
          {/* end tbody  */}
        </table>
      </Container>
      {/* end table  */}
    </MainContainer>
  );
}
