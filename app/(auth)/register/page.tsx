import Register from "@/components/Register";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");
  return (
    <div className="w-full h-[90vh] flex flex-col gap-4 justify-center items-center">
      <Register />
    </div>
  );
};

export default page;
