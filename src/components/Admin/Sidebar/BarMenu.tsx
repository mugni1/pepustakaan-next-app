"use client";
interface Props {
  children: ReactNode;
  href: string;
  title: string;
}

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function BarMenu({ children, href, title }: Props) {
  const pathName = usePathname();
  return (
    <li
      className={`w-full px-5 py-2 transition-all ease-in-out duration-150 hover:text-purple-600 ${
        pathName === href || pathName.startsWith(`${href}/`)
          ? "bg-purple-100 text-purple-600 font-semibold"
          : "text-slate-800"
      }`}
    >
      <Link className="w-full  flex justify-between items-center" href={href}>
        <span>{title}</span>
        <span>{children}</span>
      </Link>
    </li>
  );
}
