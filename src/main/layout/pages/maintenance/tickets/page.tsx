import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import useGetDataOfPage from "./hooks/useGetDataOfPage";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/headeBar";

export default function Page() {
  const type = "";

  const {
    data,
    isLoading,
    onSelectedServerValueChange,
    // onSearchChange,
    // onSearch,
  } = useGetDataOfPage();

  const { columns } = useColumns({ type });

  // const { optionsFilter: _optionsFilter, optionsServerFilter } =
  //   useCarsFilters();
  console.log(data?.data, "cars?.data");

  // Demo data for preview purposes
  // Remove this and use real data in production
  // بيانات تجريبية للمعاينة فقط
  // احذف هذا واستخدم البيانات الحقيقية في الإنتاج
  const demoData = [
    {
      ticketStatus: "مغلقة",
      stage: "المرحلة الأولى",
      maintenanceType: "دورية",
      ticketTitle: "تغيير زيت المحرك",
      maintenanceEndDate: "2024/05/10",
      maintenanceStartDate: "2024/05/05",
      ticketDate: "2024/05/01 10:00",
      carNumber: "1234",
      ticketNumber: "TCK-001",
      serialNumber: "SN-0001",
    },
    {
      ticketStatus: "قيد العمل",
      stage: "المرحلة الثانية",
      maintenanceType: "طارئة",
      ticketTitle: "إصلاح الفرامل",
      maintenanceEndDate: "2024/06/15",
      maintenanceStartDate: "2024/06/10",
      ticketDate: "2024/06/09 09:30",
      carNumber: "5678",
      ticketNumber: "TCK-002",
      serialNumber: "SN-0002",
    },
    {
      ticketStatus: "تذكرة جديدة",
      stage: "المرحلة الثالثة",
      maintenanceType: "دورية",
      ticketTitle: "فحص شامل",
      maintenanceEndDate: "2024/07/20",
      maintenanceStartDate: "2024/07/15",
      ticketDate: "2024/07/14 14:20",
      carNumber: "9101",
      ticketNumber: "TCK-003",
      serialNumber: "SN-0003",
    },
    {
      ticketStatus: "مغلقة",
      stage: "المرحلة الأولى",
      maintenanceType: "طارئة",
      ticketTitle: "تغيير بطارية",
      maintenanceEndDate: "2024/08/05",
      maintenanceStartDate: "2024/08/01",
      ticketDate: "2024/07/31 08:00",
      carNumber: "1121",
      ticketNumber: "TCK-004",
      serialNumber: "SN-0004",
    },
    {
      ticketStatus: "قيد العمل",
      stage: "المرحلة الثانية",
      maintenanceType: "دورية",
      ticketTitle: "تبديل إطارات",
      maintenanceEndDate: "2024/09/12",
      maintenanceStartDate: "2024/09/10",
      ticketDate: "2024/09/09 11:45",
      carNumber: "3141",
      ticketNumber: "TCK-005",
      serialNumber: "SN-0005",
    },
  ];

  return (
    <div className="flex flex-col gap-7 mt-[80px] ">
      {isLoading ||
        !demoData ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      <HeadeBar></HeadeBar>
      {demoData && columns && (
        <DataTable
          data={
            Array.isArray(demoData)
              ? demoData.map((item) => ({ ...item, id: item.ticketNumber }))
              : []
          }
          columns={columns as any}
          // paginationOptions={paginationOptions}
          onSelectedServerValueChange={onSelectedServerValueChange}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
