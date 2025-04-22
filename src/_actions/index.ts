"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const baseApiURL = process.env.NEXT_PUBLIC_BASE_API_URL;

// TRANSACTION / BORROWINGS
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
// delete book
export const deleteBorrow = async (id: number) => {
  const token = (await cookies()).get("auth_token")?.value;
  try {
    const res = await fetch(`${baseApiURL}/borrowings/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return {
        status: "failed",
        message: "Gagal Menghapus, Coba lagi nanti",
      };
    }
    revalidatePath("/dashboard/home");
    revalidatePath("/dashboard/transaction-borrow");
    revalidatePath("/dashboard/history-transaction-all");
    revalidatePath("/dashboard/history-transaction-borrow");
    return {
      status: "success",
      message: "Berhasil menghapus pinjaman",
    };
  } catch {
    return {
      status: "failed",
      message: "Gagal Menghapus, Server sedang sibuk",
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

/// BOOK
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
    form.append("file", dataBody.data.image);
    const upload = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: form,
    });
    const blob = await upload.json();
    try {
      const formNew = new FormData();
      formNew.append("title", dataBody.data.title);
      formNew.append("writer", dataBody.data.writer);
      formNew.append("publisher", dataBody.data.publisher);
      formNew.append("publication_date", dataBody.data.publication_date);
      formNew.append("stock", dataBody.data.stock);
      formNew.append("category_id", dataBody.data.category);
      formNew.append("description", dataBody.data.description);
      formNew.append("image", blob.url);
      const res = await fetch(`${baseApiURL}/books`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: formNew,
      });
      if (!res.ok) {
        return {
          status: "failed",
          message: "Gagal Menyimpan Buku",
        };
      }
      revalidatePath("/dashboard/books");
      revalidatePath("/");
      return {
        status: "success",
        message: "Berhasil Menyimpan Buku",
      };
    } catch {
      return {
        status: "failed",
        message: "Gagal Menyimpan Buku, Coba lagi nanti",
      };
    }
  } catch {
    return {
      status: "failed",
      message: "Koneksi Error, Gagal Mengunggah buku",
    };
  }
};
// edit book
const editBookValidateSchema = z.object({
  title: z.string().min(1, "Masukan Judul Buku"),
  writer: z.string().min(1, "Masukan Penulis Buku"),
  publisher: z.string().min(1, "Masukan Penerbit Buku"),
  stock: z.string().min(1, "Masukan Stock Buku"),
  publication_date: z.string().min(1, "Masukan Tahun Terbit Buku"),
  category: z.string().min(1, "Pilih salah satu kategori"),
  image: z.union([
    z
      .instanceof(File)
      .refine((file) => file.size < MAX_IMAGE_SIZE, {
        message: "Ukuran gambar maksimal 3MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Masukan gambar dengan format JPG, PNG, WebP, atau JFIF",
      }),
    z.null(),
  ]),
  description: z.string().min(1, "Masukan Deskripsi"),
});
export const editBook = async (
  id: number,
  prevState: any,
  formData: FormData
) => {
  const token = (await cookies()).get("auth_token")?.value;
  const dataBody = Object.fromEntries(formData.entries());
  const rawImage = formData.get("image"); /// ambil data
  (dataBody as any).image =
    rawImage instanceof File && rawImage.size > 0 ? rawImage : null; // jika file tidak di upload maka ubah ke null
  const dataBodyValidate = editBookValidateSchema.safeParse(dataBody);
  if (!dataBodyValidate.success) {
    return {
      status: "warning",
      message: "Harap isi semua form dengan benar",
      Error: dataBodyValidate.error.flatten().fieldErrors,
    };
  }

  try {
    //formData
    const form = new FormData();
    form.append("title", dataBodyValidate.data.title);
    form.append("writer", dataBodyValidate.data.writer);
    form.append("publisher", dataBodyValidate.data.publisher);
    form.append("publication_date", dataBodyValidate.data.publication_date);
    form.append("stock", dataBodyValidate.data.stock);
    form.append("category_id", dataBodyValidate.data.category);
    form.append("description", dataBodyValidate.data.description);
    if (dataBodyValidate.data.image != null) {
      form.append("image", dataBodyValidate.data.image);
    }
    form.append("_method", "PUT");
    const res = await fetch(`${baseApiURL}/books/${id}`, {
      method: "post",
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
    revalidatePath("/dashboard/books/edit/" + id);
    revalidatePath("/dashboard/books");
    revalidatePath("/");
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
