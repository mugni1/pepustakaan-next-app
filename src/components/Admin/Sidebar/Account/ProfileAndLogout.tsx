"use client";
import React from "react";
import Cookies from "js-cookie";
import { SignOut, UserCircle } from "@phosphor-icons/react";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileAndLogout() {
  const token = Cookies.get("auth_token");
  const router = useRouter();

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
        className="flex items-center gap-1 cursor-pointer hover:text-accent2"
      >
        <span>
          <UserCircle size={20} />
        </span>
        Profile
      </Link>
    </div>
  );
}
