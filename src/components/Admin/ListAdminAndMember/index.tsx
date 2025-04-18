"use client";
import { Pencil, Trash } from "@phosphor-icons/react";
import Container from "../Container";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTableNoResult from "@/app/(admin)/_components/DataTableNoResult";
import { deleteAdminAndUser } from "@/_actions/AdminAndUserDelete";
import { toast } from "react-toastify";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  roles: { id: number; name: string };
}

export default function MemberAndAdminList({ members }: { members: User[] }) {
  const [userList, setUserList] = useState(members || []);

  useEffect(() => {
    setUserList(members);
  }, [members]);

  // HANDLE DELETE USER
  function handleDelete(id: number) {
    swal({
      icon: "warning",
      title: "Peringatan!",
      text: "Apakah kamu yakin ingin menghapus akun ini?",
      buttons: ["Batal", "Iya"],
      dangerMode: true,
    }).then((isTrue) => {
      if (isTrue) {
        deleteUser(id);
      }
    });
  }

  // DELETE USER
  async function deleteUser(id: number) {
    const res = await deleteAdminAndUser(id);
    if (res.status == "failed") {
      toast.error(res.message);
    }
    if (res.status == "success") {
      toast.success(res.message);
    }
  }

  const pathName = usePathname();

  return (
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
              {user.roles.name == "user" && (
                <td className="text-center border">
                  {user.roles.name == "user" ? "anggota" : "anonim"}
                </td>
              )}
              {user.roles.name == "superUser" && (
                <td className="text-center border">
                  {user.roles.name == "superUser" ? "admin" : "anonim"}
                </td>
              )}
              {/* delete update show  */}
              <td className="text-center border px-1">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className=" p-2 rounded-full bg-red-500 text-background1 cursor-pointer"
                  >
                    <Trash size={24} />
                  </button>
                  <Link href={`${pathName}/edit/${user.id}`}>
                    <button className=" p-2 rounded-full bg-amber-500 text-background1 cursor-pointer">
                      <Pencil size={24} />
                    </button>
                  </Link>
                </div>
              </td>
              {/* end delete update show  */}
            </tr>
          ))}
          {userList?.length == 0 && <DataTableNoResult />}
        </tbody>
      </table>
    </Container>
  );
}
