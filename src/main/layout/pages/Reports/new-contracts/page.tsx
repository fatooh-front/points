import { useState } from "react";
import { ChartPieDonut } from "../components/pie-chart-donut";

const Page = () => {
  const [showCount, setShowCount] = useState(false);

  const chartConfig = {
    raise: { label: "رايز", color: "#D51619" },
    yukon: { label: "جيمس يوكن قصير", color: "#144897" },
    yaris: { label: "يارس", color: "#CE931A" },
    corolla: { label: "كرولا", color: "#7AAA81" },
    elantra: { label: "النترا", color: "#985EB3" },
    velar: { label: "رينج روفر فيلار", color: "#999999" },
  };
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
        <ChartPieDonut
          footerTitle=" هذا التقرير يوضح النسبة المئوية المملوكة لكل نوع سيارة مقارنة بباقي
            الاصول من السيارت"
          title="السيارات المعروضة للبيع"
          chartConfig={chartConfig}
          chartData={[
            { key: "raise", count: 8, fill: chartConfig.raise.color },
            { key: "yukon", count: 28, fill: chartConfig.yukon.color },
            { key: "yaris", count: 3, fill: chartConfig.yaris.color },
            { key: "corolla", count: 5, fill: chartConfig.corolla.color },
            { key: "elantra", count: 1, fill: chartConfig.elantra.color },
            { key: "velar", count: 1, fill: chartConfig.velar.color },
          ]}
        ></ChartPieDonut>
      ) : (
        <ChartPieDonut
          footerTitle=" هذا التقرير يوضح النسبة المئوية المملوكة لكل نوع سيارة مقارنة بباقي
            الاصول من السيارت"
          title="السيارات المعروضة للبيع"
          chartConfig={chartConfig}
          chartData={[
            { key: "raise", count: 445, fill: chartConfig.raise.color },
            { key: "yukon", count: 268, fill: chartConfig.yukon.color },
            { key: "yaris", count: 536, fill: chartConfig.yaris.color },
            { key: "corolla", count: 556, fill: chartConfig.corolla.color },
            { key: "elantra", count: 176, fill: chartConfig.elantra.color },
            { key: "velar", count: 167, fill: chartConfig.velar.color },
          ]}
        ></ChartPieDonut>
      )}
    </div>
  );
};

export default Page;
