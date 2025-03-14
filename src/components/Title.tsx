import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="inter-semibold text-2xl bg-gradient-to-r from-purple-700 to-fuchsia-500 text-transparent bg-clip-text">
      {children}
    </h1>
  );
}
