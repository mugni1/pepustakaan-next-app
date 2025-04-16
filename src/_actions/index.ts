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
    revalidatePath("/dashboard/home");
    revalidatePath("/dashboard/transaction-borrow");
    revalidatePath("/dashboard/history-transaction-all");
    revalidatePath("/dashboard/history-transaction-borrow");
    return {
      status: "success",
      message: "Berhasil Meminjam buku",
    };
  } catch {
    return {
      status: "failed",
      message: "Terjadi Kesalah, Coba lagi nanti",
    };
  }
};
const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/jfif",
];
const createBookValidateSchema = z.object({
  title: z.string().min(1, "Masukan Judul Buku"),
  writer: z.string().min(1, "Masukan Penulis Buku"),
  publisher: z.string().min(1, "Masukan Penerbit Buku"),
  stock: z.string().min(1, "Masukan Stock Buku"),
  publication_date: z.string().min(1, "Masukan Tahun Terbit Buku"),
  category: z.string().min(1, "Pilih salah satu kategori"),
  image: z
    .instanceof(File)
    .refine((file) => file.size < MAX_IMAGE_SIZE, {
      message: "Ukuran gambar maksimal 3MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Masukan gambar dengan Format harus JPG, PNG, WebP, atau JFIF",
    }),
  description: z.string().min(1, "Masukan Deskripsi"),
});
// createbook
export const createBook = async (prevData: any, formData: FormData) => {
  const token = (await cookies()).get("auth_token")?.value;
  const dataBody = createBookValidateSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!dataBody.success) {
    return {
      status: "warning",
      message: "Harap isi semua form dengan benar!",
      Error: dataBody.error.flatten().fieldErrors,
    };
  }

  try {
    const form = new FormData();
    form.append("title", dataBody.data.title);
    form.append("writer", dataBody.data.writer);
    form.append("publisher", dataBody.data.publisher);
    form.append("publication_date", dataBody.data.publication_date);
    form.append("stock", dataBody.data.stock);
    form.append("category_id", dataBody.data.category);
    form.append("description", dataBody.data.description);
    form.append("image", dataBody.data.image);

    const res = await fetch(`${baseApiURL}/books`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: form,
    });
    if (!res.ok) {
      return {
        status: "failed",
        message: "Gagal Menyimpan Buku",
      };
    }
    return {
      status: "success",
      message: "Berhasil Menyimpan Buku",
    };
  } catch {
    return {
      status: "failed",
      message: "Koneksi Error, Coba lagi nanti",
    };
  }
};
// return book
export const returnBook = async (id: number) => {
  const token = (await cookies()).get("auth_token")?.value;
  try {
    const res = await fetch(`${baseApiURL}/borrowings/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    if (!res.ok) {
      return {
        status: "failed",
        message: "Terjadi Kesalah saat mengembalikan buku",
      };
    }
    revalidatePath("/dashboard/home");
    revalidatePath("/dashboard/transaction-borrow");
    revalidatePath("/dashboard/transaction-return");
    revalidatePath("/dashboard/transaction-late");
    revalidatePath("/dashboard/history-transaction-all");
    revalidatePath("/dashboard/history-transaction-return");
    revalidatePath("/dashboard/history-transaction-fine");
    const text = await res.text();
    const json = JSON.parse(text);
    const message = json.message;
    return {
      status: "success",
      message: message,
    };
  } catch {
    return {
      status: "failed",
      message: "Ada Kesalahan, Silahkan coba lagi nanti",
    };
  }
};

const categoryValidateSchema = z.object({
  name: z.string().min(1, "Harap Masukan Nama Kategori"),
});
// create category
export const createCategory = async (prevState: any, formData: FormData) => {
  const token = (await cookies()).get("auth_token")?.value;
  const dataBody = categoryValidateSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!dataBody.success) {
    return {
      status: "warning",
      message: "Harap isi semua form dengan benar dan coba lagi",
      Error: dataBody.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${baseApiURL}/categories`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // penting untuk JSON
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: dataBody.data.name,
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
    revalidatePath("/dashboard/category");
    revalidatePath("/dashboard/home");
    return {
      status: "success",
      message: "Berhasil Menyimpan Kategori",
    };
  } catch {
    return {
      status: "failed",
      message: "Terjadi Kesalah, Coba lagi nanti",
    };
  }
};
// update category
export const updateCategory = async (
  id: number,
  prevState: any,
  formData: FormData
) => {
  const token = (await cookies()).get("auth_token")?.value;
  const dataBody = categoryValidateSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!dataBody.success) {
    return {
      status: "warning",
      message: "Harap isi semua form dengan benar dan coba lagi",
      Error: dataBody.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${baseApiURL}/categories/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // penting untuk JSON
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: dataBody.data.name,
        _method: "put",
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
    revalidatePath("/dashboard/category");
    revalidatePath("/dashboard/home");
    return {
      status: "success",
      message: "Berhasil Menyimpan Kategori",
    };
  } catch {
    return {
      status: "failed",
      message: "Terjadi Kesalah, Coba lagi nanti",
    };
  }
};
// delete category
export const deleteCategory = async (id: number) => {
  const token = (await cookies()).get("auth_token")?.value;
  try {
    const res = await fetch(`${baseApiURL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const text = await res.text();
      const json = JSON.parse(text);
      const message = json.message;
      return {
        status: "failed",
        message: message,
      };
    }
    revalidatePath("/dashboard/category");
    revalidatePath("/dashboard/home");
    return {
      status: "success",
      message: "Berhasil Menghapus Kategori",
    };
  } catch {
    return {
      status: "failed",
      message: "Terjadi Kesalahan, Coba lagi nanti",
    };
  }
};
