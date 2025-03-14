"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import { Bug } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Page() {
  const fullName = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    event?.preventDefault();
  };

  const router = useRouter();
  return (
    <MainContainer>
      <Container className="w-8/12 mx-auto  flex flex-col gap-5">
        <TitleForm>Tambah Anggota</TitleForm>
        <form onSubmit={handleSubmit}>
          <section className="w-full grid grid-cols-2 gap-5 mb-5">
            <input
              type="text"
              className="py-1 px-3 rounded-xl outline-purple-500 border border-slate-500 w-full"
              placeholder="Nama Lengkap"
              ref={fullName}
            />
            <input
              type="text"
              className="py-1 px-3 rounded-xl outline-purple-500 border border-slate-500 w-full"
              placeholder="username"
              ref={username}
            />
            <input
              type="email"
              className="py-1 px-3 rounded-xl outline-purple-500 border border-slate-500 w-full"
              placeholder="email"
              ref={email}
            />
            <input
              type="password"
              className="py-1 px-3 rounded-xl outline-purple-500 border border-slate-500 w-full"
              placeholder="password"
              ref={password}
            />
          </section>
          <section className="w-full flex gap-5">
            <BtnClick typeBtn="submit" className="bg-green-500">
              Submit
            </BtnClick>
            <BtnHref href="/dashboard/member" className="bg-sky-500 text-white">
              Back
            </BtnHref>
          </section>
        </form>
      </Container>
    </MainContainer>
  );
}
