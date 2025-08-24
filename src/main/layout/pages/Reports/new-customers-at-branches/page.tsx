import VerticalbarDouChartDonut from "../components/verticalbar-dou-chart-donut";

export default function Page() {
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
    <VerticalbarDouChartDonut
      title="العملاء الجدد في الفروع"
      footerTitle="هذا التقرير يوضح عدد العملاء الجدد مقارنة بالعملاء الاخرين في كل فرع على حدا ضمن فترة معينة من تاريخ الى اخر"
      chartData={chartData}
    ></VerticalbarDouChartDonut>
  );
}
