import { auth } from "@/auth";
import CreateSnips from "@/components/CreateSnips";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");
  return (
    <div className="w-full  flex flex-col  justify-center items-center p-2">
      <CreateSnips />
    </div>
  );
};

export default page;
