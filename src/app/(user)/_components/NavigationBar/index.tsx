"use client";
import {
  LuArrowLeftToLine,
  LuArrowRightFromLine,
  LuHouse,
  LuLogIn,
  LuLogOut,
  LuUserRound,
} from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import swal from "sweetalert";

export default function NavigationBar() {
  const pathname = usePathname();
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(Cookies.get("auth_token"));
  }, []);

  const handleLogoutAll = () => {
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
        Cookies.remove("roleName");
        window.location.href = "/";
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: "Error!",
          text: err.response?.data?.message || "Terjadi kesalahan",
        });
      });
  };

  const handleLogout = () => {
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
        Cookies.remove("roleName");
        window.location.href = "/";
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: "Error!",
          text: err.response?.data?.message || "Terjadi kesalahan",
        });
      });
  };

  const selectLogout = () => {
    swal({
      icon: "warning",
      title: "Peringatan!",
      text: "Apakah kamu ingin logout dari semua perangkat?",
      buttons: ["Tidak", "Ya"],
      dangerMode: true,
    }).then((isTrue) => {
      if (isTrue) {
        handleLogoutAll();
      } else {
        handleLogout();
      }
    });
  };

  const validateLogout = () => {
    swal({
      icon: "warning",
      title: "Peringatan!",
      text: "Apakah kamu ingin logout?",
      buttons: ["Tidak", "Ya"],
      dangerMode: true,
    }).then((isTrue) => {
      if (isTrue) {
        selectLogout();
      }
    });
  };

  return (
    <div className="w-full fixed bottom-5 px-5">
      <div className=" w-full md:w-6/12 xl:w-4/12 mx-auto  py-3 px-5 rounded-lg shadow-lg flex items-center justify-between gap-5 backdrop-blur-md bg-background1/70 border border-accent2">
        <Link
          href={"/"}
          className={`${
            pathname == "/" &&
            "text-background1 bg-gradient-to-br from-accent1 to-accent2 rounded-lg scale-110 "
          } transition-all duration-300 ease-in-out p-2 scale-100`}
        >
          <LuHouse size={24} />
        </Link>
        <Link
          href={"/profile"}
          className={`${
            pathname == "/profile" &&
            "text-background1 bg-gradient-to-br from-accent1 to-accent2 rounded-lg scale-110"
          } transition-all duration-300 ease-in-out p-2 scale-100`}
        >
          <LuUserRound size={24} />
        </Link>
        <Link
          href={"/borrowings"}
          className={`${
            pathname == "/borrowings" &&
            "text-background1 bg-gradient-to-br from-accent1 to-accent2 rounded-lg scale-110"
          } transition-all duration-300 ease-in-out p-2 scale-100`}
        >
          <LuArrowLeftToLine size={24} />
        </Link>
        <Link
          href={"/returns"}
          className={`${
            pathname == "/returns" &&
            "text-background1 bg-gradient-to-br from-accent1 to-accent2 rounded-lg scale-110"
          } transition-all duration-300 ease-in-out p-2 scale-100`}
        >
          <LuArrowRightFromLine size={24} />
        </Link>
        {token && (
          <button
            onClick={validateLogout}
            className={`${
              pathname == "/login" &&
              "text-background1 bg-gradient-to-br from-accent1 to-accent2 rounded-lg scale-110"
            } transition-all duration-300 ease-in-out p-2 scale-100 cursor-pointer`}
          >
            <LuLogOut size={24} />
          </button>
        )}
        {!token && (
          <Link
            href={"/login"}
            className={`${
              pathname == "/login" &&
              "text-background1 bg-gradient-to-br from-accent1 to-accent2 rounded-lg scale-110"
            } transition-all duration-300 ease-in-out p-2 scale-100`}
          >
            <LuLogIn size={24} />
          </Link>
        )}
      </div>
    </div>
  );
}
