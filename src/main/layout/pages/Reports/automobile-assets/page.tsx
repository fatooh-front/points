import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "السيارات التي تم اختيارها من الواتساب";

const chartData = [
  { id: 10, car: "يارس-(268)", value: 32, color: "#E48B86" },
  { id: 9, car: "النترا-(141)", value: 343, color: "#5A44D3" },
  { id: 8, car: "اكسنت-(129)", value: 323, color: "#05C1C7" },
  { id: 7, car: "فينيو-(113)", value: 334, color: "#30A75F" },
  { id: 6, car: "رايز-(110)", value: 335, color: "#575560" },
  { id: 5, car: "جراند اى 10-(97)", value: 345, color: "#F14B41" },
  { id: 4, car: "جوليان-(91)", value: 535, color: "#F2AE31" },
  { id: 3, car: "سبورتاج-(30)", value: 355, color: "#185D84" },
  { id: 2, car: "تورس-(29)", value: 35, color: "#B8D08E" },
  { id: 1, car: "جيمس يوكن قصير-(28)", value: 355, color: "#C8D645" },
];

const chartConfig = {
  value: {
    label: "عدد الاختيارات",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const Page = () => {
  return (
    <div className="">
      <Card className="  bg-white">
        <CardHeader>
          <CardTitle>أصول السيارات</CardTitle>
          {/* <CustomNumberInput
            value={4}
            onChange={(e) => console.log(e)}
          ></CustomNumberInput> */}
        </CardHeader>
        <CardContent className="">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                layout="vertical"
                barCategoryGap="5%"
                barSize={28}
              >
                <XAxis
                  axisLine={false}
                  tickLine={false}
                  type="number"
                  height={50}
                  dy={30}
                  dataKey="value"
                  domain={[0, 60]}
                />
                <YAxis
                  dataKey="id"
                  type="category"
                  tickLine={false}
                  dx={-70}
                  width={80}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  label={({ x, y, width, height, index }) => {
                    const data = chartData[index];
                    return (
                      <text
                        x={x + width / 2}
                        y={y + height / 2}
                        fill="white"
                        fontSize={14}
                        textAnchor="middle"
                        alignmentBaseline="central"
                      >
                        {data.car}
                      </text>
                    );
                  }}
                  radius={[0, 10, 10, 0]}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>{" "}
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className=" w-full items gap-2 text-sm">
          <div className=" w-full">
            <div className=" flex justify-between   w-full items gap-2 text-sm">
              {chartData.map((item) => (
                <div className="">
                  <div className=" flex  items-center  gap-2">
                    <div
                      className=" w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>{" "}
                    {item.car}{" "}
                  </div>
                  % {item.value}
                </div>
              ))}
            </div>
            <div className=" w-full mx-auto mb-[12px] mt-[32px] text-center text-base font-normal text-[#8E8E8E] ">
              هذا التقرير يوضح النسبة المئوية المملوكة لكل نوع سيارة مقارنة
              بباقي الاصول من السيارت
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;

