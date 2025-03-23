"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { MagnifyingGlass, Pencil, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import MainContainer from "../Admin/MainContainer";
import Container from "../Admin/Container";
import BtnHref from "../Admin/Button/BtnHref";
import Cookies from "js-cookie";

interface Props {
  id: number;
  name: string;
}
export default function CategoryList({ datas }: { datas: Props[] }) {
  //token
  const token = Cookies.get("auth_token");
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
  }, [keyword,datas]);

  function handleDelete(id: number) {
    swal({
      icon: "warning",
      dangerMode: true,
      title: "Warning",
      text: "Apakah kamu yakin ingin menghapus?",
      buttons: ["Cancel", "OK"],
    }).then((isTrue) => {
      if (isTrue) {
        axios({
          method: "delete",
          url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
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
          });
      }
    });
  }

  return (
    <MainContainer>
      {/* btn href adn search */}
      <section className="w-full flex items-center justify-between mb-5">
        <BtnHref href="category/add">Tambah Kategori</BtnHref>
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
              <th className="py-2 mb-2 w-1/12">No</th>
              <th>Nama</th>
              <th className="w-1/12" colSpan={2}>
                Aciton
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
                <td className="text-center w-2/12 font-semibold">
                  {index + 1}
                </td>
                <td className="text-center font-semibold">{category.name}</td>
                <td className="text-center p-2">
                  <button
                    onClick={() => router.push(`category/edit/${category.id}`)}
                    className=" p-2 rounded-full bg-amber-500 text-white cursor-pointer"
                  >
                    <Pencil size={24} />
                  </button>
                </td>
                <td className="text-center p-2">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className=" p-2 rounded-full bg-red-500 text-white cursor-pointer"
                  >
                    <Trash size={24} />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length <= 0 && (
              <tr className="border-b border-slate-400">
                <td
                  colSpan={4}
                  className="text-center text-red-500 poppins-bold py-5"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
          {/* end tbody  */}
        </table>
      </Container>
      {/* end table  */}
    </MainContainer>
  );
}
