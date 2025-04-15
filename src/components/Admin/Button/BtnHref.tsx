import Link from "next/link";

interface Props {
  href?: string;
  children: React.ReactNode;
  className?: string;
}
export default function BtnHref({
  href = "#",
  children = "Title",
  className = " bg-gradient-to-r from-accent1 to-accent2 text-background1",
}: Props) {
  return (
    <Link
      href={href}
      className={`py-1 px-5 rounded-md shadow-md font-semibold flex items-center gap-1 active:scale-90 active:bg-foreground transition-all ${className}`}
    >
      {children}
    </Link>
  );
}
