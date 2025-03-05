import { ReactNode } from "react";

export function BtnPrimary({
  children,
  click,
}: {
  children: ReactNode;
  click: () => void;
}) {
  return (
    <button
      onClick={click}
      className="bg-gradient-to-r bg-purple-700 to-fuchsia-500 py-2 rounded-2xl font-bold text-white"
    >
      {children}
    </button>
  );
}
