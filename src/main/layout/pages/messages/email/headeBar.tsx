import { useState } from "react";
import Search from "./Search";
import { useForm } from "react-hook-form";
import { DatePicker } from "@/components/ui/date_picker";
import MiniCalendarSVG from "@/main/global/assets/svg/MiniCalendarSVG";
import { Form } from "@/components/ui/form";

export default function HeadeBar() {
  const [textSearch, setTextSearch] = useState("");
  const form = useForm<any>();

  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-between md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      <div>
        <Search onChange={(E) => setTextSearch(E)} value={textSearch}></Search>
      </div>
      <Form {...form}>
        <form className="flex justify-center gap-4">
          <div className="w-[352.25px]">
            <DatePicker
              Icon={<MiniCalendarSVG color={"#C9972B"} />}
              form={form}
              placeholder="من تاريخ"
              name="expiryDate"
              label={""}
              className="h-[48px]  w-[352.25px] mt-0 "
            />
          </div>
          <div className="w-[352.25px]">
            <DatePicker
              Icon={<MiniCalendarSVG color={"#C9972B"} />}
              form={form}
              placeholder="إلى تاريخ"
              name="expiryDate"
              label={""}
              className="h-[48px]  w-[352.25px]  mt-0"
            />
          </div>{" "}
          <div className=" cursor-pointer gap-1 flex items-center text-base justify-center w-[53px] h-[48px] rounded-[5px] bg-white border text-center text">
            بحث
          </div>
        </form>
      </Form>
    </div>
  );
}
