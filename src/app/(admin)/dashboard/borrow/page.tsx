import BorrowList from "@/components/BorrowList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Borrowings",
};

export default function Page() {
  return <BorrowList />;
}
