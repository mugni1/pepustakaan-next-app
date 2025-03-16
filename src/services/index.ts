import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

type Token = string | undefined | null | RequestCookie;

// COUNT
export async function getCount(params: string, token: Token) {
  const res = await fetch(`${baseUrl}/${params}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// BUKU
export async function getBooks() {
  const res = await fetch(`${baseUrl}/books`);
  return res.json();
}
export async function getBooksDetail(id: string) {
  const res = await fetch(`${baseUrl}/books/${id}`);
  return res.json();
}

// KATEGORI
export async function getCategorys() {
  const res = await fetch(`${baseUrl}/categories`);
  return res.json();
}

// ANGGOTA
export async function getMember(token: Token) {
  const res = await fetch(`${baseUrl}/users-user`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// TRANSAKSI PEMINJAMAN
export async function getBorrow(token: Token) {
  const res = await fetch(`${baseUrl}/borrowings-borrow`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
// TRANSAKSI PENGEMBALIAN
export async function getReturn(token: Token) {
  const res = await fetch(`${baseUrl}/borrowings-return`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
// TRANSAKSI TERLAMBAT
export async function getLate(token: Token) {
  const res = await fetch(`${baseUrl}/borrowings-late`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// HISTORY TRANSACTION ALL
export async function getHistoryTransactions(token: Token) {
  const res = await fetch(baseUrl + "/transactions", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
// HISTORY TRANSACTION BORROW
export async function getHistoryTransactionsBorrow(token: Token) {
  const res = await fetch(baseUrl + "/transactions-borrow", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
// HISTORY TRANSACTION RETURN
export async function getHistoryTransactionsReturn(token: Token) {
  const res = await fetch(baseUrl + "/transactions-return", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
// HISTORY TRANSACTION FINE
export async function getHistoryTransactionsFine(token: Token) {
  const res = await fetch(baseUrl + "/transactions-fine", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
