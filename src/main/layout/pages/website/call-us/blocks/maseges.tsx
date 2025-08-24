import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

export default function Maseges() {
  const demoMessages = [
    {
      id: 1,
      user: "Mahmoud Kabbani",
      isme: false,

      time: "1:03 م",
      content: "يكتب هنا الملاحظات المسجلة",
      date: "السبت, 09 مارس, 2024",
    },
    {
      id: 2,
      user: "Mahmoud Kabbani",
      isme: true,

      time: "12:45 م",
      content: "تم تحديث حالة التذكرة.",
      date: "السبت, 09 مارس, 2024",
    },
    {
      id: 3,
      isme: false,
      user: "Mahmoud Kabbani",
      time: "11:30 ص",
      content: "يرجى مراجعة التفاصيل المرفقة.",
      date: "السبت, 09 مارس, 2024",
    },
  ];
  return (
    <div className=" p-6 w-full">
      <p className=" font-normal text-base text-[#7E858E]">ملاحظات</p>
      <div className=" justify-center  rounded-[8px] border flex flex-col items-start py-4 ">
        {demoMessages.map((message) => (
          <div
            className={`flex justify-start w-full flex-col ${
              message.isme ? "items-end " : ""
            } items-start  px-6 py-1`}
          >
            <div className="flex justify-between w-full">
              <span
                className={`text-[#7E858E] text-base font-norma ${
                  message.isme ? "justify-end " : ""
                }`}
              >
                {message.isme ? "" : message.user}
              </span>
            </div>
            <div className=" min-w-[300px] mt-2 flex items-center text-right rounded-[12px] p-[8px] bg-[#F1F1F1]">
              <p className="text-[#23262F]  font-normal">{message.content}</p>{" "}
              <span className="text-[#7E858E] ms-[63px]   justify-start text-xs font-normal">
                {message.time}
              </span>
            </div>
            <div
              className={`w-full mt-2 flex justify-start ${
                message.isme ? "justify-end " : ""
              }`}
            >
              <span className="text-[#7E858E] text-sm font-normal">
                {message.date}
              </span>
            </div>
          </div>
        ))}
        <div className=" px-6 mt-6 w-full flex gap-2 items-center">
          <Input placeholder="إرسال ملاحظة جديدة"></Input>
          <div className=" p-2 rounded-md bg-[#F1F1F1] hover:bg-[#E0E0E0] cursor-pointer">
            <SendHorizontal className=" rotate-180 text-[#C9972B]" />
          </div>
        </div>
      </div>
    </div>
  );
}
