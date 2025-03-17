"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import NavigationBar from "@/components/utilities/NavigationBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body>
        {children}
        {!pathName.startsWith("/dashboard/") && <NavigationBar />}
      </body>
    </html>
  );
}
