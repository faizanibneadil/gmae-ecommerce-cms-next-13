"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import Spin from "@/app/_components/loading-spinner";

const SearchInput: React.FC<{}> = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("query"));

  const debouncedSearchTerm = useDebounce(searchQuery, 300);

  useEffect(() => {
    const searchHN = async () => {
      if (debouncedSearchTerm) {
        router.push(`${pathname}?query=${searchQuery}`);
      } else {
        router.push(`${pathname}`);
      }
    };

    startTransition(() => searchHN());
  }, [debouncedSearchTerm]);

  return (
    <div className="flex-1">
      <div className="flex items-center">
        {loading ? (
          <Spin className="w-4 h-4 mx-1" />
        ) : (
          <Search className="w-4 h-4 m-1 mx-1 " />
        )}
        <Input
          className="flex-1 w-full h-8 p-1 border-none rounded-none focus:outline-none"
          placeholder="Search ..."
          value={searchQuery?.toString()}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
