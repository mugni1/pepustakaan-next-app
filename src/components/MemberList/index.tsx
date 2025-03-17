"use client";
import { MagnifyingGlass, Pencil, Trash } from "@phosphor-icons/react";
import BtnHref from "../Admin/Button/BtnHref";
import Container from "../Admin/Container";
import MainContainer from "../Admin/MainContainer";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";

interface Member {
  id: number;
  full_name: string;
  username: string;
  email: string;
  roles: { id: number; name: string };
}

export default function MemberList({ members }: { members: Member[] }) {
  const [memberList, setMemberList] = useState(members || []);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    keyword.length > 0
      ? setMemberList(
          members.filter((member: Member) =>
            member.full_name.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      : setMemberList(members);
  }, [keyword]);

  function handleDelete(id: number) {
    swal({
      icon: "warning",
      title: "Warning!",
      text: "Apakah kamu yakin ingin menghapus?",
      buttons: ["Batal", "Iya"],
      dangerMode: true,
    }).then((isTrue) => {
      if (isTrue) {
        axios({
          method: "delete",
          url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${id}`,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
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
              text: "Harap coba lagi nanti!",
            });
          });
      }
    });
  }
  return (
    <MainContainer>
      {/* search  */}
      <section className="w-full flex items-center justify-between mb-5">
        <BtnHref href="member/add">Tambah Anggota</BtnHref>
        <div className="relative h-fit w-auto group text-slate-600">
          <span className="absolute h-full flex items-center px-2">
            <MagnifyingGlass size={20} />
          </span>
          <input
            type="text"
            className="py-1 px-2 border border-slate-400 rounded-md bg-white outline-purple-500 ps-9 shadow-md"
            placeholder="Cari Anggota"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </section>
      {/* end search  */}

      {/* table  */}
      <Container>
        <table className="w-full">
          <thead>
            <tr className="border-b poppins-bold">
              <th className="w-1/12 py-2">ID</th>
              <th className="w-2/12 py-2">Nama Lengkap</th>
              <th className="w-2/12">Username</th>
              <th className="w-2/12">Email</th>
              <th className="w-2/12">Role</th>
              <th colSpan={2} className="w-1/12">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {memberList?.map((member: Member, index) => (
              <tr key={index} className="border-b">
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
      {/* end table  */}
    </MainContainer>
  );
}
