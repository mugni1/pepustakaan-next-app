"use client";
import { useEffect, useState } from "react";
import ProfileAndLogout from "./ProfileAndLogout";
import Cookies from "js-cookie";

export default function Account() {
  const [fullName, setFullName] = useState<string | undefined>("");
  const [roleName, setRoleName] = useState<string | undefined>("");

  useEffect(() => {
    setFullName(Cookies.get("fullName"));
    setRoleName(Cookies.get("roleName"));
  }, []);
  return (
    <section className="flex w-full items-center px-5 py-5 gap-2 cursor-pointer group relative">
      {/* avatar  */}
      <div className="w-4/12 2xl:w-3/12 me-auto flex items-center">
        <div className="w-full aspect-square rounded-full bg-emerald-500 text-center flex items-center justify-center text-4xl font-extrabold text-background1">
          <span>{fullName?.substring(0, 1).toUpperCase()}</span>
        </div>
      </div>
      {/* end awatar */}
      {/* name and status  */}
      <div className="w-8/12 h-auto flex flex-col text-sm xl:text-base">
        <span className="font-bold line-clamp-1">
          {fullName ? fullName : "Anonim"}
        </span>
        <span className="text-xs w-full text-accent1 font-semibold">
          {roleName == "superUser" ? "Admin" : "Tidak Diketahui"}
        </span>
      </div>
      {/* edn name and status */}
      <ProfileAndLogout />
    </section>
  );
}
