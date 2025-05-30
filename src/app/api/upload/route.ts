import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const fileName = Date.now() + file.name;
  //   return NextResponse.json(fileName);
  const blob = await put(fileName, file, {
    access: "public", // biar bisa dilihat semua orang
  });

  return NextResponse.json(blob); // blob.url = link publik
}
