import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import useGetDataOfPage from "./hooks/useGetDataOfPage";
import { useColumns } from "./hooks/useColumns";

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
      branchName: "الفرع الرئيسي",
      activationDate: "2024-01-01",
      lastDisplayDate: "2024-06-01",
      isActive: true,
      id: "1",
    },
    {
      branchName: "فرع الرياض",
      activationDate: "2024-02-15",
      lastDisplayDate: "2024-06-10",
      isActive: true,
      id: "2",
    },
    {
      branchName: "فرع جدة",
      activationDate: "2024-03-10",
      lastDisplayDate: "2024-06-15",
      isActive: false,
      id: "3",
    },
    {
      branchName: "فرع الدمام",
      activationDate: "2024-04-05",
      lastDisplayDate: "2024-06-20",
      isActive: true,
      id: "4",
    },
    {
      branchName: "فرع المدينة",
      activationDate: "2024-05-01",
      lastDisplayDate: "2024-06-25",
      isActive: false,
      id: "5",
    },
  ];

  return (
    <div className="flex flex-col gap-7 ">
      {isLoading ||
        !demoData ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      {demoData && columns && (
        <DataTable
          data={Array.isArray(demoData) ? demoData : []}
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
