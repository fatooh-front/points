import { useState } from "react";
import { useColumns } from "./hooks/useColumns";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import VerticalbarDouChartDonut from "../components/verticalbar-dou-chart-donut";

export const description = "السيارات التي تم اختيارها من الواتساب";

const data = {
  data: [
    {
      id: "1",
      employeeName: "أحمد علي",
      phone: "966503456789",
      actions: null,
    },
    {
      id: "2",
      employeeName: "سارة محمد",
      phone: "966504567890",
      actions: null,
    },
  ],
};
const Page = () => {
  const [showCount, setShowCount] = useState(false);
  const { columns } = useColumns();

  const chartData = [
    { label: "فرع النزهة - مكة", increase: [300, 10], decrease: [-250, -10] },
    { label: "فرع العزيزية - مكة", increase: [250, 10], decrease: [-200, -10] },
    {
      label: "فرع تأجير الشركات - مكة",
      increase: [180, 10],
      decrease: [-190, -10],
    },
    {
      label: "فرع الليموزين - مكة",
      increase: [210, 10],
      decrease: [-180, -10],
    },
    { label: "فرع الكعكية - مكة", increase: [270, 10], decrease: [-140, -10] },
    { label: "فرع كروه - مكة", increase: [330, 10], decrease: [-60, -10] },
    { label: "فرع المريع - جدة", increase: [280, 10], decrease: [-130, -10] },
    { label: "معرض بيع - جدة", increase: [290, 10], decrease: [-170, -10] },
    { label: "فرع انفيجو - جدة", increase: [150, 10], decrease: [-240, -10] },
  ];
  return (
    <div>
      {/* Toggle buttons for switching between value and count */}
      <div className="flex w-full justify-end gap-2 text-sm">
        <div className="bg-white rounded-tl-2xl">
          <button
            onClick={() => setShowCount(true)}
            className={`${
              showCount ? "bg-[#C9972B] text-white" : "bg-white text-black"
            } px-4 py-1 rounded-ts `}
          >
            الجدول
          </button>{" "}
          <button
            onClick={() => setShowCount(false)}
            className={`${
              !showCount ? "bg-[#C9972B] text-white" : "bg-white text-black"
            } px-4 py-1 rounded-te`}
          >
            القيمة
          </button>
        </div>
      </div>

      {/* Chart container */}
      {showCount ? (
        <VerticalbarDouChartDonut
          title="العملاء الجدد في الفروع"
          footerTitle="هذا التقرير يوضح عدد العملاء الجدد مقارنة بالعملاء الاخرين في كل فرع على حدا ضمن فترة معينة من تاريخ الى اخر"
          chartData={chartData}
        ></VerticalbarDouChartDonut>
      ) : (
        <div className="bg-white   rounded-bl-2xl rounded-r-2xl shadow-md">
          {data && columns && (
            <DataTable
              layoutClassName="p-0 !m-0 rounded-none "
              data={
                Array.isArray(data?.data)
                  ? data?.data.map((item) => ({ ...item, id: item.id }))
                  : []
              }
              columns={columns as any}
              // paginationOptions={paginationOptions}
              // onSelectedServerValueChange={}
              isViewOptions={false}
              isViewServerOptions={true}
            />
          )}{" "}
        </div>
      )}
    </div>
  );
};

export default Page;
