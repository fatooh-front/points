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
      complaintStatus: "جديدة",
      orderNumber: "ORD-001",
      carCode: "C-1001",
      carName: "تويوتا كامري",
      complaintDate: "2024/04/24 09:18",
      complaintReason: "استفسار العروض التفضيلية",
      mobileNumber: "0552467335",
      contractNumber: "CN-001",
      customerName: "علي بن فايزة",
    },
    {
      complaintStatus: "مغلقة",
      orderNumber: "ORD-002",
      carCode: "C-1002",
      carName: "هيونداي سوناتا",
      complaintDate: "2024/04/24 09:18",
      complaintReason: "حادث",
      mobileNumber: "0552467335",
      contractNumber: "CN-002",
      customerName: "حسان العوفي",
    },
    {
      complaintStatus: "قيد العمل",
      orderNumber: "ORD-003",
      carCode: "C-1003",
      carName: "كيا سيراتو",
      complaintDate: "2024/04/24 09:18",
      complaintReason: "استفسار الأسعار",
      mobileNumber: "0552467335",
      contractNumber: "CN-003",
      customerName: "محمد المالكي",
    },
    {
      complaintStatus: "قيد العمل",
      orderNumber: "ORD-004",
      carCode: "C-1004",
      carName: "مرسيدس C200",
      complaintDate: "2024/04/24 09:18",
      complaintReason: "استفسار عن عمر C200",
      mobileNumber: "0552467335",
      contractNumber: "CN-004",
      customerName: "في عمر",
    },
    {
      complaintStatus: "مغلقة",
      orderNumber: "ORD-005",
      carCode: "C-1005",
      carName: "هوندا أكورد",
      complaintDate: "2024/04/24 09:18",
      complaintReason: "استفسار عام",
      mobileNumber: "0552467335",
      contractNumber: "CN-005",
      customerName: "وليد احمد علي",
    },
    {
      complaintStatus: "جديدة",
      orderNumber: "ORD-006",
      carCode: "C-1006",
      carName: "تويوتا يارس",
      complaintDate: "2024/04/24 09:18",
      complaintReason: "حادث",
      mobileNumber: "0552467335",
      contractNumber: "CN-006",
      customerName: "حسان العوفي",
    },
    {
      complaintStatus: "جديدة",
      orderNumber: "ORD-007",
      carCode: "C-1007",
      carName: "تويوتا كامري",
      complaintDate: "2024/04/24 09:18",
      complaintReason: "استفسار العروض التفضيلية",
      mobileNumber: "0552467335",
      contractNumber: "CN-007",
      customerName: "علي بن فايزة",
    },
    {
      complaintStatus: "مغلقة",
      orderNumber: "ORD-008",
      carCode: "C-1008",
      carName: "فورد تورس",
      complaintDate: "2024/04/24 09:18",
      complaintReason: "حجز تجربة قيادة للنقل الثقيل",
      mobileNumber: "0552467335",
      contractNumber: "CN-008",
      customerName: "محمد المالكي",
    },
    {
      complaintStatus: "مغلقة",
      orderNumber: "ORD-009",
      carCode: "C-1009",
      carName: "شيفروليه ماليبو",
      complaintDate: "2024/04/24 09:18",
      complaintReason: "استفسار عام",
      mobileNumber: "0552467335",
      contractNumber: "CN-009",
      customerName: "شخصي",
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
              ? demoData.map((item) => ({ ...item, id: item.carCode }))
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
