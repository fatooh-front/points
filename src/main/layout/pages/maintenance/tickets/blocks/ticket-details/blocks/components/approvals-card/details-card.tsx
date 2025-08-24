import { Button } from "@/components/ui/button";

export default function DetailsCard() {
  return (
    <div className="flex w-full mx-auto  border-e bg-white p-2 py-8">
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-start mb-4">
          {" "}
          <div className="flex items-center mb-2">
            <span className="text-lg font-semibold ml-2 mb-4">التفاصيل :</span>
            <span className="text-base text-gray-700 mb-4">
              تكتب هنا تفاصيل التذكرة
            </span>{" "}
          </div>
          <div className="flex items-center mb-2">
            <span className="ml-2 text-gray-500">تاريخ الإضافة :</span>
            <span className="text-gray-700">2024/10/07 23:18</span>
          </div>
          <span className="text-gray-500 mb-2">الحالة</span>
          <div className="flex gap-2">
            <Button className=" bg-[#7AAA81] w-[90px]">قبول</Button>
            <Button className=" bg-[#E52B2E] w-[90px]">رفض</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
