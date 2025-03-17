"use client";

import {
  BookOpenUser,
  HouseLine,
  MagnifyingGlass,
  SignOut,
  User,
} from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();
  return (
    <div className="w-full fixed mx-5 bottom-5">
      <div className=" w-4/12 mx-auto  py-3 px-5 rounded-lg shadow-lg flex items-center justify-between gap-5 backdrop-blur-md bg-white/50">
        <button
          className={`${
            pathname == "/" && "text-purple-500 bg-purple-200 p-2 rounded-xl"
          } transition-all duration-200 ease-in-out`}
        >
          <HouseLine size={24} />
        </button>
        <button>
          <User size={24} />
        </button>
        <button>
          <MagnifyingGlass size={24} />
        </button>
        <button>
          <BookOpenUser size={24} />
        </button>
        <button>
          <SignOut size={24} />
        </button>
      </div>
    </div>
  );
}
