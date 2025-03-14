import { ReactNode } from "react";

interface Props {
  click?: () => void;
  typeBtn?: "submit" | "reset" | "button" | undefined;
  className?: string;
  children: ReactNode;
}

export default function BtnClick({
  click = () => {},
  className = "bg-emerald-600 ",
  children = "Btn Name",
  typeBtn = undefined,
}: Props) {
  return (
    <button
      type={typeBtn}
      className={`py-2 px-5 text-white poppins-semibold cursor-pointer rounded-lg active:scale-90 active:bg-slate-500 transition-all ${className}`}
      onClick={click}
    >
      {children}
    </button>
  );
}
