export default function TableHead() {
  return (
    <thead>
      <tr className="border-b border-slate-400 poppins-bold">
        <th className="py-2 mb-2">Gambar</th>
        <th>Judul</th>
        <th>Penulis</th>
        <th>Penerbit</th>
        <th>Stock</th>
        <th colSpan={3} className="w-1/12">
          Aciton
        </th>
      </tr>
    </thead>
  );
}
