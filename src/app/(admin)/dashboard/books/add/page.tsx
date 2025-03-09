"use client";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import swal from "sweetalert";

export default function Page() {
  const title = useRef<HTMLInputElement>(null);
  const writer = useRef<HTMLInputElement>(null);
  const publisher = useRef<HTMLInputElement>(null);
  const publicationDate = useRef<HTMLInputElement>(null);
  const stock = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const categoeyID = useRef<HTMLSelectElement>(null);

  const [btnLoading, setBtnLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBtnLoading(true);
    axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BASE_API_URL + "/books",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
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
          text: "Buku berhasil di tambahkan",
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

  return (
    <main className="p-5 w-full overflow-x-hidden">
      <section className=" w-4/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col">
        <h1 className=" w-full text-center font-bold text-2xl">
          Tambah Buku Baru
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full grid grid-cols-2 gap-5"
        >
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
          >
            <option value="0" className="text-slate-400" disabled>
              - Pilih Kategori -
            </option>
            <option value="1">Satu</option>
            <option value="2">Dua</option>
          </select>
          <input
            type="file"
            accept=".jpeg,.jpg,.png,.jfif,.avif,.webp"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md col-span-2"
            ref={image}
            required
          />
          <textarea
            className="col-span-2 py-1 px-2 outline-purple-600 border border-slate-400 rounded-md"
            rows={8}
            placeholder="Deskripsi Buku"
            ref={description}
            required
          ></textarea>
          <div className=" flex gap-5 items-center">
            <button className=" bg-gradient-to-br from-fuchsia-500 to-purple-600 py-1 px-5 rounded-md shadow-md font-bold text-white text-lg">
              {btnLoading ? "Loading..." : "Submit"}
            </button>
            <Link
              href={"/dashboard/books"}
              className=" bg-sky-600 py-1 px-5 rounded-md shadow-md font-bold text-white text-lg"
            >
              Back
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
