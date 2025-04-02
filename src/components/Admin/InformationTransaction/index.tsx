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

function getTotalFine(
  return_date: string,
  actual_return_date: string,
  daily_fine: number
) {
  const delayDay = Math.floor(
    new Date(actual_return_date).getTime() - new Date(return_date).getTime()
  );
  const dayOne = 1000 * 60 * 60 * 24;
  const totalDelay = delayDay / dayOne;
  const totalFine = totalDelay * daily_fine;
  return totalFine;
}

function getTotalDelay(return_date: string, actual_return_date: string) {
  const delayDay = Math.floor(
    new Date(actual_return_date).getTime() - new Date(return_date).getTime()
  );
  const dayOne = 1000 * 60 * 60 * 24;
  const totalDelay = delayDay / dayOne;
  return totalDelay;
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
  return (
    <>
      {/* header  */}
      <section className="flex justify-between mb-4 items-center">
        <h1 className="text-xl poppins-bold bg-sky-200 text-sky-500 rounded-lg px-3 py-1">
          ID : {id}
        </h1>
        <h1
          className={`text-xl px-3  poppins-semibold rounded-lg py-1 
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
      {/* end heder  */}
      <section className="my-4 w-full flex flex-col gap-2 poppins-semibold">
        <table>
          <tbody>
            {/* borrow_date */}
            <tr>
              <td className="w-4/12">
                <span>Tgl Peminjaman</span>
              </td>
              <td className="text-amber-500">: {borrow_date}</td>
            </tr>
            {/* return_date  */}
            <tr>
              <td>
                <span>Tgl Pengembalian</span>
              </td>
              <td className="text-green-500">: {return_date}</td>
            </tr>
            {/* actual_return_date  */}
            <tr>
              <td>
                <span>Tgl Dikembalikan</span>
              </td>
              <td className="text-sky-500">: {actual_return_date ?? "-"}</td>
            </tr>
            {/* daily fine  */}
            <tr>
              <td>
                <span>Denda telat / hari</span>
              </td>
              <td>: Rp{daily_fine.toLocaleString("id-ID")}</td>
            </tr>
            {/* total fine  */}
            <tr>
              <td>Total denda</td>
              {status == "terlambat" && (
                <td>
                  <span className="text-red-500">
                    : Rp
                    {getTotalFine(
                      return_date,
                      actual_return_date,
                      daily_fine
                    ).toLocaleString("id-ID")}{" "}
                    - Telat {getTotalDelay(return_date, actual_return_date)}{" "}
                    hari
                  </span>
                </td>
              )}
              {/* for history  */}
              {!amount ? (
                status != "terlambat" && <td>: Tidak ada denda</td>
              ) : (
                <td className="text-red-500">
                  : Rp{amount.toLocaleString("id-ID")} - Telat{" "}
                  {getTotalDelay(return_date, actual_return_date)} hari
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
