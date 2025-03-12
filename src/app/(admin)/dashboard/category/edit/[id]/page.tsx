"use client";
import BtnHref from "@/components/BtnHref";
import { SpinnerGap } from "@phosphor-icons/react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  function handleSubmit(id: number) {
    event?.preventDefault();
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      data: {
        name: name,
      },
    });
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`,
    }).then((res) => setName(res.data?.data.name || ""));
  }, []);
  return (
    <main className="w-full p-5">
      <section className=" w-3/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col">
        <h1 className=" w-full text-center font-bold text-2xl">
          Edit Kategori
        </h1>
        <form
          onSubmit={() => handleSubmit()}
          className="w-full flex flex-col gap-5"
        >
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Judul Buku"
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
            required
          />
          <div className=" flex gap-5 items-center ">
            <button
              type="submit"
              className=" bg-gradient-to-br from-fuchsia-500 to-purple-600 py-1 px-5 rounded-md shadow-md font-bold text-white text-lg cursor-pointer"
            >
              {loadingBtn ? (
                <SpinnerGap className="animate-spin" size={28} />
              ) : (
                <span>Kirim</span>
              )}
            </button>
            <BtnHref href="/dashboard/category">Kembali</BtnHref>
          </div>
        </form>
      </section>
    </main>
  );
}
