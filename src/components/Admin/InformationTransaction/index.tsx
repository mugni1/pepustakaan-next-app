import React from "react";

interface InformationTrans {
  id: number | string;
  borrow_date: string;
  return_date: string;
  actual_return_date: string;
  daily_fine: number;
  status: string;
  amount?: number | null | string;
}

export default function InformationTransaction({
  id,
  borrow_date,
  return_date,
  actual_return_date,
  daily_fine,
  status,
  amount,
}: InformationTrans) {
  const returnDate = new Date(return_date).getTime();
  const actualReturn = new Date(actual_return_date).getTime();
  const satuHari = 1000 * 60 * 60 * 24;

  return (
    <>
      <section className="flex justify-between mb-4 items-center">
        <h1 className="text-xl poppins-bold bg-sky-200 text-sky-500 rounded-lg px-3">
          ID : {id}
        </h1>
        <h1
          className={`text-xl px-3  poppins-semibold rounded-lg 
              ${status == "dipinjam" && "text-amber-500 bg-amber-200"} 
              ${status == "peminjaman" && "text-amber-500 bg-amber-200"} 
              ${status == "dikembalikan" && "text-green-500 bg-green-200"}
              ${status == "pengembalian" && "text-green-500 bg-green-200"}
              ${status == "terlambat" && "text-red-500 bg-red-200"}
              ${status == "denda" && "text-red-500 bg-red-200"}
              `}
        >
          {status.toUpperCase() ?? "noStatus"}
        </h1>
      </section>
      <hr />
      <section className="my-4 w-full flex flex-col gap-2 poppins-semibold">
        <table>
          <tbody>
            <tr>
              <td className="w-4/12">
                <span>Tanggal Dipinjam</span>
              </td>
              <td className="text-amber-500">: {borrow_date}</td>
            </tr>
            <tr>
              <td>
                <span>Tanggal Harus Dikembalikan</span>
              </td>
              <td className="text-green-500">: {return_date}</td>
            </tr>
            <tr>
              <td>
                <span>Tanggal Kenyataan Dikembalikan</span>
              </td>
              <td className="text-sky-500">: {actual_return_date ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <span>Denda Jika telat / hari</span>
              </td>
              <td>: Rp{daily_fine.toLocaleString("id-ID")}</td>
            </tr>

            <tr>
              <td>Total denda</td>
              {status == "terlambat" && (
                <td>
                  <span className="text-red-500">
                    : Rp
                    {(
                      (Math.floor(actualReturn - returnDate) / satuHari) *
                      daily_fine
                    ).toLocaleString("id-ID")}
                  </span>
                </td>
              )}
              {!amount ? (
                status != "terlambat" && <td>: Tidak ada denda</td>
              ) : (
                <td className="text-red-500">
                  : Rp{amount.toLocaleString("id-ID")}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
