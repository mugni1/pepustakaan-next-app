"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { FileImage, SpinnerGap } from "@phosphor-icons/react";
import MainContainer from "@/components/Admin/MainContainer";
import Container from "@/components/Admin/Container";
import TitleForm from "@/components/Admin/Title/TitleForm";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import Cookies from "js-cookie";

interface Category {
  id: number;
  name: string;
}

export default function Page() {
  //token
  const token = Cookies.get("auth_token");

  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categoeyID, setCategoeyID] = useState("no-select");

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [categories, setCategories] = useState([]);

  // params
  const { id } = useParams();

  // onSubmit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingBtn(true);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/books/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: {
        _method: "put",
        title,
        image,
        writer,
        publisher,
        publication_date: publicationDate,
        stock,
        description,
        category_id: categoeyID,
      },
    })
      .then((res) => {
        swal({
          icon: "success",
          title: "Success!",
          text: res.data.message,
        });
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: "Error!",
          text: "Coba Lagi nanti",
        });
      })
      .finally(() => {
        setLoadingBtn(false);
      });
  }

  // unMount
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
    }).then((res) => {
      setCategories(res.data.data);
    });

    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/books/${id}`,
    }).then((res) => {
      console.log(res.data.data);
      const {
        title,
        writer,
        publisher,
        publication_date,
        stock,
        description,
        category,
      } = res.data.data;
      setTitle(title);
      setWriter(writer);
      setPublisher(publisher);
      setPublicationDate(publication_date);
      setStock(stock);
      setDescription(description);
      setCategoeyID(category == null ? "no-select" : category.id);
    });
  }, []);

  return (
    <MainContainer>
      <Container className=" w-4/6 mx-auto bg-white rounded-xl p-5 gap-5 flex flex-col ">
        <div className="flex flex-col">
          <TitleForm>
            <span>Edit Buku</span>
          </TitleForm>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full grid grid-cols-2 gap-5"
        >
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Judul Buku"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Penulis Buku"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
          />
          <input
            type="text"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Penerbit Buku"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
          <input
            type="number"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <input
            type="date"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            placeholder="Tahun Terbit"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
          />
          <select
            name="category"
            id="category"
            className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md "
            value={categoeyID}
            onChange={(e) => setCategoeyID(e.target.value)}
            required
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
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
          <textarea
            className="col-span-2 py-1 px-2 outline-purple-600 border border-slate-400 rounded-md"
            rows={8}
            placeholder="Deskripsi Buku"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <section className=" flex gap-5 items-stretch">
            <BtnClick className="bg-green-500">
              {loadingBtn ? (
                <SpinnerGap className="animate-spin" size={24} />
              ) : (
                <span>Kirim</span>
              )}
            </BtnClick>
            <BtnHref href="/dashboard/books" className="bg-sky-500 text-white">
              Back
            </BtnHref>
          </section>
        </form>
      </Container>
    </MainContainer>
  );
}
