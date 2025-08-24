import { CardFooter } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#14455A] text-white p-2 rounded shadow text-sm">
        <p className="font-semibold">{label}</p>
        {payload.map(
          (entry: { name: string; value: string }, index: number) => (
            <p key={index}>{`${entry.name}: ${entry.value}`}</p>
          )
        )}
      </div>
    );
  }
  return null;
};

const VerticalbarDouChartDonut = ({
  chartData,
  title,
  footerTitle,
  increaseColor = "#7AAA81",
  decreaseColor = "#F2AE31",
}: {
  increaseColor?: string;
  decreaseColor?: string;
  footerTitle: string;
  title: string;
  chartData: {
    label: string;
    increase: number | number[];
    decrease: number | number[];
  }[];
}) => {
  return (
    <div className="bg-white py-4 pt-4 rounded-bl-2xl rounded-r-2xl shadow-md">
      <div className="flex justify-between items-center mx-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          barGap={-16}
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <XAxis
            dataKey="label"
            tick={{ fontSize: 14 }}
            interval={0}
            dy={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 14 }}
            dx={-30}
            domain={[-300, 400]} // المدى الكامل للمحور
            ticks={[400, 300, 200, 100, 0, -100, -200, -300]}
            tickFormatter={(v) => `${v}`}
            axisLine={false}
            className=""
            tickLine={false}
          />
          {/* <CartesianGrid vertical={false} /> */}

          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="increase"
            fill={increaseColor}
            radius={[10, 10, 10, 10]}
            barSize={16}
          />

          <Bar
            dataKey="decrease"
            fill={decreaseColor}
            radius={[10, 10, 10, 10]}
            barSize={16}
          />
        </BarChart>
      </ResponsiveContainer>

      <CardFooter className="w-full items gap-2 text-sm">
        <div className="w-full">
          <div className="w-full mx-auto mt-8 text-center text-base font-normal text-[#8E8E8E]">
            {footerTitle}
          </div>
        </div>
      </CardFooter>
    </div>
  );
};

export default VerticalbarDouChartDonut;
