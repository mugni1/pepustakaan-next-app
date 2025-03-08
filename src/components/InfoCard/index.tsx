import Link from "next/link";
import { ReactNode } from "react";

export default function InfoCard({
  className,
  children,
  count,
  title,
  href,
}: {
  className?: string;
  children: ReactNode;
  count: number;
  title: string;
  href: string;
}) {
  return (
    <div className="column-1 p-4  flex flex-col gap-3 bg-white rounded-xl shadow-lg">
      {/* logo dan title */}
      <div className="w-full flex items-center gap-4">
        <span className={`p-3 text-white rounded-full ${className}`}>
          {children}
        </span>
        <b className="text-2xl">
          {count} {title}
        </b>
      </div>
      {/* edn logo dan title */}
      <hr />
      {/* show detail */}
      <Link href={href} className="w-full text-center">
        Lihat detail
      </Link>
      {/* end show detail */}
    </div>
  );
}
