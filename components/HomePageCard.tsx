"use client";

import { useState } from "react";
import useSWR from "swr";
import ParseHTML from "./Parse";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrashIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { getTimestamp } from "@/lib/utils";

interface Snip {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  savedBy: string[];
  createdAt: Date;
}

interface CardProps {
  snip: Snip;
  useremail: string;
}

const Card = ({ snip, useremail }: CardProps) => {
  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      return res.json();
    });

  const { data: user, error } = useSWR(
    `/api/user/fetchone?authorId=${encodeURIComponent(snip.authorId)}`,
    fetcher
  );

  if (error) {
    console.error("Error fetching user:", error);
  }

  const handleDeleteSnip = async () => {
    try {
      const response = await fetch("/api/snip/create", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: snip._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete snip");
      }

      console.log("Snip deleted successfully");
    } catch (error) {
      console.error("Error deleting snip:", error);
    }
  };

  const pathname = usePathname();

  const [showContent, setShowContent] = useState(true);
  const [copyStatus, setCopyStatus] = useState("Copy");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snip.content);
    setCopyStatus("Copied!");
    setTimeout(() => {
      setCopyStatus("Copy");
    }, 5000);
  };

  return (
    <div className="min-w-[49%] flex-grow flex items-center max-sm:w-full">
      <div className="flex flex-col max-h-content border rounded-lg shadow-md p-4 text-primary-foreground bg-gradient-to-b from-violet-500 to-violet-300 flex-grow max-h-fit ">
        <div className="w-full flex flex-row justify-between">
          {user && (
            <div className="w-full flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
              <div className="font-semibold text-lg  flex flex-col">
                {user.name}
                <div className="text-sm text-gray-400">
                  {getTimestamp(snip.createdAt)}
                </div>
              </div>
            </div>
          )}
          <div className="flex text-base font-bold flex-row gap-4 items-center">
            <button
              onClick={() => setShowContent(!showContent)}
              className="text-violet-700 hover:text-white   rounded"
            >
              {showContent ? "Hide" : "View"}
            </button>
            <button
              onClick={copyToClipboard}
              className="text-violet-700 hover:text-white   rounded"
            >
              {copyStatus}
            </button>
            {useremail === user?.email && pathname === "/profile" && (
              <button
                className="text-red-500 font-bold"
                onClick={handleDeleteSnip}
              >
                <TrashIcon className="w-6 h-6 transition-transform duration-200 ease-in-out hover:scale-110" />
              </button>
            )}
          </div>
        </div>

        <div className="w-full text-lg font-semibold mt-2">{snip.title}</div>

        {showContent && <ParseHTML data={snip.content} />}
      </div>
    </div>
  );
};

export default Card;
