import { CardFooter } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#14455A] text-white p-2 rounded shadow text-sm">
        <p className="font-semibold">{label}</p>
        <p>
          {/* Format value with 2 decimal places */}
          {payload[0].value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
    );
  }
  return null;
};

const VerticalbarChartDonut = ({
  chartData,
  title,
  footerTitle,
  color,
  hoverColor,
}: {
  color: string;
  hoverColor: string;
  footerTitle: string;
  title: string;
  chartData: { key: string; value: number }[];
}) => {
  return (
    <div className="bg-white py-4 pt-4 rounded-bl-2xl rounded-r-2xl shadow-md">
      <div className="flex justify-between items-center mx-4  mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title} </h2>
      </div>
      <ResponsiveContainer width="100%" height={480}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          {/* X Axis: Branch names */}
          <XAxis
            dataKey="key"
            tick={{ fontSize: 14 }}
            interval={0}
            angle={0}
            dy={10}
            tickLine={false}
            axisLine={true}
          />
          {/* Y Axis: Value or Count */}
          <YAxis
            tick={{ fontSize: 14 }}
            dx={-30}
            tickFormatter={(v) => v.toLocaleString()}
            axisLine={false}
            tickLine={false}
          />
          {/* Tooltip on hover */}
          <Tooltip content={<CustomTooltip />} />
          {/* Bar for each branch */}
          <Bar
            dataKey="value"
            barSize={60}
            radius={[10, 10, 0, 0]}
            fill={color}
            fillOpacity={1}
            activeBar={{ fill: hoverColor, transform: "s" }}
          />
        </BarChart>
      </ResponsiveContainer>
      <CardFooter className=" w-full items gap-2 text-sm">
        <div className=" w-full">
          <div className=" w-full mx-auto  mt-[32px] text-center text-base font-normal text-[#8E8E8E] ">
            {footerTitle}
          </div>
        </div>
      </CardFooter>
    </div>
  );
};

export default VerticalbarChartDonut;
