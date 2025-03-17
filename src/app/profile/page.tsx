import UserContainer from "@/components/utilities/Container/UserContainer";
import NavigationBar from "@/components/utilities/NavigationBar";

export default function Page() {
  return (
    <UserContainer>
      <section className="w-full md:w-1/2 mx-auto flex flex-col gap-3 rounded-xl shadow-md mt-20 p-5 border border-slate-200">
        <h2 className="font-semibold">Nama User</h2>
        <h1>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci,
          ullam sapiente! Itaque delectus deleniti quia, nesciunt repudiandae
          sint ex quis.
        </h1>
      </section>
    </UserContainer>
  );
}
