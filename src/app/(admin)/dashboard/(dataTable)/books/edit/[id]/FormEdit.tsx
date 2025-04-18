"use client";
import { FileImage } from "@phosphor-icons/react";
import { editBook } from "@/_actions";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import SaveAndBackBtn from "@/app/(admin)/_components/SaveAndBackBtn";

interface Book {
  id: number;
  title: string;
  image: string;
  writer: string;
  publisher: string;
  publication_date: string;
  description: string;
  stock: number;
  category: Category;
  created_at: string;
  updated_at: string;
}
interface Category {
  id: number;
  name: string;
}

export default function FormEdit({
  categories,
  book,
}: {
  categories: Category[];
  book: Book;
}) {
  const edtiBookWithID = editBook.bind(null, book.id);
  const [state, formAction] = useActionState(edtiBookWithID, null);
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
    <form action={formAction} className="flex flex-col">
      {/* input  */}
      <section className="w-full grid grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col">
          <input
            defaultValue={book.title}
            type="text"
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md "
            placeholder="Judul Buku"
            name="title"
          />
          <i className="text-xs text-red-500">{state?.Error?.title}</i>
        </div>
        <div className="flex flex-col">
          <input
            defaultValue={book.writer}
            type="text"
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md "
            placeholder="Penulis Buku"
            name="writer"
          />
          <i className="text-xs text-red-500">{state?.Error?.writer}</i>
        </div>
        <div className="flex flex-col">
          <input
            defaultValue={book.publisher}
            type="text"
            className="py-1 px-2 outline-accent2 border border-foreground/50 rounded-md "
            placeholder="Penerbit Buku"
            name="publisher"
          />
          <i className="text-xs text-red-500">{state?.Error?.publisher}</i>
        </div>
        <div className="flex flex-col">
          <input
            defaultValue={book.stock}
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
            defaultValue={book.publication_date}
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
            defaultValue={book.category.id}
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
            defaultValue={book.description}
            className=" py-1 px-2 outline-accent2 border border-foreground/50 rounded-md"
            rows={8}
            placeholder="Deskripsi Buku"
            name="description"
          ></textarea>
          <i className="text-xs text-red-500">{state?.Error?.description}</i>
        </div>
      </section>
      {/* end input  */}
      <SaveAndBackBtn backLink="books" />
    </form>
  );
}
