import { ChartPieDonut } from "../components/pie-chart-donut";

export default function Page() {
  const chartConfig = {
    Rental: { label: "السيارات الجاهزة", color: "#E52B2E" },
    Ready: { label: "السيارات المستأجرة", color: "#0B7FAF" },
  };
  return (
    <ChartPieDonut
      footerTitle=" هذا التقرير يوضح النسبة المئوية المملوكة لكل نوع سيارة مقارنة بباقي
            الاصول من السيارت"
      title="السيارات المعروضة للبيع"
      chartConfig={chartConfig}
      chartData={[
        { key: "Rental", count: 25, fill: chartConfig.Rental.color },
        { key: "Ready", count: 75, fill: chartConfig.Ready.color },
      ]}
    ></ChartPieDonut>
  );
}
