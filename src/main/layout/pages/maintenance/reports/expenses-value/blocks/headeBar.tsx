import { DatePicker } from "@/components/ui/date_picker";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import MiniCalendarSVG from "@/main/global/assets/svg/MiniCalendarSVG";

export default function HeadeBar() {
  const form = useForm<any>();

  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-between md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      {" "}
      <div className="  flex items-center  w-full justify-start gap-4">
        <Form {...form}>
          <form className="flex justify-center gap-4">
            <div className="w-[443px]">
              <DatePicker
                Icon={<MiniCalendarSVG color={"#C9972B"} />}
                form={form}
                placeholder="من تاريخ"
                name="expiryDate"
                label={""}
                className="h-[48px]  w-[443px] mt-0 "
              />
            </div>
            <div className="w-[443px]">
              <DatePicker
                Icon={<MiniCalendarSVG color={"#C9972B"} />}
                form={form}
                placeholder="إلى تاريخ"
                name="expiryDate"
                label={""}
                className="h-[48px]  w-[443px]  mt-0"
              />
            </div>{" "}
            <div className=" cursor-pointer gap-1 flex items-center text-base justify-center w-[53px] h-[48px] hover:bg-[#ECF3F3] rounded-[5px] bg-white border text-center text">
              بحث
            </div>
          </form>
        </Form>
        {/* <UnitNotificationsFormDialog
          passedButton={
            <div className=" cursor-pointer gap-1 flex items-center text-base justify-center w-[158px] h-[48px] rounded-[5px] bg-white border text-center text">
              <Bell size={16}></Bell> إرسال إشعار للجميع
            </div>
          }
          type="add"
        ></UnitNotificationsFormDialog> */}
      </div>
    </div>
  );
}
