"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function BarMenu({
  children,
  href,
  title,
}: {
  children: ReactNode;
  href: string;
  title: string;
}) {
  const pathName = usePathname();
  return (
    <li
      className={`w-full px-5 py-2 transition-all ease-in-out duration-150 ${
        pathName == href ? "bg-purple-100 text-purple-600" : ""
      }`}
    >
      <Link className="w-full  flex justify-between items-center" href={href}>
        <span>{title}</span>
        <span>{children}</span>
      </Link>
    </li>
  );
}
