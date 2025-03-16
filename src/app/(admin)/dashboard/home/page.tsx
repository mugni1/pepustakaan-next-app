import MainContainer from "@/components/Admin/MainContainer";
import InfoCard from "@/components/Admin/InfoCard";
import { getCount } from "@/services";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard - Home",
};

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");

  const booksCount = await getCount("books-count", authToken);
  const categoryCount = await getCount("categories-count", authToken);
  const usersCount = await getCount("user-count", authToken);
  const borrowCount = await getCount("borrowings-borrow-count", authToken);
  const returnCount = await getCount("borrowings-return-count", authToken);
  const transactionCount = await getCount("transactions-count", authToken);

  return (
    <MainContainer>
      <section className="w-full grid grid-cols-3 gap-5">
        <InfoCard
          count={booksCount.count}
          title="Jenis Buku"
          href="/dashboard/book"
          className="bg-rose-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            className="fill-current"
            viewBox="0 0 256 256"
          >
            <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path>
          </svg>
        </InfoCard>
        <InfoCard
          count={categoryCount.count}
          title="Kategori"
          href="/dashboard/category"
          className="bg-amber-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            className="fill-current"
            viewBox="0 0 256 256"
          >
            <path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z"></path>
          </svg>
        </InfoCard>
        <InfoCard
          count={usersCount.count}
          title="Anggota"
          href="/dashboard/member"
          className="bg-sky-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            className="fill-current"
            viewBox="0 0 256 256"
          >
            <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
          </svg>
        </InfoCard>
        <InfoCard
          count={borrowCount.count}
          title="Di Pinjam"
          href="/dashboard/borrow"
          className="bg-purple-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            className="fill-current"
            viewBox="0 0 256 256"
          >
            <path d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H104a8,8,0,0,0-8,8v96a8,8,0,0,0,8,8h24v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H112V88h24a8,8,0,0,0,8-8V51.31L220.69,128ZM48,80v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Zm32,0v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Z"></path>
          </svg>
        </InfoCard>
        <InfoCard
          count={returnCount.count}
          title="Di Kembalikan"
          href="/dashboard/return"
          className="bg-fuchsia-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            className="fill-current"
            viewBox="0 0 256 256"
          >
            <path d="M152,72H128V32a8,8,0,0,0-13.66-5.66l-96,96a8,8,0,0,0,0,11.32l96,96A8,8,0,0,0,128,224V184h24a8,8,0,0,0,8-8V80A8,8,0,0,0,152,72Zm-8,96H120a8,8,0,0,0-8,8v28.69L35.31,128,112,51.31V80a8,8,0,0,0,8,8h24Zm80-88v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Zm-32,0v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Z"></path>
          </svg>
        </InfoCard>
        <InfoCard
          count={transactionCount.count}
          title="Transaksi"
          href="/dashboard/transaction"
          className="bg-emerald-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            className="fill-current"
            viewBox="0 0 256 256"
          >
            <path d="M239.76,158.06,217.28,68.12A16,16,0,0,0,201.75,56H136V40a16,16,0,0,0-16-16H80A16,16,0,0,0,64,40V56H54.25A16,16,0,0,0,38.72,68.12L16.24,158.06A7.93,7.93,0,0,0,16,160v32a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160A7.93,7.93,0,0,0,239.76,158.06ZM80,40h40V56H80ZM54.25,72h147.5l20,80H34.25ZM32,192V168H224v24ZM64,96a8,8,0,0,1,8-8H88a8,8,0,0,1,0,16H72A8,8,0,0,1,64,96Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H120A8,8,0,0,1,112,96Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H168A8,8,0,0,1,160,96ZM64,128a8,8,0,0,1,8-8H88a8,8,0,0,1,0,16H72A8,8,0,0,1,64,128Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H120A8,8,0,0,1,112,128Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H168A8,8,0,0,1,160,128Z"></path>
          </svg>
        </InfoCard>
      </section>
    </MainContainer>
  );
}
