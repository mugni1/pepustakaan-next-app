import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  //   return NextResponse.json(file.name); // blob.url = link publik
  const blob = await put(file.name, file, {
    access: "public", // biar bisa dilihat semua orang
  });

  return NextResponse.json(blob); // blob.url = link publik
}
