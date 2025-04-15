"use client";
import swal from "sweetalert";
import axios from "axios";
import { useRef, useState } from "react";
import { SpinnerGap } from "@phosphor-icons/react";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import Cookies from "js-cookie";

export default function Page() {
  //token
  const token = Cookies.get("auth_token");
  const name = useRef<HTMLInputElement>(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  function handleSubmit() {
    event?.preventDefault();
    setLoadingBtn(true);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
      headers: {
        Authorization: `Bearer ${token}`,
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
          text: res.data.message,
        });
      })
      .catch(() => {
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
    <MainContainer>
      <section className=" w-3/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col">
        <TitleForm>Tambah Kategori</TitleForm>
        <form
          onSubmit={() => handleSubmit()}
          className="w-full flex flex-col gap-5"
        >
          {/* input name  */}
          <input
            type="text"
            className="py-1 px-2 outline-accent2 border border-foreground/60 rounded-md"
            placeholder="Judul Kategori"
            ref={name}
            required
          />
          {/* end input title  */}
          {/* btn back and submit  */}
          <div className=" flex gap-5 items-center ">
            <BtnClick className=" bg-green-500 ">
              {loadingBtn ? (
                <SpinnerGap className="animate-spin" size={24} />
              ) : (
                <span>Kirim</span>
              )}
            </BtnClick>
            <BtnHref
              href="/dashboard/category"
              className="bg-sky-500 text-background1"
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
