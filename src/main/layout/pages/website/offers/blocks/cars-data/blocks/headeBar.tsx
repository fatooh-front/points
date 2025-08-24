import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function HeadeBar() {
  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-end md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      <div className="relative">
        <Input
          className={cn(
            ` border border-[#D0DADE] p-[16px] w-[253px] h-[50px]  rounded-[8px] `
          )}
          placeholder={"ادخل كود السيارة"}
          onChange={(e) => console.log(e)}
          type={"text"}
        ></Input>{" "}
        <div className="absolute inset-y-0 my-auto  h-fit leading-none end-0 pe-3 flex items-center text-gray-400 focus:outline-none">
          <Button className=" w-[58px] h-[32px]">إضافة </Button>
        </div>
      </div>
    </div>
  );
}
