import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export default function BtnHref({
  href = "#",
  children = "Title",
  className = " bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white",
}: Props) {
  return (
    <Link
      href={href}
      className={`py-1 px-5 rounded-md shadow-md poppins-semibold flex items-center active:scale-90 active:bg-slate-500 transition-all ${className}`}
    >
      {children}
    </Link>
  );
}
