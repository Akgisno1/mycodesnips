import Login from "@/components/Login";
import SignIn from "@/components/Signin";
import { getSession } from "@/lib/getSession";

import { redirect } from "next/navigation";

import React from "react";

const page = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");
  return (
    <div className="w-full h-[90vh] flex flex-col gap-4 justify-center items-center">
      <div className="w-[400px] flex flex-col gap-4 p-4 bg-accent text-accent-foreground shadow-md rounded-lg">
        <Login />
        <SignIn />
      </div>
    </div>
  );
};

export default page;
