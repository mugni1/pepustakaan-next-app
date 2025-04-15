"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const baseApiURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const borrowValidateSchema = z.object({
  memberID: z.string().min(1, "Harap Pilih Anggota").transform(Number),
  bookID: z.string().min(1, "Harap Pilih Buku").transform(Number),
  returnDate: z.string().min(1, "Masukan Tanggal Pengembalian"),
  dailyFine: z
    .string()
    .min(2, "Harap Masukan Denda Harian dengan benar")
    .transform(Number),
});
export const createBorrow = async (
  prevState: null | { status: string; message: string; Error?: unknown },
  formData: FormData
) => {
  const token = (await cookies()).get("auth_token")?.value;
  const dataBodyValidate = borrowValidateSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!dataBodyValidate.success) {
    return {
      status: "warning",
      message: "Harap isi semua form dengan benar dan coba lagi",
      Error: dataBodyValidate.error.flatten().fieldErrors,
    };
  }
  try {
    const res = await fetch(`${baseApiURL}/borrowings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // penting untuk JSON
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: dataBodyValidate.data?.memberID,
        book_id: dataBodyValidate.data?.bookID,
        return_date: dataBodyValidate.data?.returnDate,
        daily_fine: dataBodyValidate.data?.dailyFine,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      const json = JSON.parse(text);
      const message = json.message;
      return {
        status: "warning",
        message: message,
      };
    }
    revalidatePath("/dashboard/transaction-borrow/add");
    return {
      status: "success",
      message: "Berhasil Meminjam buku",
    };
  } catch {
    return {
      status: "failed",
      message: "Terjadi Kesalah",
    };
  }
};

const createBookValidateSchema = z.object({
  title: z.string().min(1, "Masukan Judul Buku"),
  writer: z.string().min(1, "Masukan Penulis Buku"),
  publisher: z.string().min(1, "Masukan Penerbit Buku"),
  stock: z.string().min(1, "Masukan Stock Buku").transform(Number),
  publication_date: z.string().min(1, "Masukan Tahun Terbit Buku"),
  category: z.string().min(1, "Pilih salah satu kategori").transform(Number),
  description: z.string().min(1, "Masukan Deskripsi"),
});
export const createBook = async (formData: FormData) => {
  const token = (await cookies()).get("auth_token")?.value;
  const dataBody = createBookValidateSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  formData.get("");
  console.log(dataBody);
};
