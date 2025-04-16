"use client";
import { Trash } from "@phosphor-icons/react";
import Container from "../Container";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  roles: { id: number; name: string };
}

export default function MemberAndAdminList({ members }: { members: User[] }) {
  const [userList, setUserList] = useState(members || []);
  const token = Cookies.get("auth_token");

  useEffect(() => {
    setUserList(members);
  }, [members]);

  // HANDLE DELETE USER
  function handleDelete(id: number) {
    swal({
      icon: "warning",
      title: "Warning!",
      text: "Apakah kamu yakin ingin menghapus?",
      buttons: ["Batal", "Iya"],
      dangerMode: true,
    }).then((isTrue) => {
      if (isTrue) {
        deleteUser(id);
      }
    });
  }

  // DELETE USER
  function deleteUser(id: number) {
    axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        swal({
          icon: "success",
          title: "Success!",
          text: res.data.message,
        });
        setUserList(userList.filter((user) => user.id != id));
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: "Error!",
          text: err.response?.data?.message || "Harap coba Lagi nanti",
        });
      });
  }

  return (
    <>
      <Container className="mb-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/12 font-bold bg-accent2/10 text-accent2 border py-4">
                ID
              </th>
              <th className="w-2/12 font-bold bg-accent2/10 text-accent2 border py-2">
                Nama Lengkap
              </th>
              <th className="w-2/12 font-bold bg-accent2/10 text-accent2 border">
                Username
              </th>
              <th className="w-2/12 font-bold bg-accent2/10 text-accent2 border">
                Email
              </th>
              <th className="w-2/12 font-bold bg-accent2/10 text-accent2 border">
                Peran
              </th>
              <th
                colSpan={2}
                className="w-1/12 font-bold bg-accent2/10 text-accent2 border"
              >
                Tindakan
              </th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user: User, index) => (
              <tr key={index + user.id}>
                <td className="text-center border py-5">{user.id}</td>
                <td className="text-center border py-5">{user.full_name}</td>
                <td className="text-center border">{user.username}</td>
                <td className="text-center border">{user.email}</td>
                <td className="text-center border">{user.roles.name}</td>
                {/* delete update show  */}
                <td className="text-center border px-1">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className=" p-2 rounded-full bg-red-500 text-white cursor-pointer"
                  >
                    <Trash size={24} />
                  </button>
                </td>
                {/* end delete update show  */}
              </tr>
            ))}
            {userList?.length == 0 && (
              <tr className="border-b">
                <td
                  colSpan={6}
                  className="text-center border text-red-500 font-bold py-5"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Container>
    </>
  );
}
