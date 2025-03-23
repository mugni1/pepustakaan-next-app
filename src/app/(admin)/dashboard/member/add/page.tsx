"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import axios from "axios";
import swal from "sweetalert";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Page() {
  const token = Cookies.get("auth_token");
  const fullName = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  // Router
  const router = useRouter();

  // onSubmit
  const handleSubmit = () => {
    event?.preventDefault();
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        full_name: fullName.current?.value,
        username: username.current?.value.toLowerCase(),
        email: email.current?.value,
        password: password.current?.value,
        role_id: 2,
      },
    })
      .then((res) => {
        console.log(res);
        swal({
          icon: "success",
          title: "Success!",
          text: `Berhasil menambah user baru : '${res.data.data.username}'`,
        }).then((isTrue) => {
          if (isTrue) {
            router.push("/dashboard/member");
          }
        });
      })
      .catch(() => {
        swal({
          icon: "error",
          title: "Error!",
          text: "Silahkan coba lagi nanti!",
          buttons: [false],
          timer: 2000,
        });
        setTimeout(() => {
          router.push("/dashboard/member");
        }, 2000);
      });
  };

  return (
    <MainContainer>
      <Container className="w-8/12 mx-auto  flex flex-col gap-5">
        <TitleForm>Tambah Anggota</TitleForm>
        <form onSubmit={handleSubmit}>
          {/* input  */}
          <section className="w-full grid grid-cols-2 gap-5 mb-5">
            <input
              type="text"
              className="py-1 px-3 rounded-lg outline-purple-500 border border-slate-500 w-full"
              placeholder="Nama Lengkap"
              ref={fullName}
              required
            />
            <input
              type="text"
              className="py-1 px-3 rounded-lg outline-purple-500 border border-slate-500 w-full"
              placeholder="username"
              maxLength={10}
              ref={username}
              required
            />
            <input
              type="email"
              className="py-1 px-3 rounded-lg outline-purple-500 border border-slate-500 w-full"
              placeholder="email"
              ref={email}
              required
            />
            <input
              type="password"
              className="py-1 px-3 rounded-lg outline-purple-500 border border-slate-500 w-full"
              placeholder="password"
              ref={password}
              required
            />
          </section>
          {/* end input  */}
          {/* btn  */}
          <section className="w-full flex gap-5">
            <BtnClick typeBtn="submit" className="bg-green-500">
              Submit
            </BtnClick>
            <BtnHref href="/dashboard/member" className="bg-sky-500 text-white">
              Back
            </BtnHref>
          </section>
          {/* end btn  */}
        </form>
      </Container>
    </MainContainer>
  );
}
