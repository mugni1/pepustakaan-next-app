"use client";
import BtnClick from "@/components/Admin/Button/BtnClick";
import BtnHref from "@/components/Admin/Button/BtnHref";
import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import TitleForm from "@/components/Admin/Title/TitleForm";
import axios from "axios";
import swal from "sweetalert";
import { useEffect, useRef, useState } from "react";

interface Member {
  id: number;
  username: string;
}

interface Book {
  id: number;
  title: string;
}

export default function Page() {
  const [members, setMembers] = useState([]);
  const [usernameID, setUsernameID] = useState("");
  const [books, setBooks] = useState([]);
  const [titleID, setTitleID] = useState("");
  const returnDate = useRef<HTMLInputElement>(null);
  const dailyFine = useRef<HTMLInputElement>(null);

  // handle Submit
  const handleSubmit = () => {
    event?.preventDefault();
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/borrowings`,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      data: {
        user_id: usernameID,
        book_id: titleID,
        return_date: returnDate.current?.value,
        daily_fine: dailyFine.current?.value,
      },
    })
      .then((res) => {
        console.log(res);
        swal({
          icon: "success",
          title: "Success!",
          text: "Berhasil Meminjam Buku",
        });
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: "Error!",
          text: "Harap coba lagi nanti!",
        });
      });
  };

  // unMount BOOK AND MEMBER
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/users-user`,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }).then((res) => {
      setMembers(res.data.data);
    });

    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/books`,
    }).then((res) => {
      console.log(res);
      setBooks(res.data.data);
    });
  }, []);

  return (
    <MainContainer>
      <Container className="w-8/12 mx-auto flex flex-col gap-5">
        <TitleForm>Tambah Peminjaman</TitleForm>
        <form onSubmit={handleSubmit}>
          {/* input  */}
          <section className="w-full grid grid-cols-2 gap-5 mb-5">
            {/* select members  */}
            <select
              required
              className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md text-slate-600"
              value={usernameID}
              onChange={(e) => setUsernameID(e.target.value)}
            >
              <option value="" disabled>
                - Pilih Anggota -
              </option>
              {members.map((member: Member, index) => (
                <option key={index} value={member.id}>
                  {member.username}
                </option>
              ))}
            </select>
            {/* end select mebers  */}
            {/* select book  */}
            <select
              required
              className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md text-slate-600"
              value={titleID}
              onChange={(e) => setTitleID(e.target.value)}
            >
              <option value="">- Pilih Buku -</option>
              {books.map((book: Book, index) => (
                <option key={index} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
            {/* end select book  */}
            <div className="w-full flex flex-col">
              <label htmlFor="returnDate">Taggal di kembalikan</label>
              <input
                required
                className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md text-slate-600"
                type="date"
                id="returnDate"
                ref={returnDate}
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="dailyFine">Denda telat / hari</label>
              <input
                required
                className="py-1 px-2 outline-purple-600 border border-slate-400 rounded-md text-slate-600"
                type="number"
                placeholder="30000"
                id="dailyFine"
                ref={dailyFine}
              />
            </div>
          </section>
          {/* end input  */}
          {/* btn  */}
          <section className="w-full flex gap-5 items-stretch">
            <BtnClick typeBtn="submit" className="bg-green-500">
              Submit
            </BtnClick>
            <BtnHref href="/dashboard/borrow" className="bg-sky-500 text-white">
              Back
            </BtnHref>
          </section>
          {/* end btn  */}
        </form>
      </Container>
    </MainContainer>
  );
}
