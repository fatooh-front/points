import VerticalbarChartDonut from "../components/verticalbar-chart-donut";

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
  return (
    <VerticalbarChartDonut
      color="#AEDBB5"
      hoverColor="#7AAA81"
      title="تحصيلات الفروع"
      footerTitle=" هذا التقرير يوضح قيمة وعدد الإيجارات في كل فرع على حدا ضمن فترة معينة من تاريخ الى اخر"
      chartData={chartData}
    ></VerticalbarChartDonut>
  );
};

export default Page;
