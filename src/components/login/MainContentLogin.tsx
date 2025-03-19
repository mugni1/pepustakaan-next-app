"use client";
import Column1 from "@/components/login/Column1";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TitleForm from "../Admin/Title/TitleForm";
import BtnClick from "../Admin/Button/BtnClick";
import { Eye, EyeSlash, SpinnerGap } from "@phosphor-icons/react";
import swal from "sweetalert";
import Cookies from "js-cookie";

const urlLogin: string = "http://localhost:8000/api/login";
const urlLoginLogout: string = "http://localhost:8000/api/login-logout";

export default function MainContentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isLogoutAll, setIsLogoutAll] = useState(false);

  const router = useRouter();

  // HANDLE SUBMIT
  const handleSubmit = () => {
    event?.preventDefault();
    setLoadingBtn(true);
    axios({
      method: "post",
      url: isLogoutAll ? urlLoginLogout : urlLogin,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        swal({
          icon: "success",
          title: "Success!",
          text: "Login Success",
          timer: 1000,
          buttons: [false],
        });
        // set info ke cookie
        const { token } = res.data;
        const email = res.data.data.email;
        const fullName = res.data.data.full_name;
        const roles = res.data.data.roles.name;
        const username = res.data.data.username;
        Cookies.set("auth_token", token, {
          expires: 30, // 17hari
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("email", email, {
          expires: 30, // 17hari
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("username", username, {
          expires: 30, // 17hari
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("fullName", fullName, {
          expires: 30, // 17hari
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("roleName", roles, {
          expires: 30, // 17hari
          secure: true,
          sameSite: "Strict",
        });

        //redirect ke dashboard
        setTimeout(() => {
          if (roles == "superUser") {
            router.push("/dashboard/home");
          } else {
            router.push("/");
          }
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        swal({
          icon: "error",
          title: "Error!",
          text: err.response?.data?.message || "Terjadi kesalahan",
        });
      })
      .finally(() => {
        setLoadingBtn(false);
      });
  };

  return (
    <section className="flex w-full min-h-screen  flex-wrap overflow-hidden relative px-5 md:px-0  bg-gradient-to-br from-fuchsia-500 to-purple-500 ">
      {/* column 1  */}
      <Column1 />
      {/* end column 1  */}
      {/* column 2  */}
      <div className="w-full md:w-4/12 min-h-screen flex items-center justify-center">
        <div className="w-full md:w-10/12 xl:w-8/12 2xl:w-1/2 mx-auto rounded-xl shadow-lg p-5 flex flex-col gap-5 bg-white">
          <TitleForm>SIGN IN</TitleForm>
          <form
            onSubmit={handleSubmit}
            action=""
            className="w-full flex flex-col gap-3"
          >
            <input
              type="email"
              placeholder="Email"
              className="py-1 px-3 rounded-lg border w-full border-slate-600 outline-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className=" w-auto h-fit relative flex items-center">
              <input
                type={isPassword ? "password" : "text"}
                placeholder="Password"
                className="py-1 px-3 rounded-lg border w-full border-slate-600 outline-purple-500 pe-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setIsPassword(!isPassword)}
                className="absolute right-2 h-full flex items-center cursor-pointer"
              >
                {isPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
              </span>
            </div>
            <div className="w-full flex items-center gap-1">
              <input
                type="checkbox"
                id="logout"
                checked={isLogoutAll}
                onChange={() => setIsLogoutAll(!isLogoutAll)}
              />
              <label htmlFor="logout" className="text-sm">
                Logout dari semua perangkat
              </label>
            </div>
            <BtnClick className="bg-gradient-to-r from-fuchsia-500 to-purple-500 flex justify-center text-center">
              {loadingBtn ? (
                <SpinnerGap className="animate-spin" size={24} />
              ) : (
                "Sign In"
              )}
            </BtnClick>
          </form>
          <Link className="w-full text-center text-sm text-purple-600" href="/">
            Back to home
          </Link>
        </div>
      </div>
      {/* end column 2  */}
    </section>
  );
}
