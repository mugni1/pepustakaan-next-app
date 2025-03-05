import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-semibold text-2xl bg-gradient-to-r bg-purple-700 to-fuchsia-500 text-transparent bg-clip-text">
      {children}
    </h1>
  );
}
