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
      <section className="mt-40 flex justify-center items-center flex-col gap-2">
        <h1 className="poppins-bold text-red-500 text-2xl">
          Error Please Try again later
        </h1>

        <BtnClick
          click={() => setRetry(true)}
          className="bg-gradient-to-r from-fuchsia-500 to-purple-600"
        >
          Coba Lagi
        </BtnClick>
      </section>
    </MainContainer>
  );
}
