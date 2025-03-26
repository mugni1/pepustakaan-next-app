"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mendefinisikan tipe array objek untuk peminjaman dan pengembalian
export function SimpleBarChart({
  peminjaman,
  pengembalian,
  denda,
}: {
  peminjaman: { peminjaman: number }[]; // Array of objects with peminjaman
  pengembalian: { pengembalian: number }[];
  denda: { denda: number }[]; // Array of objects with pengembalian
}) {
  const bulan = [
    { name: "Jan" },
    { name: "Feb" },
    { name: "Mar" },
    { name: "Apr" },
    { name: "Mei" },
    { name: "Jun" },
    { name: "Jul" },
    { name: "Aug" },
    { name: "Sep" },
    { name: "Okt" },
    { name: "Nov" },
    { name: "Des" },
  ];

  // Gabungkan data bulan, peminjaman, dan pengembalian
  const data = bulan.map((item, index) => ({
    name: item.name,
    peminjaman: peminjaman[index]?.peminjaman || 0, // Mengambil nilai peminjaman atau 0 jika tidak ada
    pengembalian: pengembalian[index]?.pengembalian || 0, // Mengambil nilai pengembalian atau 0 jika tidak ada
    denda: denda[index]?.denda || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="peminjaman" fill="orange" />
        <Bar dataKey="pengembalian" fill="green" />
        <Bar dataKey="denda" fill="red" />
      </BarChart>
    </ResponsiveContainer>
  );
}
