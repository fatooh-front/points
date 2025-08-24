import Profile2user from "@/main/global/assets/svg/Profile2user";
import CardDataNum from "./block/card-data-num";
import { ConversationsLast30DaysChart } from "./block/chart-of-chats";
import { ChartPieDonut } from "./block/pie-chart-donut";

const Page = () => {
  return (
    <div className="p-4 min-h-screen text-white">
      <div className="grid grid-cols-4 gap-6 mb-6 ">
        <CardDataNum
          Icon={Profile2user}
          color="#35694C"
          title="عدد المحادثات الكلي"
          num="17446"
          bgColor="#C6E4D6"
          unit="محادثة"
        ></CardDataNum>
        <CardDataNum
          Icon={Profile2user}
          color="#EC1C67"
          title="العملاء المحتملين"
          num="31769"
          unit="عميل"
        ></CardDataNum>
        <CardDataNum
          Icon={Profile2user}
          color="#CE931A"
          title="العملاء الحاليين"
          num="31769"
          unit="عميل"
        ></CardDataNum>
        <CardDataNum
          Icon={Profile2user}
          color="#0051CA"
          title="العملاء الجدد"
          num="31769"
          unit="عميل"
        ></CardDataNum>
      </div>
      <div className="grid grid-cols-4   gap-6 mb-6">
        <ChartPieDonut
          title="المحاداثات"
          chartConfig={{
            new: {
              label: "جديد",
              color: "#0B7FAF",
            },
            old: {
              label: "قديم",
              color: "#F2AE31",
            },
          }}
          chartData={[
            { browser: "old", visitors: 90, fill: "#F2AE31" },

            { browser: "new", visitors: 173, fill: "#0B7FAF" },
          ]}
        ></ChartPieDonut>
        <ChartPieDonut
          title="سبب المحاداثات"
          chartConfig={{
            current_customers: {
              label: "العملاء الحاليين",
              color: "#B89A62",
            },
            potential_customers: {
              label: "العملاء المحتملين",
              color: "#274614",
            },
          }}
          chartData={[
            { browser: "current_customers", visitors: 173, fill: "#B89A62" },
            { browser: "potential_customers", visitors: 90, fill: "#274614" },
          ]}
        ></ChartPieDonut>
        <ChartPieDonut
          title="تم تحويلهم لعملاء"
          chartConfig={{
            become_customer: {
              label: "اصبحو عملاء",
              color: "#EEB747",
            },
            residual: {
              label: "المتبقي",
              color: "#7AAA81",
            },
          }}
          chartData={[
            { browser: "become_customer", visitors: 173, fill: "#EEB747" },
            { browser: "residual", visitors: 90, fill: "#7AAA81" },
          ]}
        ></ChartPieDonut>
        <ChartPieDonut
          title="سبب المحاداثات"
          chartConfig={{
            cars: {
              label: "سيارات",
              color: "#AD53E9",
            },
            offers: {
              label: "عرض",
              color: "#E3D74D",
            },
            complaint: {
              label: "شكوي",
              color: "#625FC3",
            },
            other: {
              label: "غير ذالك",
              color: "#4B7A8D",
            },
          }}
          chartData={[
            { browser: "cars", visitors: 173, fill: "#AD53E9" },
            { browser: "offers", visitors: 90, fill: "#E3D74D" },
            { browser: "complaint", visitors: 90, fill: "#625FC3" },
            { browser: "other", visitors: 90, fill: "#4B7A8D" },
          ]}
        ></ChartPieDonut>
      </div>
      <ConversationsLast30DaysChart></ConversationsLast30DaysChart>{" "}
    </div>
  );
};

export default Page;
