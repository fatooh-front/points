import { ChartPieDonut } from "../components/pie-chart-donut";

export default function Page() {
  const chartConfig = {
    raise: { label: "رايز", color: "#D51619" },
    yukon: { label: "جيمس يوكن قصير", color: "#144897" },
    yaris: { label: "يارس", color: "#CE931A" },
    corolla: { label: "كرولا", color: "#7AAA81" },
    elantra: { label: "النترا", color: "#985EB3" },
    velar: { label: "رينج روفر فيلار", color: "#999999" },
  };

  return (
    <ChartPieDonut
      footerTitle=" هذا التقرير يوضح النسبة المئوية المملوكة لكل نوع سيارة مقارنة بباقي
            الاصول من السيارت"
      title="السيارات المعروضة للبيع"
      titleInTheMiddle="مجموع السيارات"
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
  );
}
