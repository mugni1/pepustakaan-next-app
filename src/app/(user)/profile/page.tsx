import UserContainer from "@/components/User/Container/UserContainer";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Pustaka - Profile",
};

export default async function Page() {
  const cookieStore = await cookies();
  const fullName = cookieStore.get("fullName")?.value || "Anonim";
  const username = cookieStore.get("username")?.value || "Anonim";
  const roleName = cookieStore.get("roleName")?.value || "No have role";
  const email = cookieStore.get("email")?.value || "anonim";

  return (
    <UserContainer>
      <section className="w-full md:w-4/12 mx-auto flex flex-col gap-3 rounded-xl shadow-md mt-20 p-5 border border-slate-200">
        <div className="w-6/12 aspect-square mx-auto rounded-full overflow-hidden">
          <Image
            src="/blankprofile.webp"
            alt=""
            className="w-full h-full object-cover scale-125"
            height={200}
            width={200}
          />
        </div>
        <h1 className="poppins-bold text-center text-xl">{fullName}</h1>
        <div className="flex flex-col text-sm">
          <span className="poppins-semibold">More Information</span>
          <p>Username : {username}</p>
          <p>Email : {email}</p>
          <p>Roles : {roleName}</p>
        </div>
      </section>
    </UserContainer>
  );
}
