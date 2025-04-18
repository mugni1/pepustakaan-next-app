"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseApiURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const deleteBook = async (id: number) => {
  const token = (await cookies()).get("auth_token")?.value;
  try {
    const res = await fetch(`${baseApiURL}/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return {
        status: "failed",
        message: "Gagal Menghapus buku, Coba lagi nanti!",
      };
    }
    revalidatePath("/dashboard/home");
    revalidatePath("/dashboard/books");
    revalidatePath("/");
    return {
      status: "success",
      message: "Berhasil Menghapus buku",
    };
  } catch {
    return {
      status: "failed",
      message: "Gagal Menghapus buku, Server sedang sibuk!",
    };
  }
};
