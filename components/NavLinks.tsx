// components/NavLinks.tsx
"use client"; // Ensure this is a client component

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-6 font-bold items-center max-md:flex-col max-md:gap-10">
      <Link
        href="/"
        className={`hover:text-purple-400 transition-all ${
          pathname === "/" ? "text-purple-400" : ""
        }`}
      >
        Explore
      </Link>
      <Link
        href="/profile"
        className={`hover:text-purple-400 transition-all ${
          pathname === "/profile" ? "text-purple-400" : ""
        }`}
      >
        Profile
      </Link>
      <Link
        href="/snips/add"
        className={`hover:text-purple-400 transition-all ${
          pathname === "/snips/add" ? "text-purple-400" : ""
        }`}
      >
        Add Snips
      </Link>
    </div>
  );
};

export default NavLinks;
