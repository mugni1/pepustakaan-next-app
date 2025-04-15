"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import axios from "axios";
import swal from "sweetalert";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { IoSaveSharp } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Page() {
  const token = Cookies.get("auth_token");
  const fullName = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [isPassword, setIsPassword] = useState(true);

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
        role_id: 1,
      },
    })
      .then((res) => {
        swal({
          icon: "success",
          title: "Success!",
          text: `Berhasil menambah user baru : '${res.data.data.username}'`,
          buttons: [false],
        });
        router.push("/dashboard/admin");
      })
      .catch(() => {
        swal({
          icon: "error",
          title: "Error!",
          text: "Silahkan coba lagi nanti!",
          buttons: [false],
          timer: 2000,
        });
        router.push("/dashboard/admin");
      });
  };

  return (
    <MainContainer>
      <Container className="w-8/12 mx-auto  flex flex-col gap-5">
        <TitleForm>Tambah Admin</TitleForm>
        <form onSubmit={handleSubmit}>
          {/* input  */}
          <section className="w-full grid grid-cols-2 gap-5 mb-5">
            <input
              type="text"
              className="py-1 px-3 rounded-md outline-accent2 border border-foreground/60 w-full"
              placeholder="Nama Lengkap"
              ref={fullName}
              required
            />
            <input
              type="text"
              className="py-1 px-3 rounded-md outline-accent2 border border-foreground/60 w-full"
              placeholder="username"
              maxLength={10}
              ref={username}
              required
            />
            <input
              type="email"
              className="py-1 px-3 rounded-md outline-accent2 border border-foreground/60 w-full"
              placeholder="email"
              ref={email}
              required
            />
            <div className="relative">
              <input
                type={isPassword ? "password" : "text"}
                className="py-1 px-3 rounded-md outline-accent2 border border-foreground/60 w-full"
                placeholder="Password"
                ref={password}
                required
              />
              <span
                onClick={() => setIsPassword(!isPassword)}
                className="absolute top-0 bottom-0 h-full right-2 flex items-center cursor-pointer select-none text-foreground/60"
              >
                {isPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </section>
          {/* end input  */}
          {/* btn  */}
          <section className="w-full flex gap-5 items-stretch">
            <BtnClick
              typeBtn="submit"
              className="bg-green-500 flex items-center gap-1"
            >
              <IoSaveSharp size={20} />
              <span>Simpan</span>
            </BtnClick>
            <BtnHref href="/dashboard/admin" className="bg-sky-500 text-white">
              <RiArrowGoBackFill size={20} /> Back
            </BtnHref>
          </section>
          {/* end btn  */}
        </form>
      </Container>
    </MainContainer>
  );
}
