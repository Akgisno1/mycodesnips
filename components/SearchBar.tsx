"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  searchQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery }) => {
  const [query, setQuery] = useState(searchQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?query=${encodeURIComponent(query)}`); // Navigate to the search URL
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Search snippets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-lg p-2 w-full border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <button type="submit" className="ml-2">
        <BiSearch className="text-white bg-violet-700 p-2 rounded-full hover:bg-violet-600 text-4xl" />
      </button>
    </form>
  );
};

export default SearchBar;
