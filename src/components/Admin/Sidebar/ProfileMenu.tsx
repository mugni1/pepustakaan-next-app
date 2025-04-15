"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SignOut, UserCircle } from "@phosphor-icons/react";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileMenu() {
  const [fullName, setFullName] = useState<string | undefined>("");
  const [roleName, setRoleName] = useState<string | undefined>("");
  const [initialName, setInitialName] = useState<string | undefined>("");
  const token = Cookies.get("auth_token");

  const router = useRouter();

  // set Role and Name
  useEffect(() => {
    setFullName(Cookies.get("fullName"));
    setRoleName(Cookies.get("roleName"));
    setInitialName(
      Cookies.get("fullName")?.substring(0, 1)?.toUpperCase() || "?"
    );
  }, []);

  const handleLogout = () => {
    swal({
      icon: "warning",
      title: "Peringatan!",
      text: "Apakah kamu ingin logout?",
      dangerMode: true,
      buttons: ["Tidak", "Ya"],
    }).then((isTrue) => {
      if (isTrue) {
        swal({
          icon: "warning",
          title: "Peringatan!",
          text: "Apakah kamu ingin logout dari semua perangkat?",
          buttons: ["Tidak", "Ya"],
        }).then((isTrue) => {
          if (isTrue) {
            axios({
              method: "get",
              url: process.env.NEXT_PUBLIC_BASE_API_URL + "/logout-all",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => {
                swal({
                  icon: "success",
                  title: "Success!",
                  text: res.data.message,
                  timer: 2000,
                });
                Cookies.remove("auth_token");
                Cookies.remove("fullName");
                Cookies.remove("username");
                Cookies.remove("email");
                Cookies.remove("roleName");
                router.push("/login");
              })
              .catch(() => {
                swal({
                  icon: "error",
                  title: "Error!",
                  text: "Please try again later",
                  timer: 2000,
                });
                Cookies.remove("auth_token");
                Cookies.remove("fullName");
                Cookies.remove("username");
                Cookies.remove("email");
                Cookies.remove("roleName");
                router.push("/login");
              });
          } else {
            axios({
              method: "get",
              url: process.env.NEXT_PUBLIC_BASE_API_URL + "/logout",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => {
                swal({
                  icon: "success",
                  title: "Success!",
                  text: res.data.message,
                  timer: 2000,
                });
                Cookies.remove("auth_token");
                Cookies.remove("fullName");
                Cookies.remove("username");
                Cookies.remove("email");
                Cookies.remove("roleName");
                router.push("/login");
              })
              .catch(() => {
                swal({
                  icon: "error",
                  title: "Error!",
                  text: "Please try again later",
                  timer: 2000,
                });
                Cookies.remove("auth_token");
                Cookies.remove("fullName");
                Cookies.remove("username");
                Cookies.remove("email");
                Cookies.remove("roleName");
                router.push("/login");
              });
          }
        });
      }
    });
  };
  return (
    <section className="flex w-full items-center px-5 py-5 gap-2 cursor-pointer group relative">
      {/* avatar  */}
      <div className="w-4/12 2xl:w-3/12 me-auto flex items-center">
        <div className="w-full aspect-square rounded-full bg-emerald-500 text-center flex items-center justify-center text-2xl text-background1">
          <span>{initialName}</span>
        </div>
      </div>
      {/* end awatar */}
      {/* name and status  */}
      <div className="w-8/12 h-auto flex flex-col gap-1 ps-2 2xl:ps-0 text-sm 2xl:text-lg">
        <span className="font-semibold line-clamp-1">
          {fullName ? fullName : "Anonim"}
        </span>
        <span className="py-1 text-xs text-center w-full rounded-md bg-amber-200 text-amber-600 font-semibold">
          {roleName ? roleName : "no role"}
        </span>
      </div>
      {/* edn name and status */}
      <div className="absolute top-3 -right-16 px-3 py-2 h-fit bg-background1 rounded-md shadow-lg flex flex-col gap-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 ease-linear z-50">
        <button
          onClick={handleLogout}
          className=" flex items-center gap-1 cursor-pointer hover:text-accent2"
        >
          <span>
            <SignOut size={20} />
          </span>
          Logout
        </button>
        <Link
          href={"profile"}
          className="flex items-center gap-1 cursor-pointer hover:text-purple-500"
        >
          <span>
            <UserCircle size={20} />
          </span>
          Profile
        </Link>
      </div>
    </section>
  );
}
