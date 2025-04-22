import { FaPhoneFlip } from "react-icons/fa6";
import NavigationBar from "./_components/NavigationBar";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";

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
        <div className="container mx-auto px-5 grid md:grid-cols-3 grid-cols-1 py-5 gap-2">
          <section className="flex flex-col gap-4 mb-2 md:mb-0">
            <h2 className="font-bold text-2xl">PUSTAKA</h2>
            <span className="text-background1/80">
              Jalan Gununghalu, Rongga, Kecamatan Gununghalu, Bandung Barat,
              46505
            </span>
            <div className=" flex flex-col text-background1/80">
              <span className="flex items-center gap-1">
                <FaPhoneFlip size={24} /> 0831-2024-9215
              </span>
              <span className="flex items-center gap-1">
                <IoMdMail size={24} /> abankr342@gmail.com
              </span>
            </div>
          </section>
          <section className="flex flex-col gap-2 mb-2 md:mb-0">
            <h2 className="font-bold text-2xl">Navigasi</h2>
            <div className="flex flex-col text-background1/80">
              <Link href={"/"}>Beranda</Link>
              <Link href={"/profile"}>Profile</Link>
              <Link href={"/borrowings"}>Peminjaman</Link>
              <Link href={"/returns"}>Pengembalian</Link>
            </div>
          </section>
          <section className="flex flex-col gap-2 mb-2 md:mb-0">
            <h2 className="font-bold text-2xl">Sosial Media</h2>
            <div className="flex flex-col text-background1/80">
              <Link href={"/"}>Facebook</Link>
              <Link href={"/profile"}>Instagram</Link>
              <Link href={"/profile"}>Tiktok</Link>
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
