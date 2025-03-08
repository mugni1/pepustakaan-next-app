import NavbarAdmin from "@/components/NavbarAdmin";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full flex">
      <Sidebar />
      <section className=" w-10/12 ms-auto min-h-screen bg-slate-200">
        <NavbarAdmin />
        {children}
      </section>
    </main>
  );
}
