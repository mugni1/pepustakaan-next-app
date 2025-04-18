"use client";
import { useActionState, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import SaveAndBackBtn from "@/app/(admin)/_components/SaveAndBackBtn";
import { User } from "@/_types/User";
import { updateAdmin } from "@/_actions/AdminEdit";

export default function FormEdit({ member }: { member: User }) {
  const updateWithID = updateAdmin.bind(null, member.id);
  const [isPassword, setIsPassword] = useState(true);
  const [state, formAction] = useActionState(updateWithID, null);

  useEffect(() => {
    if (state?.status == "success") {
      toast.success(state.message);
    }
    if (state?.status == "warning") {
      toast.warning(state.message);
    }
    if (state?.status == "failed") {
      toast.warning(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      {/* input  */}
      <section className="w-full grid grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            className="py-1 px-3 rounded-md outline-accent2 border border-foreground/70 text-foreground w-full"
            placeholder="Nama Lengkap"
            name="full_name"
            defaultValue={member.full_name}
          />
          <i className="text-xs text-red-500">{state?.Error?.full_name}</i>
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            className="py-1 px-3 rounded-md outline-accent2 border border-foreground/70 text-foreground w-full"
            placeholder="username"
            maxLength={10}
            name="username"
            defaultValue={member.username}
          />
          <i className="text-xs text-red-500">{state?.Error?.username}</i>
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            className="py-1 px-3 rounded-md outline-accent2 border border-foreground/70 text-foreground w-full"
            placeholder="email"
            name="email"
            defaultValue={member.email}
          />
          <i className="text-xs text-red-500">{state?.Error?.email}</i>
        </div>
        <div className="relative flex flex-col gap-1">
          <div className="relative">
            <input
              type={isPassword ? "password" : "text"}
              className="py-1 px-3 rounded-md outline-accent2 border border-foreground/70 text-foreground w-full"
              placeholder="Password baru (opsional)"
              maxLength={8}
              name="password"
            />
            <span
              onClick={() => setIsPassword(!isPassword)}
              className="absolute top-0 bottom-0 h-full right-2 flex items-center cursor-pointer select-none text-foreground/70"
            >
              {isPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
          <i className="text-xs text-red-500">{state?.Error?.password}</i>
        </div>
      </section>
      {/* end input  */}
      {/* btn  */}
      <SaveAndBackBtn backLink="admin" />
      {/* end btn  */}
    </form>
  );
}
