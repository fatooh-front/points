"use client";

// import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  // ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart";

export function ChartPieDonut({
  chartConfig,
  chartData,
  title,
}: {
  title: string;
  chartConfig: { [key: string]: { label: string; color: string } };
  chartData: { fill: string; browser: string; visitors: number }[];
}) {
  return (
    <Card className="flex flex-col bg-white">
      <CardHeader className="items-start   pb-0">
        <CardTitle>{title} </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={80}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-center gap-2 text-sm">
        {chartData.map((item) => (
          <div className=" flex items-center gap-2">
            <div
              className=" w-3 h-3 rounded-full"
              style={{ backgroundColor: chartConfig[item.browser].color }}
            ></div>{" "}
            {chartConfig[item.browser].label}{" "}
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
