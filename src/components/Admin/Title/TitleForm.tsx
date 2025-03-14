import { ReactNode } from "react";

export default function TitleForm({ children }: { children: ReactNode }) {
  return (
    <h1 className="poppins-bold text-center text-2xl bg-gradient-to-r from-purple-700 to-fuchsia-500 text-transparent bg-clip-text">
      {children}
    </h1>
  );
}
