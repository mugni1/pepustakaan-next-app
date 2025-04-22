import { FaFacebook, FaPhoneFlip, FaTiktok, FaUser } from "react-icons/fa6";
import NavigationBar from "./_components/NavigationBar";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import { FaHome, FaInstagramSquare } from "react-icons/fa";
import { LuArrowLeftToLine, LuArrowRightFromLine } from "react-icons/lu";

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
                <FaPhoneFlip size={20} /> 0831-2024-9215
              </span>
              <span className="flex items-center gap-1">
                <IoMdMail size={20} /> abankr342@gmail.com
              </span>
            </div>
          </section>
          <section className="flex flex-col gap-2 mb-2 md:mb-0">
            <h2 className="font-bold text-2xl">Navigasi</h2>
            <div className="flex flex-col text-background1/80">
              <Link href={"/"} className="flex items-center gap-1">
                <FaHome size={20} /> Beranda
              </Link>
              <Link href={"/profile"} className="flex items-center gap-1">
                <FaUser size={20} /> Profile
              </Link>
              <Link href={"/borrowings"} className="flex items-center gap-1">
                <LuArrowLeftToLine size={20} /> Peminjaman
              </Link>
              <Link href={"/returns"} className="flex items-center gap-1">
                <LuArrowRightFromLine size={20} /> Pengembalian
              </Link>
            </div>
          </section>
          <section className="flex flex-col gap-2 mb-2 md:mb-0">
            <h2 className="font-bold text-2xl">Sosial Media</h2>
            <div className="flex flex-col text-background1/80">
              <Link href={"/"} className="flex items-center gap-1">
                <FaFacebook size={20} /> Facebook
              </Link>
              <Link href={"/profile"} className="flex items-center gap-1">
                <FaInstagramSquare size={20} /> Instagram
              </Link>
              <Link href={"/profile"} className="flex items-center gap-1">
                <FaTiktok size={20} /> Tiktok
              </Link>
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
