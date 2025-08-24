import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

type TSearchFrontFieldProps = {
  placeholder?: string;
  onSearch: (query: string) => void; // Callback function prop to handle search.
  [key: string]: any;
};

export default function TSearchFrontField({
  placeholder,
  onSearch,
  ...props
}: TSearchFrontFieldProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation("common");

  useEffect(() => {
    onSearch(searchQuery); // Trigger search whenever searchQuery changes.
  }, [searchQuery, onSearch]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const { className, ...restProps } = props;

  return (
    <div className="flex w-full relative md:w-auto rounded-md border border-input">
      <Input
        placeholder={placeholder || t("common.search")}
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        className={cn(
          "h-8 w-full sm:w-full sm:min-w-[150px] md:min-w-[250px] block pe-7",
          className
        )}
        {...restProps}
      />
      {searchQuery && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute inset-y-0 end-0 flex items-center pe-2"
        >
          <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
        </button>
      )}
    </div>
  );
}
