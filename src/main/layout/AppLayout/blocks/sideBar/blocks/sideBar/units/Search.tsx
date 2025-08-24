import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type SearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Search({ search, setSearch }: SearchProps) {
  return (
    <div className="pt-4 m border-t mt-[8px] mx-auto !border-[#656565] w-[237px]">
      <div className="flex    w-[237px] focus:opacity-60  !border-[#656565] relative  rounded-md border border-input">
        <Button
          type="button"
          onClick={() => {
            console.log(search);
          }}
          className="h-8 w-8 p-0"
          // variant="secondary"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-[#656565]" />
        </Button>{" "}
        <Input
          placeholder={`بحث`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          // onKeyDown={handleKeyPress}
          className="h-8 w-full sm:min-w-[150px] focus-visible:placeholder:!text-[#CE931A] focus-visible:!ring-0 focus:border-0 md:min-w-[Fill(237px)] block bg-transparent placeholder:text-[#656565] text-yellow-50  placeholder:font-normal  pr-[2px] border-0"
        />
        {/* {searchValue && (
            <Button
              type="button"
              onClick={handleReset}
              className="h-8 w-8 p-0 absolute right-[36px] top-0"
              variant="ghost"
            >
              <Cross2Icon className="h-4 w-4" />
            </Button>
          )} */}
      </div>
    </div>
  );
}
