import InfoCard from "@/components/Admin/InfoCard";
import { getCount } from "@/services";
import { Metadata } from "next";
import { cookies } from "next/headers";
import {
  LuArrowLeftToLine,
  LuArrowRightFromLine,
  LuArrowRightLeft,
  LuBookText,
  LuTags,
  LuUserRound,
} from "react-icons/lu";

export const metadata: Metadata = {
  title: "Dashboard - Home",
};

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const booksCount = await getCount("books-count", authToken);
  const categoryCount = await getCount("categories-count", authToken);
  const usersCount = await getCount("user-count", authToken);
  const borrowCount = await getCount("borrowings-borrow-count", authToken);
  const returnCount = await getCount("borrowings-return-count", authToken);
  const transactionCount = await getCount("transactions-count", authToken);
  return (
    <>
      <section className="w-full grid grid-cols-3 gap-5">
        <InfoCard
          count={booksCount.count}
          title="Jenis Buku"
          href="/dashboard/books"
          className="bg-rose-500"
        >
          <LuBookText size={35} />
        </InfoCard>
        <InfoCard
          count={categoryCount.count}
          title="Kategori"
          href="/dashboard/category"
          className="bg-amber-500"
        >
          <LuTags size={35} />
        </InfoCard>
        <InfoCard
          count={usersCount.count}
          title="Anggota"
          href="/dashboard/member"
          className="bg-sky-500"
        >
          <LuUserRound size={35} />
        </InfoCard>
        <InfoCard
          count={borrowCount.count}
          title="Di Pinjam"
          href="/dashboard/transaction-borrow"
          className="bg-purple-500"
        >
          <LuArrowRightFromLine size={35} />
        </InfoCard>
        <InfoCard
          count={returnCount.count}
          title="Di Kembalikan"
          href="/dashboard/transaction-return"
          className="bg-fuchsia-500"
        >
          <LuArrowLeftToLine size={35} />
        </InfoCard>
        <InfoCard
          count={transactionCount.count}
          title="Riwayat Transaksi"
          href="/dashboard/history-transaction-all"
          className="bg-emerald-500"
        >
          <LuArrowRightLeft size={35} />
        </InfoCard>
      </section>
    </>
  );
}
