import { ReactNode } from "react";

interface Props {
  click?: () => void;
  typeBtn?: "submit" | "reset" | "button" | undefined;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

export default function BtnClick({
  click = () => {},
  className = "bg-emerald-600 ",
  children = "Btn Name",
  typeBtn = undefined,
  disabled,
}: Props) {
  return (
    <button
      type={typeBtn}
      disabled={disabled}
      className={`py-1 px-5 text-white font-semibold rounded-md active:scale-90 active:bg-slate-500 transition-all shadow-md ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      onClick={click}
    >
      {children}
    </button>
  );
}
