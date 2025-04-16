"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import { FileImage, SpinnerGap } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { IoSaveSharp } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";

interface Category {
  id: number;
  name: string;
}
export default function FormAdd() {
  //token
  const token = Cookies.get("auth_token");

  const title = useRef<HTMLInputElement>(null);
  const writer = useRef<HTMLInputElement>(null);
  const publisher = useRef<HTMLInputElement>(null);
  const publicationDate = useRef<HTMLInputElement>(null);
  const stock = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const categoeyID = useRef<HTMLSelectElement>(null);

  const [btnLoading, setBtnLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBtnLoading(true);
    axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BASE_API_URL + "/books",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      data: {
        title: title.current?.value,
        writer: writer.current?.value,
        publisher: publisher.current?.value,
        publication_date: publicationDate.current?.value,
        stock: stock.current?.value,
        category_id: categoeyID.current?.value,
        description: description.current?.value,
        image: image.current?.files?.[0],
      },
    })
      .then((res) => {
        swal({
          title: "Success!",
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
        });
      })
      .finally(() => {
        setBtnLoading(false);
      });
  }

  // unMount
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
    }).then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {/* input  */}
      <section className="w-full grid grid-cols-2 gap-5 mb-5">
        <input
          type="text"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          placeholder="Judul Buku"
          ref={title}
          required
        />
        <input
          type="text"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          placeholder="Penulis Buku"
          ref={writer}
          required
        />
        <input
          type="text"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          placeholder="Penerbit Buku"
          ref={publisher}
          required
        />
        <input
          type="number"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          placeholder="Stock"
          ref={stock}
          required
        />
        <input
          type="date"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          placeholder="Tahun Terbit"
          ref={publicationDate}
          required
        />
        <select
          name="category"
          id="category"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          ref={categoeyID}
          required
          defaultValue={"no-select"}
        >
          <option value="no-select" className="text-slate-400" disabled>
            - Pilih Kategori -
          </option>
          {categories?.map((category: Category, index: number) => (
            <option key={index + category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="flex flex-col col-span-2 gap-1">
          <span className=" flex gap-1 items-center font-semibold">
            <FileImage size={24} />
            <label htmlFor="cover">Gambar Buku</label>
          </span>
          <input
            id="cover"
            type="file"
            accept=".jpeg,.jpg,.png,.jfif,.avif,.webp"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md w-full"
            ref={image}
            required
          />
        </div>
        <textarea
          className="col-span-2 py-1 px-2 outline-purple-600 border border-slate-400 rounded-md"
          rows={8}
          placeholder="Deskripsi Buku"
          ref={description}
          required
        ></textarea>
      </section>
      {/* end input  */}
      {/* btn  */}
      <section className="w-full flex gap-5 items-stretch">
        <BtnClick
          typeBtn="submit"
          className="bg-green-500 flex items-center gap-1"
        >
          {btnLoading ? (
            <SpinnerGap className="animate-spin" size={24} />
          ) : (
            <>
              <IoSaveSharp size={20} />
              <span>Simpan</span>
            </>
          )}
        </BtnClick>
        <BtnHref href="/dashboard/books" className="bg-sky-500 text-white">
          <RiArrowGoBackFill size={20} /> Back
        </BtnHref>
      </section>
      {/* end btn  */}
    </form>
  );
}
