import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
  return <main className="p-5">{children}</main>;
}
