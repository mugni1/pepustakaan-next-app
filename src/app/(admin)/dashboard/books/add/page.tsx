"use client";
import { NotifyError } from "@/components/Notify";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categoeyID, setCategoryID] = useState("0");
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
        title,
        writer,
        publisher,
        publication_date: publicationDate,
        stock,
        category_id: categoeyID,
        description,
        image,
      },
    })
      .then((res) => {})
      .catch((err) => {})
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Penulis Buku"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
          />
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Penerbit Buku"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
          <input
            type="number"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <input
            type="date"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Tahun Terbit"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
          />
          <select
            name="category"
            id="category"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            value={categoeyID}
            onChange={(e) => setCategoryID(e.target.value)}
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
            onChange={(e) => {
              const file = e.target?.files?.[0];
              if (file) setImage(file);
            }}
            required
          />
          <textarea
            className="col-span-2 py-1 px-2 outline-purple-600 border border-slate-400 rounded-md"
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
