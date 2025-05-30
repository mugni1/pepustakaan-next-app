import BtnHref from "@/components/Admin/Button/BtnHref";
import Container from "@/components/Admin/Container";
import MainContainer from "@/components/Admin/MainContainer";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard - Profile",
};

export default async function Page() {
  const cookieStore = await cookies();
  const id = cookieStore.get("id")?.value || 0;
  const fullName = cookieStore.get("fullName")?.value || "Anonim";
  const email = cookieStore.get("email")?.value || "Anonim";
  const username = cookieStore.get("username")?.value || "Anonim";
  const roleName = cookieStore.get("roleName")?.value || "Anonim";

  return (
    <MainContainer>
      <Container className="w-4/12 mx-auto flex flex-col gap-2">
        <div className="w-4/12 mx-auto rounded-full aspect-square bg-emerald-500 overflow-hidden flex items-center justify-center">
          <span className="text-6xl text-white font-bold">
            {fullName.substring(0, 1)}
          </span>
        </div>
        <h3 className=" w-full text-center font-semibold text-xl">
          {fullName}
        </h3>
        <div className=" w-full flex items-center justify-center flex-col gap-1 text-foreground/70 text-sm">
          <h2 className="font-semibold">Detail Informasi</h2>
          <p>Username : {username}</p>
          <p>Email : {email}</p>
          <p>Peran : {roleName == "superUser" ? "Admin" : "Tidak diketahui"}</p>
        </div>
        <div className="w-full flex justify-center">
          <BtnHref
            className="bg-amber-500 text-background1"
            href={`/dashboard/admin/edit/${id}`}
          >
            Edit Akun
          </BtnHref>
        </div>
      </Container>
    </MainContainer>
  );
}
