import { Link } from "react-router-dom";

export default function Books() {
  return (
    <div className=" border-e !h-[calc(100vh-180px)] ">
      <div className=" h-[80px] bg-white p-[16px] flex   items-center">
        الحجوزات الحالية والسابقة
      </div>{" "}
      <div className="bg-[#F3F3F3]  p-2 h-[calc(100%-80px)] flex flex-col gap-4 overflow-y-auto">
        {[
          {
            carName: "ازيرا 2024 اسود ر ط ح 4719",
            contractNumber: "125021112",
            plateNumber: "ر ط ح 4719",
            fromDate: "05/05/2025",
            toDate: "05/05/2025",
            contractStatus: "مطالبة",
            totalAmount: "2373.92",
          },
          {
            carName: "ازيرا 2024 اسود ر ط ح 4719",
            contractNumber: "125021112",
            plateNumber: "ر ط ح 4719",
            fromDate: "05/05/2025",
            toDate: "05/05/2025",
            contractStatus: "مطالبة",
            totalAmount: "2373.92",
          },
          {
            carName: "ازيرا 2024 اسود ر ط ح 4719",
            contractNumber: "125021112",
            plateNumber: "ر ط ح 4719",
            fromDate: "05/05/2025",
            toDate: "05/05/2025",
            contractStatus: "مطالبة",
            totalAmount: "2373.92",
          },
          {
            carName: "ازيرا 2024 اسود ر ط ح 4719",
            contractNumber: "125021112",
            plateNumber: "ر ط ح 4719",
            fromDate: "05/05/2025",
            toDate: "05/05/2025",
            contractStatus: "مطالبة",
            totalAmount: "2373.92",
          },
          {
            carName: "ازيرا 2024 اسود ر ط ح 4719",
            contractNumber: "125021112",
            plateNumber: "ر ط ح 4719",
            fromDate: "05/05/2025",
            toDate: "05/05/2025",
            contractStatus: "مطالبة",
            totalAmount: "2373.92",
          },
          {
            carName: "ازيرا 2024 اسود ر ط ح 4719",
            contractNumber: "125021112",
            plateNumber: "ر ط ح 4719",
            fromDate: "05/05/2025",
            toDate: "05/05/2025",
            contractStatus: "مطالبة",
            totalAmount: "2373.92",
          },
          {
            carName: "ازيرا 2024 اسود ر ط ح 4719",
            contractNumber: "125021112",
            plateNumber: "ر ط ح 4719",
            fromDate: "05/05/2025",
            toDate: "05/05/2025",
            contractStatus: "مطالبة",
            totalAmount: "2373.92",
          },
          {
            carName: "ازيرا 2024 اسود ر ط ح 4719",
            contractNumber: "125021112",
            plateNumber: "ر ط ح 4719",
            fromDate: "05/05/2025",
            toDate: "05/05/2025",
            contractStatus: "مطالبة",
            totalAmount: "2373.92",
          },
          {
            carName: "ازيرا 2024 اسود ر ط ح 4719",
            contractNumber: "125021112",
            plateNumber: "ر ط ح 4719",
            fromDate: "05/05/2025",
            toDate: "05/05/2025",
            contractStatus: "مطالبة",
            totalAmount: "2373.92",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 flex flex-col gap-2 shadow-sm"
          >
            <div className="flex flex-row-reverse justify-start gap-4 ">
              <div className="flex flex-col text-right">
                <div className="font-medium text-lg py-4">{item.carName}</div>
                <div className="text-base py-4">{item.contractNumber}</div>
                <div className="text-base py-4">{item.plateNumber}</div>
                <div className="text-base py-4">{item.fromDate}</div>
                <div className="text-base py-4">{item.toDate}</div>
                <div className="text-base py-4">{item.contractStatus}</div>
                <div className="text-base py-4">{item.totalAmount}</div>
              </div>
              <div className="flex flex-col  text-right text-gray-400 w-full  flex-1">
                <div className="py-4">اسم السيارة :</div>
                <div className="py-4">رقم العقد :</div>
                <div className="py-4">رقم اللوحة :</div>
                <div className="py-4">من تاريخ :</div>
                <div className="py-4">الى تاريخ :</div>
                <div className="py-4">حالة العقد :</div>
                <div className="py-4">إجمالي المبلغ :</div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-auto flex justify-end">
          <Link
            to="/booking/booking/add"
            className="bg-[#182F32] w-[160px] h-[40px] text-white text-base rounded-xl flex justify-center items-center "
          >
            إضافة حجز مؤقت
          </Link>
        </div>
      </div>
    </div>
  );
}
