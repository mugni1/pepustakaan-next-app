import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Add new book",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
