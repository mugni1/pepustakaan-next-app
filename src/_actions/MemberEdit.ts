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
    .max(8, "Kata sandi maksimal 8 digit")
    .nullable()
    .optional(),
});

export const updateMember = async (
  id: number,
  prevState: any,
  formData: FormData
) => {
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
    {
      dataValidate.data.password &&
        form.append("password", dataValidate.data.password);
    }
    form.append("role_id", "2");
    form.append("_method", "put");

    const res = await fetch(`${baseApiURL}/users/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    if (res.status != 200) {
      return {
        status: "failed",
        message: "Gagal menyimpan, Coba lagi nanti!",
      };
    }
    revalidatePath("/dashboard/member");
    revalidatePath("/dashboard/home");
    return {
      status: "success",
      message: "Berhasil menyimpan akun member",
    };
  } catch {
    return {
      status: "failed",
      message: "Gagal Menyimpan, Server sedang sibuk!",
    };
  }
};
