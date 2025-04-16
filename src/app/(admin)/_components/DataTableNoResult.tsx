import React from "react";

export default function DataTableNoResult() {
  return (
    <tr>
      <td
        colSpan={20}
        className="text-center border font-bold py-5 text-accent2"
      >
        <span className="text-red-500 text-lg">Tidak ada data</span>
      </td>
    </tr>
  );
}
