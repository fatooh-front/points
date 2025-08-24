import { Link } from "react-router-dom";

export default function UsersInfo() {
  const userData = [
    { label: "الاسم", value: "معاذ القرشي" },
    { label: "المجموعة", value: "New Clients" },
    { label: "المصدر", value: "Call Center" },
    { label: "الحالة", value: "New" },
    { label: "المدينة", value: "القاهرة" },
    { label: "العنوان", value: "استفسار عرض سعر" },
    { label: "الهاتف", value: "01090105214" },
    { label: "جوال 1", value: "01090105214" },
    { label: "جوال 2", value: "" },
    { label: "البريد الإكتروني", value: "" },
    { label: "الموقع الإلكتروني", value: "" },
    { label: "رقم السجل التجاري", value: "" },
    { label: "رقم التسجيل الضريبي", value: "" },
  ];
  return (
    <div className=" border-e ">
      <div className=" h-[80px] bg-white p-[16px] flex  items-center">
        بيانات العميل
      </div>{" "}
      <div className=" bg-[#F3F3F3] h-[calc(100%-80px)]">
        <div className="flex flex-col gap-2 p-6 h-full">
          <div className="flex flex-col gap-4">
            {userData.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-start gap-2"
              >
                <span className="text-[#7B868C] font-medium text-lg">
                  {item.label} :
                </span>
                <span className="text-[#182F32] font-medium text-base">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-auto flex justify-end">
            <Link
              to="/client/edit/ID123456"
              className="bg-[#182F32] w-[130px] h-[40px] text-white text-base rounded-xl flex justify-center items-center "
            >
              تعديل البيانات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
