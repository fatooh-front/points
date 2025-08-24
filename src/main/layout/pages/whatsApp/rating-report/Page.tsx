import BodyWithStars from "@/main/global/assets/svg/BodyWithStars";
import CardDataNum from "./block/card-data-num";
import { ChartPieDonut } from "./block/pie-chart-donut";
import { Frown, Smile, Laugh, Angry } from "lucide-react"; // افترضنا أيقونات مناسبة
import EmojeExcited from "@/main/global/assets/svg/EmojeExcited";

const Page = () => {
  const ratings = [
    { title: "ممتاز", num_of_rat: 265, color: "#985EB3", icon: EmojeExcited },
    { title: "جيد جداً", num_of_rat: 30, color: "#7AAA81", icon: Laugh },
    { title: "جيد", num_of_rat: 6, color: "#CE931A", icon: Smile },
    { title: "سئ", num_of_rat: 2, color: "#144897", icon: Frown },

    { title: "سئ جداً", num_of_rat: 4, color: "#D51619", icon: Angry },
  ];
  return (
    <div className="p-4 min-h-screen text-white">
      <div className="grid grid-cols-4 gap-6 mb-6 ">
        <div
          style={{ borderColor: "#2C8AA0" }}
          className="px-4  text-black text-2xl font-semibold rounded-[4px] py-4 flex border-s-4 bg-white  gap-4 h-[115px] "
        >
          <div
            style={{ backgroundColor: "#2C8AA014" }}
            className=" w-[50px] h-[50px] rounded-full flex justify-center items-center"
          >
            {<BodyWithStars fontSize={30} color="#2C8AA0"></BodyWithStars>}{" "}
          </div>
          <div className=" flex flex-col justify-between  ">
            <p className=" text-[#656565] text-xl">جميع التقيمات</p>
            <p>{2984}</p>
          </div>
        </div>
        <div className=" bg-white col-span-3 rounded-[8px]  grid  grid-cols-5">
          {ratings.map((item) => (
            <CardDataNum item={item}></CardDataNum>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2   gap-6 mb-6">
        <ChartPieDonut
          title="تقييم الإيجارات"
          chartConfig={{
            very_bad: {
              label: "سئ جداً",
              color: "#D51619",
            },
            bad: {
              label: "سئ",
              color: "#144897",
            },
            good: {
              label: "جيد",
              color: "#CE931A",
            },
            very_good: {
              label: "جيد جداً",
              color: "#7AAA81",
            },
            great: {
              label: "ممتاز",
              color: "#985EB3",
            },
          }}
          chartData={[
            { browser: "very_bad", visitors: 90, fill: "#D51619" },

            { browser: "bad", visitors: 173, fill: "#144897" },
            { browser: "good", visitors: 173, fill: "#CE931A" },
            { browser: "very_good", visitors: 173, fill: "#7AAA81" },
            { browser: "great", visitors: 173, fill: "#985EB3" },
          ]}
        ></ChartPieDonut>
        <ChartPieDonut
          title="تقييم الخدمة"
          chartConfig={{
            very_bad: {
              label: "سئ جداً",
              color: "#D51619",
            },
            bad: {
              label: "سئ",
              color: "#144897",
            },
            good: {
              label: "جيد",
              color: "#CE931A",
            },
            very_good: {
              label: "جيد جداً",
              color: "#7AAA81",
            },
            great: {
              label: "ممتاز",
              color: "#985EB3",
            },
          }}
          chartData={[
            { browser: "very_bad", visitors: 90, fill: "#D51619" },

            { browser: "bad", visitors: 173, fill: "#144897" },
            { browser: "good", visitors: 173, fill: "#CE931A" },
            { browser: "very_good", visitors: 173, fill: "#7AAA81" },
            { browser: "great", visitors: 173, fill: "#985EB3" },
          ]}
        ></ChartPieDonut>
        <ChartPieDonut
          title="تقييم السيارات"
          chartConfig={{
            very_bad: {
              label: "سئ جداً",
              color: "#D51619",
            },
            bad: {
              label: "سئ",
              color: "#144897",
            },
            good: {
              label: "جيد",
              color: "#CE931A",
            },
            very_good: {
              label: "جيد جداً",
              color: "#7AAA81",
            },
            great: {
              label: "ممتاز",
              color: "#985EB3",
            },
          }}
          chartData={[
            { browser: "very_bad", visitors: 90, fill: "#D51619" },

            { browser: "bad", visitors: 173, fill: "#144897" },
            { browser: "good", visitors: 173, fill: "#CE931A" },
            { browser: "very_good", visitors: 173, fill: "#7AAA81" },
            { browser: "great", visitors: 173, fill: "#985EB3" },
          ]}
        ></ChartPieDonut>
        <ChartPieDonut
          title="تقييم الموظفين"
          chartConfig={{
            very_bad: {
              label: "سئ جداً",
              color: "#D51619",
            },
            bad: {
              label: "سئ",
              color: "#144897",
            },
            good: {
              label: "جيد",
              color: "#CE931A",
            },
            very_good: {
              label: "جيد جداً",
              color: "#7AAA81",
            },
            great: {
              label: "ممتاز",
              color: "#985EB3",
            },
          }}
          chartData={[
            { browser: "very_bad", visitors: 90, fill: "#D51619" },

            { browser: "bad", visitors: 173, fill: "#144897" },
            { browser: "good", visitors: 173, fill: "#CE931A" },
            { browser: "very_good", visitors: 173, fill: "#7AAA81" },
            { browser: "great", visitors: 173, fill: "#985EB3" },
          ]}
        ></ChartPieDonut>
      </div>
    </div>
  );
};

export default Page;
