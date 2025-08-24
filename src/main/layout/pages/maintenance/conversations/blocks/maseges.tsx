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
    <div className=" p-6 w-full   bg-white">
      <div className=" justify-end   rounded-[8px]  flex flex-col items-start py-4 ">
        {demoMessages.map((message) => (
          <div
            className={`flex justify-start w-full flex-col ${
              message.isme ? "items-end  " : " "
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
            <div
              className={` ${
                message.isme
                  ? "justify flex-row-reverse gap-2 bg-[#F1F1F1]"
                  : "bg-[#C9972B]"
              } min-w-[100px] mt-2 flex items-center  text-right rounded-[12px] p-[8px] `}
            >
              <p
                className={` ${
                  message.isme ? "text-[#23262F] " : "text-white"
                }    font-normal`}
              >
                {message.content}
              </p>{" "}
              <span
                className={`${
                  message.isme ? "text-[#7E858E]" : "text-white"
                }  ms-[10px]   justify-start text-xs font-normal`}
              >
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
