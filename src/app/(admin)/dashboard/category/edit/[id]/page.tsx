"use client";
import BtnHref from "@/components/BtnHref";
import FormTitle from "@/components/FormTitle";
import { SpinnerGap } from "@phosphor-icons/react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function Page() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();

  // handle submit
  const handleSubmit = () => {
    event?.preventDefault();
    setLoadingBtn(true);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      data: {
        name,
        _method: "put",
      },
    })
      .then((res) => {
        swal({
          icon: "success",
          title: "Success!",
          text: res.data.message,
          buttons: ["Tutup", "Kembali"],
        }).then((isTrue) => {
          if (isTrue) {
            router.push("/dashboard/category");
          }
        });
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: "Error",
          text: "Please try again later!",
        });
      })
      .finally(() => {
        setLoadingBtn(false);
      });
  };

  // unMount
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`,
    }).then((res) => setName(res.data?.data.name || ""));
  }, []);

  // render
  return (
    <main className="w-full p-5">
      <section className=" w-3/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col">
        <FormTitle>Edit Kategori</FormTitle>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* input name  */}
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Nama Kategori"
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
            required
          />
          {/* end input name  */}

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
