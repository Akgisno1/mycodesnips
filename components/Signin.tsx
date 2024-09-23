import { signIn } from "@/auth";
import { Button } from "./ui/button";

export default async function SignIn() {
  return (
    <div>
      {/* GitHub Sign In */}
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
      >
        <Button
          type="submit"
          className="bg-black hover:bg-white hover:text-black text-white  w-full"
        >
          Sign In with GitHub
        </Button>
      </form>
      {/* Google Sign In */}
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <Button
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white  w-full mt-4"
        >
          Sign In with Google
        </Button>
      </form>
    </div>
  );
}
