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
  const handleRetry = () => {
    reset(); // Hapus error state
    router.refresh(); // Refresh data dari API
  };
  return (
    <MainContainer>
      <section className="flex justify-center items-center flex-col gap-2">
        <h1 className="font-bold text-red-500 text-2xl">Koneksi bermasalah</h1>
        <BtnClick
          click={handleRetry}
          className="bg-gradient-to-r from-accent1 to-accent2"
        >
          Coba Lagi
        </BtnClick>
      </section>
    </MainContainer>
  );
}
