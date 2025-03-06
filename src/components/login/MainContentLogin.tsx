"use client";
import Column1 from "@/components/login/Column1";
import Title from "@/components/Title";
import { BtnPrimary } from "../Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { NotifyError } from "../Notify";

export default function MainContentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogoutAll, setIsLogoutAll] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

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
    <section className="flex w-full min-h-screen  flex-wrap overflow-hidden relative px-5 md:px-0">
      <NotifyError
        isNotify={isNotify}
        message={message}
        statusCode={statusCode}
      />
      {/* column 1  */}
      <Column1 />
      {/* end column 1  */}
      {/* column 2  */}
      <div className="w-full md:w-4/12 min-h-screen flex items-center justify-center ">
        <div className="w-full md:w-10/12 xl:w-8/12 2xl:w-1/2 mx-auto rounded-xl shadow-lg p-5 flex flex-col gap-5 border border-slate-500">
          <Title>SIGN IN</Title>
          <form
            onSubmit={handleSubmit}
            action=""
            className="w-full flex flex-col gap-3"
          >
            <input
              type="email"
              placeholder="Email"
              className="py-1 px-3 rounded-xl border w-full border-slate-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className=" w-auto h-fit relative flex items-center">
              <input
                type={isPassword ? "password" : "text"}
                placeholder="Password"
                className="py-1 px-3 rounded-xl border w-full border-slate-600 pe-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setIsPassword(!isPassword)}
                className="absolute right-2 h-full flex items-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
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
            <BtnPrimary click={() => {}}>
              {loadingBtn ? "Loading..." : "Sign In"}
            </BtnPrimary>
          </form>
        </div>
      </div>
      {/* end column 2  */}
    </section>
  );
}
