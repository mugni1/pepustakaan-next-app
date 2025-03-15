"use client";
import TableHead from "./TableHead";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import {
  MagnifyingGlass,
  Pencil,
  SpinnerGap,
  Trash,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import MainContainer from "../Admin/MainContainer";
import Container from "../Admin/Container";
import BtnHref from "../Admin/Button/BtnHref";

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
      text: "Apakah kamu yakin ingin menghapus?",
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
          </tbody>
          {/* end tbody  */}
        </table>
      </Container>
      {/* end table  */}
    </MainContainer>
  );
}
