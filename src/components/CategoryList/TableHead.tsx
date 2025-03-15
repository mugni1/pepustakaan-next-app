export default function TableHead() {
  return (
    <thead>
      <tr className="border-b border-slate-400 poppins-bold">
        <th className="py-2 mb-2 w-1/12">No</th>
        <th>Nama</th>
        <th className="w-1/12" colSpan={2}>
          Aciton
        </th>
      </tr>
    </thead>
  );
}
