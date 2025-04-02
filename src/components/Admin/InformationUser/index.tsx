import React from "react";

interface User {
  full_name: string;
  username: string;
  email: string;
}

export default function InformationUser({ full_name, username, email }: User) {
  return (
    <section className="w-full flex flex-col my-4">
      <h2 className="font-semibold text-xl poppins-semibold mb-1">
        Detail Peminjam
      </h2>
      <table className="border rounded-lg border-slate-600 w-full">
        <thead>
          <tr className="bg-purple-300 w-full poppins-semibold">
            <th className="py-3 w-3/12">Nama Lengkap</th>
            <th className="w-3/12">Username</th>
            <th className="w-3/12">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr className="poppins">
            <td className="text-center py-3 w-3/12">{full_name}</td>
            <td className="text-center w-3/12">{username}</td>
            <td className="text-center w-3/12">{email}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
