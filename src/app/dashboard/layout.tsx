"use client";
import Sidebar from "@/components/Admin/Sidebar";
import TimeNow from "@/components/Admin/Time";
import { SidebarSimple } from "@phosphor-icons/react";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebar, setSidebar] = useState(false);

  const token = Cookies.get("auth_token");
  const router = useRouter();

  // VALIDASI TERLEBIH DAHULU
  useEffect(() => {
    axios({
      method: "get",
      url: process.env.NEXT_PUBLIC_BASE_API_URL + "/profile",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        const roleID = res.data.data.roles.id;
        if (roleID != 1) {
          router.push("/");
        }
      })
      .catch((err) => {
        if (err.response?.status == 401) {
          router.push("/login");
          Cookies.remove("auth_token");
          Cookies.remove("email");
          Cookies.remove("fullName");
          Cookies.remove("roleName");
          Cookies.remove("username");
        }
      });
  }, [router, token]);

  return (
    <main className="w-full flex">
      {/* SIDE BAR  */}
      <Sidebar className={sidebar ? "visible w-2/12 " : "invisible  w-0 "} />
      {/* END SIDE BAR  */}

      {/* CONTAINER MAIN CONTENT AND NAVBAR  */}
      <section
        className={`${
          sidebar ? "w-10/12" : "w-full"
        } ms-auto min-h-screen bg-slate-100 transition-all ease-in-out duration-100 overflow-x-hidden`}
      >
        {/* NAVBAR  */}
        <nav
          className={`h-16 bg-white border-b border-slate-200 transition-all ease-in-out duration-100 flex items-center justify-between px-5 fixed z-50 ${
            sidebar ? "w-10/12" : "w-full"
          }`}
        >
          {/* btn sidebar  */}
          <button
            className={`cursor-pointer ${sidebar ? "text-purple-600" : ""}`}
            onClick={() => setSidebar(!sidebar)}
          >
            <SidebarSimple size={28} />
          </button>
          {/* end btn side bar */}

          {/* clock real time  */}
          <TimeNow />
          {/* end clock real time  */}
        </nav>
        {/* END NAVBAR  */}

        {/* MAIN CONTENT  */}
        {children}
        {/* END MAIN CONTENT */}
      </section>
      {/* END CONTAINER MAIN CONTENT AND NAVBAR  */}
    </main>
  );
}
