import { ReactNode } from "react";

export default function FormTitle({ children }: { children: ReactNode }) {
  return <h1 className=" w-full text-center font-bold text-2xl">{children}</h1>;
}
