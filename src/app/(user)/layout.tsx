import NavigationBar from "./_components/NavigationBar";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <NavigationBar />
      <footer className="w-full rounded-t-2xl bg-gradient-to-br from-accent1 to-accent2 text-background1 font-gabarito ">
        <div className="container mx-auto px-5 grid md:grid-cols-2 grid-cols-1 py-5 gap-5">
          <section className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">PUSTAKA</h2>
            <span>
              Jalan Gununghalu, Rongga, Kecamatan Gununghalu, Bandung Barat,
              46505
            </span>
            <div className=" flex flex-col">
              <span>0831-2024-9215</span>
              <span>abankr342@gmail.com</span>
            </div>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Navigasi</h2>
            <div className="flex flex-col">
              <Link href={"/"}>Beranda</Link>
              <Link href={"/profile"}>Profile</Link>
              <Link href={"/borrowings"}>Peminjaman</Link>
              <Link href={"/returns"}>Pengembalian</Link>
            </div>
          </section>
        </div>
        <hr />
        <div className=" py-5">
          <h4 className="text-center">
            Copyright &copy;2025 PUSTAKA | Allrights Reserved
          </h4>
        </div>
      </footer>
    </>
  );
}
