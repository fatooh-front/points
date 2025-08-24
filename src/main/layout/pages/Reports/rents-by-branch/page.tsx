import { useState } from "react";
import VerticalbarChartDonut from "../components/verticalbar-chart-donut";

export const description = "السيارات التي تم اختيارها من الواتساب";
const chartData = [
  { key: "فرع تاجير الشركات -جدة", value: 30000 },
  { key: "فرع النزهة - مكه", value: 45000 },
  { key: "فرع العزيزية - مكه", value: 38000 },
  { key: "فرع الكعكيه - مكه", value: 20000 },
  { key: "فرع تلقانى - مكه", value: 30000 },
  { key: "فرع قريش - جدة", value: 28000 },
  { key: "فرع طريق المدينة - جدة", value: 28000 },
  { key: "فرع تلقانى - جده", value: 28000 },
];

const Page = () => {
  const [showCount, setShowCount] = useState(false);

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
        <VerticalbarChartDonut
          color="#C5D9E5"
          hoverColor="#0B7FAF"
          title=" مقارنة الإيجارات"
          footerTitle="  هذا التقرير يوضح النسبة المئوية المملوكة لكل نوع سيارة مقارنة بباقي
            الاصول من السيارت"
          chartData={chartData}
        ></VerticalbarChartDonut>
      ) : (
        <VerticalbarChartDonut
          color="#C5D9E5"
          hoverColor="#0B7FAF"
          title=" مقارنة الإيجارات"
          footerTitle="  هذا التقرير يوضح النسبة المئوية المملوكة لكل نوع سيارة مقارنة بباقي
            الاصول من السيارت"
          chartData={chartData}
        ></VerticalbarChartDonut>
      )}
    </div>
  );
};

export default Page;
