export default function TableHead() {
  return (
    <thead>
      <tr>
        <th className="py-4 font-bold bg-accent2/10 text-accent2 border w-2/12">
          Gambar
        </th>
        <th className="font-bold bg-accent2/10 text-accent2 border w-2/12">
          Judul
        </th>
        <th className="font-bold bg-accent2/10 text-accent2 border w-2/12">
          Penulis
        </th>
        <th className="font-bold bg-accent2/10 text-accent2 border w-2/12">
          Penerbit
        </th>
        <th className="font-bold bg-accent2/10 text-accent2 border w-2/12">
          Stock
        </th>
        <th className="font-bold bg-accent2/10 text-accent2 border w-2/2">
          Tindakan
        </th>
      </tr>
    </thead>
  );
}
