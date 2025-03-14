import { ReactNode } from "react";

export default function Container({
  children,
  className = "w-full",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`p-5 rounded-xl shadow-lg bg-white ${className}`}>
      {children}
    </section>
  );
}
