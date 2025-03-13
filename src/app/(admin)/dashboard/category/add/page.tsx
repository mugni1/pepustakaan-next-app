"use client";
import BtnHref from "@/components/BtnHref";
import swal from "sweetalert";
import axios from "axios";
import { useRef, useState } from "react";
import { PaperPlaneRight, SpinnerGap, Trash } from "@phosphor-icons/react";
import FormTitle from "@/components/FormTitle";
export default function Page() {
  const name = useRef<HTMLInputElement>(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  function handleSubmit() {
    event?.preventDefault();
    setLoadingBtn(true);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      data: {
        name: name.current?.value,
      },
    })
      .then((res) => {
        console.log(name.current?.value);
        swal({
          icon: "success",
          title: "Success!",
          text: "Kategori berhasil di tambahkan",
        });
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: "ERROR",
          text: "Please try again",
        });
      })
      .finally(() => {
        setLoadingBtn(false);
      });
  }
  return (
    <main className="w-full p-5">
      <section className=" w-3/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col">
        <FormTitle>Tambah Kategori</FormTitle>
        <form
          onSubmit={() => handleSubmit()}
          className="w-full flex flex-col gap-5"
        >
          {/* input name  */}
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Judul Kategori"
            ref={name}
            required
          />
          {/* end input title  */}
          {/* btn back and submit  */}
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
          {/* end btn back and submit  */}
        </form>
      </section>
    </main>
  );
}
