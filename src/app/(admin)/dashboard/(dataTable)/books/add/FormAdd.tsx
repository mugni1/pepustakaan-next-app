"use client";
import { createBook } from "@/_actions";
import SaveAndBackBtn from "@/app/(admin)/_components/SaveAndBackBtn";
import { FileImage } from "@phosphor-icons/react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
}
export default function FormAdd({ categories }: { categories: Category[] }) {
  const [state, formAction] = useActionState(createBook, null);

  useEffect(() => {
    if (state?.status == "warning") {
      toast.warning(state.message);
    }
    if (state?.status == "success") {
      toast.success(state.message);
    }
    if (state?.status == "failed") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      {/* input  */}
      <section className="w-full grid grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col">
          <input
            type="text"
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md "
            placeholder="Judul Buku"
            name="title"
          />
          <i className="text-xs text-red-500">{state?.Error?.title}</i>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md "
            placeholder="Penulis Buku"
            name="writer"
          />
          <i className="text-xs text-red-500">{state?.Error?.writer}</i>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md "
            placeholder="Penerbit Buku"
            name="publisher"
          />
          <i className="text-xs text-red-500">{state?.Error?.publisher}</i>
        </div>
        <div className="flex flex-col">
          <input
            type="number"
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md "
            placeholder="Stock"
            name="stock"
          />
          <i className="text-xs text-red-500">{state?.Error?.stock}</i>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="publication_date">
            Tahun Terbit
          </label>
          <input
            id="publication_date"
            type="date"
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md "
            placeholder="Tahun Terbit"
            name="publication_date"
          />
          <i className="text-xs text-red-500">
            {state?.Error?.publication_date}
          </i>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="category">
            Kategori
          </label>
          <select
            name="category"
            id="category"
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md "
          >
            <option value="" className="text-foreborder-foreground/50">
              - Pilih Kategori -
            </option>
            {categories?.map((category: Category, index: number) => (
              <option key={index + category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <i className="text-xs text-red-500">{state?.Error?.category}</i>
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
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md w-full"
            name="image"
          />
          <i className="text-xs text-red-500">{state?.Error?.image}</i>
        </div>
        <div className="flex flex-col col-span-2">
          <textarea
            className=" py-1 px-2 outline-accent2 border border-foreground/50 rounded-md"
            rows={8}
            placeholder="Deskripsi Buku"
            name="description"
          ></textarea>
          <i className="text-xs text-red-500">{state?.Error?.description}</i>
        </div>
      </section>
      {/* end input  */}
      {/* btn  */}
      <SaveAndBackBtn backLink="books" />
      {/* end btn  */}
    </form>
  );
}
