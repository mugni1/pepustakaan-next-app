"use client";
import Column1 from "@/components/login/Column1";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TitleForm from "../Admin/Title/TitleForm";
import BtnClick from "../Admin/Button/BtnClick";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export default function MainContentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogoutAll, setIsLogoutAll] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

  const router = useRouter();
  const urlLogin: string = "http://localhost:8000/api/login";
  const urlLoginLogout: string = "http://localhost:8000/api/login-logout";

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
        setMessage(res.data.message);
        setIsNotify(true);
        setStatusCode(res.status);
        if (res.data.data.roles.id === 1) {
          router.push("/dashboard/home");
        }
      })
      .catch(() => {
        setMessage("Email atau password yang anda masukan salah");
        setIsNotify(true);
        setStatusCode(500);
      })
      .finally(() => {
        setLoadingBtn(false);
      });
  };

  useEffect(() => {
    setIsNotify(true);
    setTimeout(() => {
      setIsNotify(false);
    }, 1000);
  }, [isNotify]);

  useEffect(() => {
    setIsNotify(false);
  }, []);

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
            <BtnClick className="bg-gradient-to-r from-fuchsia-500 to-purple-500">
              {loadingBtn ? "Loading..." : "Sign In"}
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
