import BookDetails from "@/components/Admin/BookDetail";
import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import { getTransactionDetails } from "@/services";
import { cookies } from "next/headers";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const { id } = await params;

  // result transaction details
  const { data } = await getTransactionDetails(authToken, id);

  return (
    <MainContainer>
      <Container>
        {/* header  */}
        <section className="flex justify-between mb-4 items-center">
          <h1 className="text-xl poppins-bold">ID : {id}</h1>
          <h1
            className={` py-1 px-5 text-xl poppins-semibold rounded-lg ${
              data?.status == "dipinjam" && "text-amber-500 bg-amber-200"
            } ${data?.status == "dikembalikan" && "text-green-500 bg-green-200"}
              ${data?.status == "terlambat" && "text-red-500 bg-red-200"}`}
          >
            {data?.status ?? "noStatus"}
          </h1>
        </section>
        {/* end header  */}
        <hr />
        <section className="my-4 w-full flex flex-col gap-2 poppins-semibold">
          <table>
            <tbody>
              <tr>
                <td className="w-4/12">
                  <span>Tanggal Dipinjam</span>
                </td>
                <td className="text-amber-500">: {data.borrow_date}</td>
              </tr>
              <tr>
                <td>
                  <span>Tanggal Harus Dikembalikan</span>
                </td>
                <td className="text-green-500">: {data.return_date}</td>
              </tr>
              <tr>
                <td>
                  <span>Tanggal Kenyataan Dikembalikan</span>
                </td>
                <td className="text-sky-500">
                  : {data?.actual_return_date ?? "-"}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Denda Jika telat / hari</span>
                </td>
                <td>: Rp{data.daily_fine.toLocaleString("id-ID")}</td>
              </tr>

              <tr>
                <td>Total denda</td>
                {data.status == "terlambat" && (
                  <td>
                    <span className="text-red-500">
                      : Rp
                      {(
                        (Math.ceil(
                          new Date(data.actual_return_date).getTime() -
                            new Date(data.return_date).getTime()
                        ) /
                          (1000 * 60 * 60 * 24)) *
                        data.daily_fine
                      ).toLocaleString("id-ID")}
                    </span>
                  </td>
                )}
                {data.status != "terlambat" && <td>: tidak ada denda</td>}
              </tr>
            </tbody>
          </table>
        </section>
        <hr />
        {/* book  */}
        <BookDetails
          image={data.book.image}
          title={data.book.title}
          writer={data.book.writer}
          category={data.book.category.name}
          publisher={data.book.publisher}
          stock={data.book.stock}
          publication_date={data.book.publication_date}
          description={data.book.description}
        />
        {/* end book  */}
        <hr />
        {/* user detil  */}
        <section className="w-full flex flex-col py-4">
          <h2 className="font-semibold text-xl poppins-semibold mb-1">
            Detail Peminjam
          </h2>
          <table className="border rounded-lg border-slate-600 w-full">
            <thead>
              <tr className="bg-purple-300 w-full">
                <th className="py-3 w-3/12">Nama Lengkap</th>
                <th className="w-3/12">Username</th>
                <th className="w-3/12">Email</th>
                <th className="w-3/12">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center py-3 w-3/12">Nama Lengkap</td>
                <td className="text-center w-3/12">Username</td>
                <td className="text-center w-3/12">Email</td>
                <td className="text-center w-3/12">Role</td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* end user detail  */}
      </Container>
    </MainContainer>
  );
}
