import React from "react";

export default async function NoResult({ q }: { q: string | undefined }) {
  return (
    <section className="w-full h-[60vh] flex justify-center items-center">
      <span className="mx-auto text-center text-xl text-red-500">
        Tidak ada hasil dari{" "}
        <i>
          <b>`{q}`</b>
        </i>
      </span>
    </section>
  );
}
