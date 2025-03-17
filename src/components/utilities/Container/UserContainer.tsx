import { ReactNode } from "react";

export default function UserContainer({ children }: { children: ReactNode }) {
  return <main className="w-full mx-auto container">{children}</main>;
}
