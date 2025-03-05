"use client";
import Column1 from "@/components/login/Column1";
import Title from "@/components/Title";
import { BtnPrimary } from "../Button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainContentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogoutAll, setIsLogoutAll] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const urlLogin: string = "http://localhost:8000/api/login";
  const urlLoginLogout: string = "http://localhost:8000/api/login-logout";

  const handleSubmit = () => {
    event?.preventDefault();
    axios({
      method: "post",
      url: isLogoutAll ? urlLoginLogout : urlLogin,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsNotify(true);
      });
  };

  useEffect(() => {
    setIsNotify(true);
    setTimeout(() => {
      setIsNotify(false);
    }, 3000);
  }, [isNotify]);

  useEffect(() => {
    setIsNotify(false);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-wrap overflow-hidden relative">
      <div
        className={`py-2 px-5 rounded-lg border absolute top-10 right-10 w-60 text-red-400 transition-all duration-500 ease-in-out ${
          isNotify ? "visible translate-x-0" : "invisible translate-x-80"
        }`}
      >
        <h4 className="font-semibold"> Warning</h4>
        <p className="text-xs">{errorMessage}</p>
      </div>
      {/* column 1  */}
      <Column1 />
      {/* end column 1  */}
      {/* column 2  */}
      <div className=" w-4/12 min-h-screen flex items-center justify-center">
        <div className="w-full md:w-10/12 xl:w-8/12 2xl:w-1/2 mx-auto rounded-xl shadow-lg p-5 flex flex-col gap-5">
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
            <input
              type="password"
              placeholder="Password"
              className="py-1 px-3 rounded-xl border w-full border-slate-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
            <BtnPrimary click={() => {}}>Sign in</BtnPrimary>
          </form>
        </div>
      </div>
      {/* end column 2  */}
    </section>
  );
}
