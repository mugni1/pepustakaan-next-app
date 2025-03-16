"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const token = Cookies.get("auth_token");
  const router = useRouter();

  // cek token
  useEffect(() => {
    if (token == null) {
      router.push("/login");
    }
  }, []);
  return <section>{children}</section>;
}
