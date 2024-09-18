"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between w-full items-center text-primary-foreground text-white h-[50px] px-2">
      <div className="text-3xl font-bold">
        <Link
          href="/"
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-800"
        >
          MyCodeSnips
        </Link>
      </div>

      <div className="flex flex-row gap-6 font-bold items-center">
        <Link
          href="/"
          className={`hover:text-purple-400 transition-all ${
            pathname === "/" ? "text-purple-500" : ""
          }`}
        >
          Explore
        </Link>

        <Link
          href="/profile"
          className={`hover:text-purple-400 transition-all ${
            pathname === "/profile" ? "text-purple-500" : ""
          }`}
        >
          Profile
        </Link>

        <Link
          href="/snips/add"
          className={`hover:text-purple-400 transition-all ${
            pathname === "/snips/add" ? "text-purple-500" : ""
          }`}
        >
          Add Snips
        </Link>

        <Link
          href="/login"
          className={`bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition-all ${
            pathname === "/login" ? "text-purple-500" : ""
          }`}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
