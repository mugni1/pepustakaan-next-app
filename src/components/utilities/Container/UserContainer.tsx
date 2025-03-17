import { ReactNode } from "react";

export default function UserContainer({ children }: { children: ReactNode }) {
  return <main className="w-full mx-auto p-5 container">{children}</main>;
}
