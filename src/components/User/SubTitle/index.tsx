"use client";

import { Books } from "@phosphor-icons/react";
import { ReactNode } from "react";

export default function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h4 className="poppins-semibold flex items-center gap-2 text-xl">
      <Books size={24} /> {children}
    </h4>
  );
}
