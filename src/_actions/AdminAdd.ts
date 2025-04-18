"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const baseApiURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const validateSchema = z.object({
  full_name: z.string().min(1, "Harap isi nama lengkap"),
  username: z.string().min(1, "Harap isi username"),
  email: z.string().min(1, "Harap isi email"),
  password: z
    .string()
    .min(1, "Harap isi kata sandi")
    .max(8, "Kata sandi maksimal 8 digit"),
});

export const createAdmin = async (prevState: any, formData: FormData) => {
  const token = (await cookies()).get("auth_token")?.value;
  const data = Object.fromEntries(formData.entries());
  const dataValidate = validateSchema.safeParse(data);

  if (!dataValidate.success) {
    return {
      status: "warning",
      message: "Harap isi semua form dengan benar!",
      Error: dataValidate.error.flatten().fieldErrors,
    };
  }
  try {
    const form = new FormData();
    form.append("full_name", dataValidate.data.full_name);
    form.append("username", dataValidate.data.username);
    form.append("email", dataValidate.data.email);
    form.append("password", dataValidate.data.password);
    form.append("role_id", "1");

    const res = await fetch(`${baseApiURL}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });
    if (res.status != 201) {
      return {
        status: "failed",
        message: "Gagal menyimpan, Coba lagi nanti!",
      };
    }
    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/home");
    return {
      status: "success",
      message: "Berhasil menyimpan akun admin",
    };
  } catch {
    return {
      status: "failed",
      message: "Gagal Menyimpan, Server sedang sibuk!",
    };
  }
};
