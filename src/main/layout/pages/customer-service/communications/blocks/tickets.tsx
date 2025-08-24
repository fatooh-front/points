import { Link } from "react-router-dom";

export default function Tickets() {
  return (
    <div className=" border-e ">
      <div className=" h-[80px] bg-white p-[16px] flex  items-center">
        تذاكر الدعم الفني
      </div>{" "}
      <div className="bg-[#F3F3F3] h-[calc(100%-80px)] flex flex-col p-4">
        <div className="flex flex-col gap-6 max-w-md mx-auto h-full w-full">
          <div className="flex items-center justify-start gap-2 mt-4">
            <span className="text-gray-500 font-medium text-lg">
              تعين إلى :
            </span>
            <span className="text-[#162B2C] font-medium text-base ">
              هاني البريكي
            </span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <span className="text-gray-500 font-medium text-lg">العنوان :</span>
            <span className="text-[#162B2C] font-medium text-base">مكة</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-gray-500 font-medium text-lg mb-2">
              التفاصيل
            </span>
            <textarea
              className="w-full h-32 rounded-xl border border-gray-300 p-4 text-right text-lg focus:outline-none"
              placeholder="اكتب التفاصيل هنا"
              dir="rtl"
            />
          </div>
          <div className="mt-auto flex justify-end">
            <Link
              to="/customer-service/tickets/add"
              className="bg-[#182F32] w-[173px] h-[40px] text-white text-base rounded-xl flex justify-center items-center "
            >
              إضافة تذكرة جديدة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
