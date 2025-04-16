import MainContainer from "@/components/Admin/MainContainer";
import React, { ReactNode } from "react";

export default function HomeLayout({
  children,
  chart,
}: {
  children: ReactNode;
  chart: ReactNode;
}) {
  return (
    <MainContainer>
      {children}
      {chart}
    </MainContainer>
  );
}
