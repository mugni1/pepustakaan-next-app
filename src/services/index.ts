import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// env
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
type Token = string | undefined | null | RequestCookie;

// COUNT
export async function getCount(params: string, token: Token) {
  try {
    const res = await fetch(`${baseUrl}/${params}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
    redirect("/login");
  }
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

// TRANSAKSI
export async function getTransaction(token: Token, url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
export async function getTransactionDetails(id: string) {
  const auth_token = (await cookies()).get("auth_token")?.value;
  const res = await fetch(`${baseUrl}/borrowings/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
  });
  if (!res.ok) {
    return {
      data: {
        status: false,
        message: "Failed fetch data",
      },
    };
  }
  return res.json();
}

// HISTORY TRANSACTION ALL
export async function getHistoryTransaction(token: Token, url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
export async function getHistoryTransactionDetails(id: string) {
  const auth_token = (await cookies()).get("auth_token")?.value;
  const res = await fetch(`${baseUrl}/transactions/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
  });
  return res.json();
}
export async function getCountHistoryTrans(status: string, year?: string) {
  const auth_token = (await cookies()).get("auth_token")?.value;

  let url = `http://localhost:8000/api/transactions-${status}-data`;
  if (year) {
    url = `http://localhost:8000/api/transactions-${status}-data?year=${year}`;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
  return res.json();
}

/////////////   FOR USER   //////////////////////
export async function getBorrowBookUser(token: Token) {
  const res = await fetch(`${baseUrl}/borrowings-borrow-user`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
export async function getReturnBookUser(token: Token) {
  const res = await fetch(`${baseUrl}/borrowings-return-user`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
