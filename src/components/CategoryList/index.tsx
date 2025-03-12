"use client";
import TableHead from "./TableHead";
import { useState, useEffect } from "react";
import BtnHref from "../BtnHref";
import axios from "axios";
import swal from "sweetalert";
import { Pencil, SpinnerGap, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  name: string;
}
export default function CategoryList({ datas }: { datas: Props[] }) {
  const [categories, setCategories] = useState(datas);
  const [keyword, setKeyword] = useState("");
  const [loadingBtnDelete, setLoadingBtnDelete] = useState(false);

  const router = useRouter();

  useEffect(() => {
    keyword.length > 0
      ? setCategories(
          datas.filter((category) =>
            category.name.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setCategories(datas);
  }, [keyword]);

  function handleDelete(id: number) {
    setLoadingBtnDelete(true);
    swal({
      icon: "warning",
      dangerMode: true,
      title: "Warning",
      buttons: ["Cancel", "OK"],
    }).then((isTrue) => {
      if (isTrue) {
        axios({
          method: "delete",
          url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        })
          .then((res) => {
            setCategories(categories.filter((category) => category.id != id));
            swal({
              icon: "success",
              title: "success",
              text: res.data.message,
            });
          })
          .catch((err) => {
            swal({
              icon: "error",
              title: "error",
              text: err.response?.data?.message || "Terjadi kesalahan",
            });
          })
          .finally(() => {
            setLoadingBtnDelete(false);
          });
      } else {
        setLoadingBtnDelete(false);
      }
    });
  }
  return (
    <section className="w-8/12 mx-auto">
      {/* btn href  */}
      <section className="w-full flex items-center justify-between mb-5">
        <BtnHref
          href="category/add"
          className="bg-gradient-to-r from-fuchsia-500 to-purple-700"
        >
          Tambah Kategori
        </BtnHref>
        <input
          type="text"
          className="p-2 border border-slate-400 rounded-md bg-white outline-purple-500"
          placeholder="Cari Category"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </section>
      {/* end btn href  */}
      {/* table  */}
      <section className=" w-full p-5 rounded-xl shadow-lg bg-white">
        <table className="w-full">
          {/* thead  */}
          <TableHead />
          {/* end thead  */}
          {/* tbody  */}
          <tbody className="w-full">
            {categories.map((category: Props, index: number) => (
              <tr key={index} className="w-full border-b border-slate-400">
                <td className="text-center w-2/12 font-semibold">
                  {index + 1}
                </td>
                <td className="text-center font-semibold">{category.name}</td>
                <td className="text-center p-2 w-1/12">
                  <button
                    onClick={() => router.push(`category/${category.id}/edit`)}
                    className={`py-1 px-5 rounded-md shadow-md font-bold text-white text-lg bg-amber-500 cursor-pointer`}
                  >
                    <Pencil size={24} />
                  </button>
                </td>
                <td className="text-center p-2 w-1/12">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className={`py-1 px-5 rounded-md shadow-md font-bold text-white text-lg bg-red-500 cursor-pointer`}
                  >
                    {loadingBtnDelete ? (
                      <SpinnerGap className="animate-spin" size={24} />
                    ) : (
                      <Trash size={24} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* end tbody  */}
        </table>
      </section>
      {/* end table  */}
    </section>
  );
}
