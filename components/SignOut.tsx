import { auth, signOut } from "@/auth";
import Link from "next/link";

export async function SignOut() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      {user ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-red-500 transition-all "
          >
            Sign Out
          </button>
        </form>
      ) : (
        <Link
          href="/login"
          className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition-all "
        >
          Login
        </Link>
      )}
    </>
  );
}
