"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import MainContainer from "@/components/Admin/MainContainer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    if (retry) {
      reset(); // Hapus error state
      router.refresh(); // Refresh data dari API
    }
  }, [retry, reset, router]);
  return (
    <MainContainer>
      <section className="w-full min-h-screen justify-center items-center ">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="poppins-bold text-red-500 text-2xl">
            Error Please Try again later
          </h1>
          <p className="text-gray-600 ">{error.message}</p>
          <BtnClick
            click={() => setRetry(true)}
            className="bg-gradient-to-r from-fuchsia-500 to-purple-600"
          >
            Coba Lagi
          </BtnClick>
        </div>
      </section>
    </MainContainer>
  );
}
