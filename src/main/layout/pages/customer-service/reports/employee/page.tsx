import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sales value data for each branch
const dataValue = [
  { name: "هاجر أحمد", value: 50 },
  { name: "محمد علي", value: 40 },
  { name: "أحمد باقاسي", value: 30 },
  { name: "أحمد جمال", value: 20 },
  { name: "نسيم دوشي", value: 10 },
];

// Sales count data for each branch
const dataCount = [
  { name: "هاجر أحمد", value: 45000 },
  { name: "محمد علي", value: 38000 },
  { name: "أحمد باقاسي", value: 28000 },
  { name: "أحمد جمال", value: 15000 },
  { name: "نسيم دوشي", value: 10000 },
];

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

const Page = () => {
  // State to toggle between value and count
  const [showCount, setShowCount] = useState(false);

  return (
    <div>
      {/* Toggle buttons for switching between value and count */}
      <div className="flex w-full justify-end gap-2 text-sm">
        <div className="bg-white rounded-tl-2xl">
          <button
            onClick={() => setShowCount(false)}
            className={`${
              !showCount ? "bg-[#C9972B] text-white" : "bg-white text-black"
            } px-4 py-1 rounded`}
          >
            القيمة
          </button>
          <button
            onClick={() => setShowCount(true)}
            className={`${
              showCount ? "bg-[#C9972B] text-white" : "bg-white text-black"
            } px-4 py-1 rounded rounded-tl-2xl`}
          >
            العدد
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="bg-white p-4 rounded-bl-2xl rounded-r-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">الموظفين </h2>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={showCount ? dataCount : dataValue}
            margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
          >
            {/* X Axis: Branch names */}
            <XAxis
              dataKey="name"
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
              fill={showCount ? "#CCBDD2" : "#DAD2C3"}
              fillOpacity={1}
              activeBar={{ fill: showCount ? "#684076" : "#947A43" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Page;
