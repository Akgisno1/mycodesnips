// components/Navbar.tsx

import Link from "next/link";
import DarkModeToggle from "./ThemeToggle";
import { SignOut } from "./SignOut";
import { getSession } from "@/lib/getSession";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "./NavLinks"; // Import the NavLinks component
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <div className="flex flex-row justify-between w-full items-center text-accent-foreground h-[70px] px-2">
      <div className="text-3xl font-bold bg-primary max-sm:bg-transparent rounded flex flex-row items-center">
        <Link
          href="/"
          className="bg-gradient-to-r px-8 py-4 from-white to-violet-200 bg-clip-text text-transparent max-sm:hidden"
        >
          MyCodeSnips
        </Link>
        <img
          className="w-12 h-12 rounded-full hidden max-sm:flex"
          src="/favicon.png"
        />
      </div>

      <div className="flex flex-row items-center">
        <div className="hidden md:flex">
          <NavLinks />
        </div>
        {user?.name && (
          <div className="flex items-center ml-4 flex-row gap-4">
            <Avatar>
              {user?.image && <AvatarImage src={user.image} />}
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div className="hidden  md:flex">
              <SignOut />
            </div>
          </div>
        )}
        <DarkModeToggle />
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <HamburgerMenuIcon className="text-white bg-violet-700 p-2 mt-1 rounded-full hover:bg-violet-600 w-12 h-12" />
            </SheetTrigger>
            <SheetContent className="bg-card text-2xl text-primary">
              <SheetHeader>
                <SheetTitle>
                  <div className="text-4xl font-bold bg-primary w-full rounded flex flex-row items-center justify-center mt-4">
                    <Link
                      href="/"
                      className="bg-gradient-to-r  py-2 from-white to-violet-200 bg-clip-text text-transparent "
                    >
                      MyCodeSnips
                    </Link>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col justify-around h-full mt-4 ">
                <div className="flex items-center flex-col  justify-center ">
                  {user?.image && (
                    <img
                      src={user.image}
                      className="rounded-full w-20 h-20 object-contain mb-4"
                    />
                  )}

                  {user?.name && (
                    <span className="font-semibold ml-2">
                      {"Welcome  "}
                      <div className="underline">{user?.name}</div>
                    </span>
                  )}
                </div>
                <NavLinks />

                <div></div>
                <SignOut />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
