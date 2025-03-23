import BtnHref from "@/components/Admin/Button/BtnHref";
import React from "react";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-full flex flex-col justify-center items-center ">
        <span className="text-2xl text-red-600 poppins-bold">403</span>
        <h1 className="text-xl poppins-semibold">Forbiden</h1>
        <p className="mb-5">Your are not allow access this page</p>
        <BtnHref href="/login">Login</BtnHref>
      </div>
    </div>
  );
}
