"use client";
import Sidebar from "@/components/Sidebar";
import { ReactNode, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebar, setSidebar] = useState(false);
  return (
    <main className="w-full flex">
      <Sidebar className={sidebar ? "visible w-2/12 " : "invisible  w-0 "} />
      <section
        className={`${
          sidebar ? "w-10/12" : "w-full"
        } ms-auto min-h-screen bg-slate-200 transition-all ease-in-out duration-100`}
      >
        <nav className="w-full h-16 bg-white flex items-center px-5">
          <button onClick={() => setSidebar(!sidebar)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
        </nav>
        {children}
      </section>
    </main>
  );
}
