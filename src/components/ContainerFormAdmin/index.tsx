import { ReactNode } from "react";

export default function ContainerFormAdmin({
  isActive,
  title,
  children,
}: {
  isActive: boolean;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <section
        className={`${
          isActive ? "visible opacity-100" : "invisible opacity-0"
        } fixed top-0 right-0 bottom-0 left-0 min-h-screen w-full flex justify-center z-40 backdrop-blur-sm backdrop-brightness-75 transition-all ease-in-out duration-300 overflow-y-auto`}
      >
        <div
          className={` ${
            isActive ? "sclae-100" : "scale-50"
          } absolute w-full  md:w-1/2 bg-white md:mx-auto top-5 p-5 rounded-xl flex flex-col gap-5 transition-all ease-in-out duration-300`}
        >
          <h1 className="w-full text-center text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-700 text-transparent bg-clip-text">
            {title}
          </h1>
          {children}
        </div>
      </section>
    </>
  );
}
