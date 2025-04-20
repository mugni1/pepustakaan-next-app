import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <main className="w-full mx-auto p-5 container font-gabarito min-h-screen">
      {children}
    </main>
  );
}
