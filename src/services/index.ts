import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

export async function getCount(params: string) {
  const res = await fetch(`${baseUrl}/${params}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res.json();
}

export async function getBooks() {
  const res = await fetch(`${baseUrl}/books`);
  return res.json();
}

export async function getBooksDetail(id: string) {
  const res = await fetch(`${baseUrl}/books/${id}`);
  return res.json();
}

export async function getCategorys() {
  const res = await fetch(`${baseUrl}/categories`);
  return res.json();
}

//  MEMBERS
export async function getMember() {
  const res = await fetch(`${baseUrl}/users-user`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res.json();
}

// BORROWINGS BORROWS
export async function getBorrow() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/borrowings-borrow`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );
  return res.json();
}
// BORROWINGS RETURN
export async function getReturn() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/borrowings-return`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );
  return res.json();
}
// BORROWINGS LATE
export async function getLate() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/borrowings-late`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    }
  );
  return res.json();
}

// HISTORY TRANSACTION ALL
export async function getHistoryTransactions() {
  const res = await fetch(baseUrl + "/transactions", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// HISTORY TRANSACTION BORROW
export async function getHistoryTransactionsBorrow() {
  const res = await fetch(baseUrl + "/transactions-borrow", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// HISTORY TRANSACTION RETURN
export async function getHistoryTransactionsReturn() {
  const res = await fetch(baseUrl + "/transactions-return", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// HISTORY TRANSACTION FINE
export async function getHistoryTransactionsFine() {
  const res = await fetch(baseUrl + "/transactions-fine", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
