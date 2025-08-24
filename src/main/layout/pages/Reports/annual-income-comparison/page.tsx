import VerticalbarChartDonut from "../components/verticalbar-chart-donut";

const rentComparisonData = [
  { key: "2017", value: 50000 },
  { key: "2018", value: 40000 },
  { key: "2019", value: 30000 },
  { key: "2020", value: 45000 },
  { key: "2021", value: 38000 },
  { key: "2022", value: 20000 },
  { key: "2023", value: 30000 },
  { key: "2024", value: 28000 },
];

const Page = () => {
  return (
    <VerticalbarChartDonut
      color="#C5D9E5"
      hoverColor="#0B7FAF"
      title=" مقارنة الإيجارات"
      footerTitle="  هذا التقرير يوضح النسبة المئوية المملوكة لكل نوع سيارة مقارنة بباقي
            الاصول من السيارت"
      chartData={rentComparisonData}
    ></VerticalbarChartDonut>
  );
};

export default Page;
