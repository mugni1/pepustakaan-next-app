"use client";
interface Props {
  children: ReactNode;
  href: string;
  title: string;
}
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function BarMenu2({ children, href, title }: Props) {
  const pathName = usePathname();
  return (
    <li
      className={`w-full py-2 transition-all ease-in-out duration-150 hover:text-purple-600 ${
        pathName == href ? " text-purple-600" : ""
      }`}
    >
      <Link className="w-full  flex justify-between items-center" href={href}>
        <span>{title}</span>
        <span>{children}</span>
      </Link>
    </li>
  );
}
