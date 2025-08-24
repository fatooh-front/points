import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type Props = {
  placeholder?: string;
  onSearch: (query: string) => void; // Callback function prop to handle search.
};

export default function TSearchServerField({ placeholder, onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery); // Invoke the callback with the search query.
  };

  return (
    <div className="flex w-full relative md:w-auto rounded-md border border-input">
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        className="h-8 w-full sm:min-w-[150px] lg:min-w-[250px] block"
      />
      <Button
        onClick={handleSearch}
        className="h-8 w-8 p-0"
        variant="secondary"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
