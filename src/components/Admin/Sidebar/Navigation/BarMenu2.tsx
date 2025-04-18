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
      className={`w-full py-2 transition-all ease-in-out duration-150 hover:text-accent2 ${
        pathName === href || pathName.startsWith(`${href}/`)
          ? " text-accent2 font-semibold"
          : " text-foreground"
      }`}
    >
      <Link className="w-full  flex items-center gap-2" href={href}>
        <span>{children}</span>
        <span>{title}</span>
      </Link>
    </li>
  );
}
