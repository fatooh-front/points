"use client";

// import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";

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
import React from "react";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import colorOpacity from "@/main/global/utils/colorOpacity";
// import colorOpacity from "@/main/global/utils/colorOpacity";

export const description = "A donut chart";

export function ChartPieDonut({
  chartConfig,
  chartData,
  title,
  footerTitle,
  titleInTheMiddle,
}: {
  footerTitle: string;
  title: string;
  titleInTheMiddle?: string;
  chartConfig: { [key: string]: { label: string; color: string } };
  chartData: { fill: string; key: string; count: number }[];
}) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);
  return (
    <Card className="flex flex-col bg-white">
      <CardHeader className="items-start   pb-0">
        <CardTitle>{title} </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[370px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="key"
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector
                    {...props}
                    fill={colorOpacity(props.fill || "#eee")}
                    color={colorOpacity(props.color || "#eee")}
                    outerRadius={outerRadius + 10}
                  ></Sector>
                  <Sector
                    {...props}
                    // fill="#eee"
                    outerRadius={outerRadius}
                  ></Sector>{" "}
                </g>
              )}
              innerRadius={titleInTheMiddle ? 100 : 0}
            >
              {" "}
              {titleInTheMiddle && (
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            fill="#C9972B"
                            style={{
                              fontFamily: "Cairo",
                              fontWeight: 500,
                              fontSize: "24px",
                              lineHeight: "20px",
                              letterSpacing: "0px",
                              textAlign: "center",
                            }}
                            // className=" text-[24px]  font-medium"
                          >
                            {titleInTheMiddle}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              )}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className=" w-full items gap-2 text-sm">
        <div className=" w-full">
          <div className=" flex justify-between   min-w-11   w-full items gap-2 text-sm">
            {chartData.map((item) => (
              <div className="">
                <div className=" flex  items-center  gap-2">
                  <div
                    className=" w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  ></div>{" "}
                  {`${chartConfig[item.key].label}-(${item.count}201)`}{" "}
                </div>
                % {item.count}
              </div>
            ))}
          </div>
          <div className=" w-full mx-auto mb-[12px] mt-[32px] text-center text-base font-normal text-[#8E8E8E] ">
            {footerTitle}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
