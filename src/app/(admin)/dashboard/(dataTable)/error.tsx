"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import MainContainer from "@/components/Admin/MainContainer";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  function handleRetry() {
    reset(); // Hapus error state
    router.refresh(); // Refresh data dari API
  }
  return (
    <MainContainer>
      <section className="mt-40 flex justify-center items-center flex-col">
        <h1 className="poppins-bold text-red-500 text-3xl">500</h1>
        <h1 className="poppins-bold text-red-500 text-2xl mb-3">
          Terjadi Kesalahan
        </h1>
        <BtnClick
          click={() => handleRetry()}
          className="bg-gradient-to-r from-fuchsia-500 to-purple-600"
        >
          Coba Lagi
        </BtnClick>
      </section>
    </MainContainer>
  );
}
