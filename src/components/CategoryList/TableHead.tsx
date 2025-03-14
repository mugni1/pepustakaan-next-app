export default function TableHead() {
  return (
    <thead>
      <tr className="border-b border-slate-400 poppins-bold">
        <th className="py-2 mb-2">No</th>
        <th>Nama</th>
        <th colSpan={2}>Aciton</th>
      </tr>
    </thead>
  );
}
