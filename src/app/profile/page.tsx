import UserContainer from "@/components/utilities/Container/UserContainer";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const fullName = cookieStore.get("fullName")?.value;
  const username = cookieStore.get("username")?.value;
  const roleName = cookieStore.get("roleName")?.value;
  const email = cookieStore.get("email")?.value;
  return (
    <UserContainer>
      <section className="w-full md:w-4/12 mx-auto flex flex-col gap-3 rounded-xl shadow-md mt-20 p-5 border border-slate-200">
        <div className="w-6/12 aspect-square mx-auto rounded-full overflow-hidden">
          <img
            src="/blankprofile.webp"
            alt=""
            className="w-full h-full object-cover scale-125"
          />
        </div>
        <h1 className="poppins-bold text-center text-xl">{fullName}</h1>
        <div className="flex flex-col">
          <span className="poppins-semibold">More Information</span>
          <p>Username : {username}</p>
          <p>Email : {email}</p>
          <p>Roles : {roleName}</p>
        </div>
      </section>
    </UserContainer>
  );
}
