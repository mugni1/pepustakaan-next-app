"use client";
import Sidebar from "@/components/Admin/Sidebar";
import TimeNow from "@/components/Admin/Time";
import { SidebarSimple } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebar, setSidebar] = useState(false);

  // // VALIDASI TERLEBIH DAHULU
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: process.env.NEXT_PUBLIC_BASE_API_URL + "/profile",
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((res) => {
  //       const roleID = res.data.data.roles.id;
  //       if (roleID != 1) {
  //         router.push("/");
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response?.status == 401) {
  //         router.push("/login");
  //         Cookies.remove("auth_token");
  //         Cookies.remove("email");
  //         Cookies.remove("fullName");
  //         Cookies.remove("roleName");
  //         Cookies.remove("username");
  //       }
  //     });
  // }, [router, token]);

  return (
    <main className="w-full flex font-gabarito">
      {/* SIDE BAR  */}
      <Sidebar
        className={
          sidebar ? "visible w-2/12 opacity-100" : "invisible  w-0 opacity-0"
        }
      />
      {/* END SIDE BAR  */}

      {/* CONTAINER MAIN CONTENT AND NAVBAR  */}
      <section
        className={`${
          sidebar ? "w-10/12" : "w-full"
        } ms-auto min-h-screen bg-background2 transition-all ease-in-out duration-300 overflow-x-hidden`}
      >
        <nav
          className={`h-16 bg-background1 border-b border-slate-200 transition-all ease-in-out duration-100 flex items-center justify-between px-5 fixed z-50 ${
            sidebar ? "w-10/12" : "w-full"
          }`}
        >
          {/* btn sidebar  */}
          <button
            className={`cursor-pointer ${sidebar ? "text-accent2" : ""}`}
            onClick={() => setSidebar(!sidebar)}
          >
            <SidebarSimple size={28} />
          </button>
          {/* clock real time  */}
          <TimeNow />
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
