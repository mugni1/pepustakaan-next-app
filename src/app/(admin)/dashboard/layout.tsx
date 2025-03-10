"use client";
import Sidebar from "@/components/Sidebar";
import { SidebarSimple } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebar, setSidebar] = useState(false);
  return (
    <main className="w-full flex">
      <Sidebar className={sidebar ? "visible w-2/12 " : "invisible  w-0 "} />
      <section
        className={`${
          sidebar ? "w-10/12" : "w-full"
        } ms-auto min-h-screen bg-slate-200 transition-all ease-in-out duration-100 overflow-x-hidden`}
      >
        <nav className="w-full h-16 bg-white flex items-center px-5">
          <button
            className={`cursor-pointer ${sidebar ? "text-purple-600" : ""}`}
            onClick={() => setSidebar(!sidebar)}
          >
            <SidebarSimple size={28} />
          </button>
        </nav>
        {children}
      </section>
    </main>
  );
}
