import { ChartPieDonut } from "../components/pie-chart-donut";

export default function Page() {
  const chartConfig = {
    lawsuit: { label: "إقامة دعوى", color: "#00BAD1" },
    court_date: { label: "موعد محكمة", color: "#7AAA81" },
    lift_decision: { label: "رفع قرار-سداد", color: "#E52B2E" },
    closed: { label: "اقفال المعاملة", color: "#0B7FAF" },
    decision_46: { label: "قرار 46", color: "#F2AE31" },
    in_progress: { label: "تحت الإجراء", color: "#D676E5" },
  };

  return (
    <ChartPieDonut
      title="المطالبات"
      footerTitle=" هذا التقرير يوضح النسبة المئوية وعدد السيارات المعروضة للبيع من كل موديل سيارة"
      chartConfig={chartConfig}
      chartData={[
        { key: "lawsuit", count: 12, fill: chartConfig.lawsuit.color },
        { key: "court_date", count: 23, fill: chartConfig.court_date.color },
        {
          key: "lift_decision",
          count: 33,
          fill: chartConfig.lift_decision.color,
        },
        { key: "closed", count: 44, fill: chartConfig.closed.color },
        { key: "decision_46", count: 55, fill: chartConfig.decision_46.color },
        {
          key: "in_progress",
          count: 55,
          fill: chartConfig.in_progress.color,
        },
      ]}
    ></ChartPieDonut>
  );
}
