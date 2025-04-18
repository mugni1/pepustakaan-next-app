import Brand from "./Brand";
import Account from "./Account";
import Navigation from "./Navigation";

export default function Sidebar({ className }: { className: string }) {
  return (
    <aside
      className={`items-center min-h-screen bg-background1 border-e border-slate-200 fixed transition-all ease-in-out  duration-300  ${className}`}
    >
      {/* TITLE DASHBOARD */}
      <Brand />
      {/* END TITLE DASHBOARD  */}

      {/* PROFILE */}
      <Account />
      {/* END PROFILE */}

      {/* LIST NAVIGASI */}
      <Navigation />
      {/* END LIST NAVIGASI  */}
    </aside>
  );
}
