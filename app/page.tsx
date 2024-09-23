import HomePageCard from "@/components/HomePageCard";
import SearchBar from "@/components/SearchBar";
import { getSession } from "@/lib/getSession";

interface Snip {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  savedBy: string[];
  createdAt: Date;
}

const fetchSnips = async (query: string) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/snip/fetchall?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch snippets");
  }

  return res.json();
};

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const session = await getSession();
  const useremail = session?.user?.email || "";

  const snips = await fetchSnips(searchParams.query || "");

  return (
    <div className="p-2  flex flex-col">
      <SearchBar searchQuery={searchParams.query || ""} />

      <div className="flex-grow  rounded-lg">
        <div className="flex flex-wrap gap-2">
          {snips.map((snip: Snip) => (
            <HomePageCard key={snip._id} snip={snip} useremail={useremail} />
          ))}
        </div>
      </div>
    </div>
  );
}
