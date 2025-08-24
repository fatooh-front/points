"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "8/4", clients: -0.1, clients2: -0.1, clients3: -0.5 },
  { date: "9/4", clients: 0.0, clients2: 0.0, clients3: -0.4 },
  { date: "10/4", clients: 0.1, clients2: 0.1, clients3: -0.3 },
  { date: "11/4", clients: 0.2, clients2: 0.2, clients3: -0.2 },
  { date: "12/4", clients: 0.3, clients2: 0.3, clients3: -0.1 },
  { date: "13/4", clients: 0.4, clients2: 0.4, clients3: 0.2 },
  { date: "14/4", clients: 0.5, clients2: 0.5, clients3: 0.5 },
  { date: "15/4", clients: 0.4, clients2: 0.6, clients3: 0.2 },
  { date: "16/4", clients: 0.3, clients2: 0.7, clients3: -0.1 },
  { date: "17/4", clients: 0.1, clients2: 0.6, clients3: -0.4 },
  { date: "18/4", clients: -0.2, clients2: 0.5, clients3: -0.8 },
  { date: "19/4", clients: 0.2, clients2: 0.3, clients3: -0.5 },
  { date: "20/4", clients: 0.6, clients2: 0.0, clients3: -0.2 },
  { date: "21/4", clients: 0.9, clients2: -0.3, clients3: 0.1 },
  { date: "22/4", clients: 1.0, clients2: -0.5, clients3: 0.3 },
  { date: "23/4", clients: 0.8, clients2: -0.2, clients3: 0.5 },
  { date: "24/4", clients: 0.6, clients2: 0.1, clients3: 0.4 },
  { date: "25/4", clients: 0.4, clients2: 0.3, clients3: 0.2 },
  { date: "26/4", clients: 0.2, clients2: 0.5, clients3: 0.0 },
  { date: "27/4", clients: 0.0, clients2: 0.6, clients3: -0.2 },
  { date: "28/4", clients: -0.1, clients2: 0.5, clients3: -0.4 },
  { date: "29/4", clients: 0.0, clients2: 0.3, clients3: -0.6 },
  { date: "30/4", clients: 0.2, clients2: 0.1, clients3: -0.7 },
  { date: "1/5", clients: 0.4, clients2: -0.2, clients3: -0.8 },
  { date: "2/5", clients: 0.6, clients2: -0.4, clients3: -0.6 },
  { date: "3/5", clients: 0.7, clients2: -0.5, clients3: -0.4 },
  { date: "4/5", clients: 0.8, clients2: -0.3, clients3: -0.1 },
  { date: "5/5", clients: 0.9, clients2: -0.1, clients3: 0.2 },
  { date: "6/5", clients: 0.95, clients2: 0.0, clients3: 0.5 },
  { date: "7/5", clients: 1.0, clients2: 0.1, clients3: 0.8 },
];

export function ConversationsLast30DaysChart() {
  return (
    <Card className=" bg-white">
      <CardHeader>
        <CardTitle>المحادثات آخر 30 يوم</CardTitle>
        <CardDescription>من 8/4 إلى 7/5</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className=" h-[272px] w-full"
          config={{
            clients: { label: "العملاء الجدد", color: "#C5255F" },
            clients2: { label: "العملاء 4الجدد", color: "#2C8AA0" },
            clients3: { label: "العملاء 4الجدد", color: "#CE931A" },
          }}
        >
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={22} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="clients"
              type="monotone"
              stroke="var(--color-clients)"
              strokeWidth={4}
              dot={false}
            />
            <Line
              dataKey="clients2"
              type="monotone"
              stroke="var(--color-clients2)"
              strokeWidth={4}
              dot={false}
            />
            <Line
              dataKey="clients3"
              type="monotone"
              stroke="var(--color-clients3)"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
