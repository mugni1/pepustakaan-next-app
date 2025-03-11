import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export default function BtnHref({
  href = "#",
  children = "Title",
  className = "bg-sky-600",
}: Props) {
  return (
    <Link
      href={href}
      className={`py-2 px-5 rounded-md shadow-md font-bold text-white text-lg ${className}`}
    >
      {children}
    </Link>
  );
}
