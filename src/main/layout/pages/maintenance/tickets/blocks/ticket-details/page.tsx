import Ticket from "./blocks/ticket/ticket";
import Carimage from "./blocks/carimage/bills";
import Insuranceamount from "./blocks/Insurance-amount/Insurance-amount";
import MaintenanceRatios from "./blocks/maintenance-ratios/maintenance-ratios";
import TabsProvider from "./blocks/tabsProvider";
import Bills from "./blocks/Bills";
import ApprovalsCard from "./blocks/components/approvals-card/approvals-card";

export default function page() {
  const ticketDetailsTabs = [
    { id: 10, label: "التذكرة", component: <Ticket /> },
    {
      id: 9,
      label: "صورة السيارة",
      component: (
        <Carimage
          data={[
            {
              title: " الصور قبل الاصلاح من الادمن",
              date: "22-05-2025",
              images: [
                "/public/logo/logo.png",
                "/public/logo/logo.png",
                "/public/logo/logo.png",
                "/public/logo/logo.png",
                "/public/logo/logo.png",
                "/public/logo/logo.png",
              ],
            },
            {
              title: "الصور قبل الاصلاح من الادمن",
              date: "22-05-2025",
              images: [
                "/public/logo/logo.png",
                "/public/logo/logo.png",
                "/public/logo/logo.png",
                "/public/logo/logo.png",
                "/public/logo/logo.png",
                "/public/logo/logo.png",
              ],
            },
            {
              title: "الصور بعد الاصلاح من مركز الصيانة",
            },
            {
              title: " صور التقرير",
            },
          ]}
        />
      ),
    },
    {
      id: 8,
      label: "مبلغ التأمين",
      component: <Insuranceamount></Insuranceamount>,
    },
    {
      id: 7,
      label: "نسب الصيانة",
      component: <MaintenanceRatios></MaintenanceRatios>,
    },
    { id: 6, label: "قطع الغيار", component: <ApprovalsCard></ApprovalsCard> },
    {
      id: 5,
      label: "الأيدي العاملة",
      component: <ApprovalsCard></ApprovalsCard>,
    },
    { id: 4, label: "النقليات", component: <ApprovalsCard></ApprovalsCard> },
    {
      id: 3,
      label: "تكاليف مركز الصيانة",
      component: <ApprovalsCard></ApprovalsCard>,
    },
    {
      id: 2,
      label: "تكاليف اخرى",
      component: <ApprovalsCard></ApprovalsCard>,
    },
    { id: 1, label: "الفواتير", component: <Bills></Bills> },
  ];

  return (
    <div className="flex w-full overflow-hidden  mx-auto rounded-lg shadow-lg bg-white">
      <TabsProvider ticketDetailsTabs={ticketDetailsTabs}></TabsProvider>
    </div>
  );
}
