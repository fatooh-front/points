import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import useGetDataOfPage from "./hooks/useGetDataOfPage";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./headeBar";

export default function Page() {
  const {
    data,
    isLoading,
    onSelectedServerValueChange,
    // onSearchChange,
    // onSearch,
  } = useGetDataOfPage();

  const { columns } = useColumns();

  // const { optionsFilter: _optionsFilter, optionsServerFilter } =
  //   useCarsFilters();
  console.log(data?.data, "cars?.data");

  // Demo data for preview purposes
  // Remove this and use real data in production
  // بيانات تجريبية للمعاينة فقط
  // احذف هذا واستخدم البيانات الحقيقية في الإنتاج
  const demoData = [
    {
      comment: "تواصلت مع العميل ولم يرد",
      type: "Client",
      date: "2024/04/24",
      employeeName: "احمد باقاسي",
      mobile: "0552467335",
      customerName: "هاني البريكي",
    },
    {
      comment: "تواصلت مع العميل ولم يرد",
      type: "Lead",
      date: "2024/04/24",
      employeeName: "احمد باقاسي",
      mobile: "0552467335",
      customerName: "هاني البريكي",
    },
    {
      comment: "تواصلت مع العميل ولم يرد",
      type: "Lead",
      date: "2024/04/24",
      employeeName: "احمد باقاسي",
      mobile: "0552467335",
      customerName: "هاني البريكي",
    },
    {
      comment: "تواصلت مع العميل ولم يرد",
      type: "Client",
      date: "2024/04/24",
      employeeName: "احمد باقاسي",
      mobile: "0552467335",
      customerName: "هاني البريكي",
    },
    {
      comment: "تواصلت مع العميل ولم يرد",
      type: "Lead",
      date: "2024/04/24",
      employeeName: "احمد باقاسي",
      mobile: "0552467335",
      customerName: "هاني البريكي",
    },
    {
      comment: "تواصلت مع العميل ولم يرد",
      type: "Client",
      date: "2024/04/24",
      employeeName: "احمد باقاسي",
      mobile: "0552467335",
      customerName: "هاني البريكي",
    },
    {
      comment: "تواصلت مع العميل ولم يرد",
      type: "Client",
      date: "2024/04/24",
      employeeName: "احمد باقاسي",
      mobile: "0552467335",
      customerName: "هاني البريكي",
    },
    {
      comment: "تواصلت مع العميل ولم يرد",
      type: "Client",
      date: "2024/04/24",
      employeeName: "احمد باقاسي",
      mobile: "0552467335",
      customerName: "هاني البريكي",
    },
    {
      comment: "تواصلت مع العميل ولم يرد",
      type: "Lead",
      date: "2024/04/24",
      employeeName: "احمد باقاسي",
      mobile: "0552467335",
      customerName: "هاني البريكي",
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
              ? demoData.map((item) => ({ ...item, id: item.customerName }))
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
