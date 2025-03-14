const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

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
  const res = await fetch(`${baseUrl}/categories`, {
    cache: "force-cache",
    next: { revalidate: 60 * 60 },
  });
  return res.json();
}
