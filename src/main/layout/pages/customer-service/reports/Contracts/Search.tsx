import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface SearchProps {
  onChange: (value: string) => void;
  value: string;
}

export default function Search({ onChange, value }: SearchProps) {
  return (
    <div className="  mx-auto !border-[#656565] w-[237px]">
      <div className="flex  h-[38px]   w-[237px] focus:opacity-60   relative  rounded-md border ">
        <Button
          type="button"
          onClick={() => {
            console.log(value);
          }}
          className="h-8 w-8 p-0 shadow-none bg-white hover:bg-white"
          // variant="secondary"
        >
          <MagnifyingGlassIcon className="h-5 w-5 !text-[#656565] " />
        </Button>{" "}
        <Input
          placeholder={`بحث`}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          // onKeyDown={handleKeyPress}
          className="h-8 w-full sm:min-w-[150px] focus-visible:placeholder:!text-[#CE931A] focus-visible:!ring-0 focus:border-0 md:min-w-[Fill(237px)] block bg-transparent placeholder:text-[#656565] text-primary placeholder:font-normal  pr-[2px] border-0"
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
