import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "السيارات التي تم اختيارها من الواتساب";

const chartData = [
  { car: "haval jolion 2024", value: 13 },
  { car: "Ford Taurus 2022", value: 18 },
  { car: "Hyundai Elantra 2024", value: 7 },
  { car: "BMW 730 2020", value: 12 },
  { car: "Audi A6 2022", value: 3 },
  { car: "Hyundai Creta 2022", value: 39 },
  { car: "Hyundai Kona 2022", value: 15 },
  { car: "Hyundai Tucson 2022", value: 21 },
  { car: "Ford Taurus 2024", value: 6 },
  { car: "BMW I218 2023", value: 12 },
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
          <CardTitle>السيارات التي تم اختيارها من الواتساب</CardTitle>
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
                  dataKey="car"
                  type="category"
                  tickLine={false}
                  dx={-170}
                  width={180}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar radius={[0, 10, 10, 0]} dataKey="value" fill="#2C8AA0" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
