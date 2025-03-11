"use client";
import Link from "next/link";
import TableHead from "./TableHead";
import { useState, useEffect } from "react";
import BtnHref from "../BtnHref";

interface Props {
  id: number;
  name: string;
}
export default function CategoryList({ datas }: { datas: Props[] }) {
  const [categories, setCategories] = useState(datas);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    keyword.length > 0
      ? setCategories(
          datas.filter((category) =>
            category.name.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setCategories(datas);
  }, [keyword]);
  return (
    <div className="w-8/12 mx-auto">
      {/* btn href  */}
      <section className="w-full flex items-center justify-between mb-5">
        <BtnHref
          href="category/add"
          className="bg-gradient-to-r from-fuchsia-500 to-purple-700"
        >
          Add Category
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
          <TableHead />
          <tbody className="w-full">
            {categories.map((category: Props, index: number) => (
              <tr key={index} className="w-full border-b border-slate-400">
                <td className="text-center w-2/12 font-semibold">
                  {index + 1}
                </td>
                <td className="text-center font-semibold">{category.name}</td>
                <td className="text-center p-2 w-1/12">
                  <button className="py-1 px-5 rounded bg-amber-500 text-white font-semibold">
                    <Link href={"categorys/update"}>Edit</Link>
                  </button>
                </td>
                <td className="text-center w-1/12">
                  <button className="py-1 px-5 rounded bg-red-500 text-white font-semibold">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* end table  */}
    </div>
  );
}
