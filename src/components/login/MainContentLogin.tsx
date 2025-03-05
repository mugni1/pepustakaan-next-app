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
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsNotify(true);
        setStatusCode(err.response.status);
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
    <section className="w-full min-h-screen flex flex-wrap overflow-hidden relative">
      <NotifyError
        isNotify={isNotify}
        message={message}
        statusCode={statusCode}
      />
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
