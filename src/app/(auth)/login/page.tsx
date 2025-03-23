import MainContentLogin from "@/components/Login/MainContentLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LOGIN",
};

export default function Login() {
  return <MainContentLogin />;
}
