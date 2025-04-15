"use client";
import { createBook } from "@/_actions";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import { FileImage } from "@phosphor-icons/react";
import { useActionState } from "react";

interface Category {
  id: number;
  name: string;
}
export default function FormAdd({ categories }: { categories: Category[] }) {
  return (
    <form action={createBook} encType="multipart/form-data">
      {/* input  */}
      <section className="w-full grid grid-cols-2 gap-5 mb-5">
        <input
          type="text"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          placeholder="Judul Buku"
          name="title"
          required
        />
        <input
          type="text"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          placeholder="Penulis Buku"
          name="writer"
          required
        />
        <input
          type="text"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          placeholder="Penerbit Buku"
          name="publisher"
          required
        />
        <input
          type="number"
          className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
          placeholder="Stock"
          name="stock"
          required
        />
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="publication_date">
            Tahun Terbit
          </label>
          <input
            id="publication_date"
            type="date"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Tahun Terbit"
            name="publication_date"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="category">
            Kategori
          </label>
          <select
            name="category"
            id="category"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            required
            defaultValue={"no-select"}
          >
            <option value="no-select" className="text-slate-400" disabled>
              - Pilih Kategori -
            </option>
            {categories?.map((category: Category, index: number) => (
              <option key={index + category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col col-span-2 gap-1">
          <span className=" flex gap-1 items-center font-semibold">
            <FileImage size={24} />
            <label htmlFor="cover">Gambar Buku</label>
          </span>
          <input
            id="cover"
            type="file"
            accept=".jpeg,.jpg,.png,.jfif,.avif,.webp"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md w-full"
            name="cover"
            required
          />
        </div>
        <textarea
          className="col-span-2 py-1 px-2 outline-purple-600 border border-slate-400 rounded-md"
          rows={8}
          placeholder="Deskripsi Buku"
          name="description"
          required
        ></textarea>
      </section>
      {/* end input  */}
      {/* btn  */}
      <section className="w-full flex gap-5 items-stretch">
        <BtnClick typeBtn="submit" className="bg-green-500">
          <span>Kirim</span>
        </BtnClick>
        <BtnHref href="/dashboard/books" className="bg-sky-500 text-white">
          Back
        </BtnHref>
      </section>
      {/* end btn  */}
    </form>
  );
}
