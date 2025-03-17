"use client";

import {
  BookOpenUser,
  HouseLine,
  MagnifyingGlass,
  SignOut,
  User,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();
  return (
    <div className="w-full fixed bottom-5 px-5">
      <div className=" w-full md:w-6/12 xl:w-4/12 mx-auto  py-3 px-5 rounded-lg shadow-lg flex items-center justify-between gap-5 backdrop-blur-md bg-white/50 border border-purple-500">
        <Link
          href={"/"}
          className={`${
            pathname == "/" && "text-purple-500 bg-purple-200 rounded-xl"
          } transition-all duration-200 ease-in-out p-2`}
        >
          <HouseLine size={24} />
        </Link>
        <Link
          href={"/profile"}
          className={`${
            pathname == "/profile" && "text-purple-500 bg-purple-200 rounded-xl"
          } transition-all duration-200 ease-in-out p-2`}
        >
          <User size={24} />
        </Link>
        <Link
          href={"/borrowings"}
          className={`${
            pathname == "/borrowings" &&
            "text-purple-500 bg-purple-200 rounded-xl"
          } transition-all duration-200 ease-in-out p-2`}
        >
          <BookOpenUser size={24} />
        </Link>
        <button>
          <MagnifyingGlass size={24} />
        </button>
        <button>
          <SignOut size={24} />
        </button>
      </div>
    </div>
  );
}
