export default function TableHead() {
  return (
    <thead>
      <tr>
        <th className="py-4 font-bold bg-accent2/10 text-accent2 border">
          Gambar
        </th>
        <th className="font-bold bg-accent2/10 text-accent2 border">Judul</th>
        <th className="font-bold bg-accent2/10 text-accent2 border">Penulis</th>
        <th className="font-bold bg-accent2/10 text-accent2 border">
          Penerbit
        </th>
        <th className="font-bold bg-accent2/10 text-accent2 border">Stock</th>
        <th className="font-bold bg-accent2/10 text-accent2 border w-1/2">
          Tindakan
        </th>
      </tr>
    </thead>
  );
}
