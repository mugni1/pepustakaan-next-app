"use client";
import { Trash } from "@phosphor-icons/react";
import Container from "../Container";
import MainContainer from "../MainContainer";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import Cookies from "js-cookie";

interface Member {
  id: number;
  full_name: string;
  username: string;
  email: string;
  roles: { id: number; name: string };
}

export default function MemberAndAdminList({ members }: { members: Member[] }) {
  const [memberList, setMemberList] = useState(members || []);
  const token = Cookies.get("auth_token");

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
        setMemberList(memberList.filter((member) => member.id != id));
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
    <Container className="mb-5">
      <table className="w-full">
        <thead>
          <tr className="border-b poppins-bold">
            <th className="w-1/12 py-2">ID</th>
            <th className="w-2/12 py-2">Nama Lengkap</th>
            <th className="w-2/12">Username</th>
            <th className="w-2/12">Email</th>
            <th className="w-2/12">Peran</th>
            <th colSpan={2} className="w-1/12">
              Tindakan
            </th>
          </tr>
        </thead>
        <tbody>
          {memberList?.map((member: Member, index) => (
            <tr key={index + member.id} className="border-b">
              <td className="text-center py-5">{member.id}</td>
              <td className="text-center py-5">{member.full_name}</td>
              <td className="text-center">{member.username}</td>
              <td className="text-center">{member.email}</td>
              <td className="text-center">{member.roles.name}</td>
              {/* delete update show  */}
              <td className="text-center px-1">
                <button
                  onClick={() => handleDelete(member.id)}
                  className=" p-2 rounded-full bg-red-500 text-white cursor-pointer"
                >
                  <Trash size={24} />
                </button>
              </td>
              {/* end delete update show  */}
            </tr>
          ))}
          {memberList?.length == 0 && (
            <tr className="border-b">
              <td
                colSpan={6}
                className="text-center text-red-500 poppins-bold py-5"
              >
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}
