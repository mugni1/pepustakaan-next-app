"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import { SpinnerGap } from "@phosphor-icons/react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Cookies from "js-cookie";

export default function Page() {
  //token
  const token = Cookies.get("auth_token");
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
        Authorization: `Bearer ${token}`,
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
      .catch(() => {
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
  }, [id]);

  // render
  return (
    <MainContainer>
      <section className=" w-3/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col">
        <TitleForm>Edit Kategori</TitleForm>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* input name  */}
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md"
            placeholder="Nama Kategori"
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
            required
          />
          {/* end input name  */}

          {/* btn back and submit  */}
          <div className=" flex gap-5 items-center ">
            <BtnClick className=" bg-gradient-to-br from-fuchsia-500 to-purple-600 py-1 px-5">
              {loadingBtn ? (
                <SpinnerGap className="animate-spin" size={24} />
              ) : (
                <span>Kirim</span>
              )}
            </BtnClick>
            <BtnHref
              className="bg-sky-500 text-white"
              href="/dashboard/category"
            >
              Kembali
            </BtnHref>
          </div>
          {/* end btn back and submit  */}
        </form>
      </section>
    </MainContainer>
  );
}
