"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseApiURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const deleteAdminAndUser = async (id: number) => {
  const token = (await cookies()).get("auth_token")?.value;
  try {
    const res = await fetch(`${baseApiURL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return {
        status: "failed",
        message: "Gagal Menghapus akun, Coba lagi nanti!",
      };
    }
    revalidatePath("/dashboard/home");
    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/member");
    return {
      status: "success",
      message: "Berhasil Menghapus akun",
    };
  } catch {
    return {
      status: "failed",
      message: "Gagal Menghapus akun, Server sedang sibuk!",
    };
  }
};
