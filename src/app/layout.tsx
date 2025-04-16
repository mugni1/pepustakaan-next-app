import { Gabarito } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const gabarito = Gabarito({
  variable: "--font-gabarito-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${gabarito.variable} antialiased`}>
        {children}
        <ToastContainer position="bottom-right" className="font-sans" />
      </body>
    </html>
  );
}
