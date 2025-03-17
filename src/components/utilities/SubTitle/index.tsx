"use client";

import { Fire } from "@phosphor-icons/react";
import { ReactNode } from "react";

export default function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h4 className="poppins-bold flex items-center gap-2 text-xl">
      <Fire size={24} /> {children}
    </h4>
  );
}
