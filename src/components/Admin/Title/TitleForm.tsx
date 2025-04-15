import { ReactNode } from "react";

export default function TitleForm({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-bold text-center text-2xl bg-gradient-to-r from-accent1 to-accent2 text-transparent bg-clip-text">
      {children}
    </h1>
  );
}
