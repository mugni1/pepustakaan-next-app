import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <section className="w-full p-5 rounded-xl shadow-lg bg-white">
      {children}
    </section>
  );
}
