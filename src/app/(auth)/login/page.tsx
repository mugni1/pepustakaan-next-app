import { Metadata } from "next";
import MainContentLogin from "../_components/MainContentLogin";

export const metadata: Metadata = {
  title: "Pustaka - Login",
};

export default function Login() {
  return <MainContentLogin />;
}
