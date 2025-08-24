import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import useGetDataOfPage from "./hooks/useGetDataOfPage";
import { useColumns } from "./hooks/useColumns";

export default function Page() {
  // const type = "";

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
      id: "1",
      clientName: "احمد الهلالي",
      mobilenum: "9665154512152",
      date: "23/04/2025 09:22 م",
      ratingType: "تقييم إيجار",
      rat: "150.000",
      rating: "ممتاز",
    },
    {
      id: "2",
      clientName: "احمد الهلالي",
      mobilenum: "9665154512152",
      date: "23/04/2025 09:22 م",
      ratingType: "تقيم الموظف",
      rat: "150.000",
      rating: "جيد جداً",
    },
    {
      id: "3",
      clientName: "احمد الهلالي",
      mobilenum: "9665154512152",
      date: "23/04/2025 09:22 م",
      ratingType: "تقيم الخدمة",
      rat: "150.000",
      rating: "جيد",
    },
    {
      id: "4",
      clientName: "احمد الهلالي",
      mobilenum: "9665154512152",
      date: "23/04/2025 09:22 م",
      ratingType: "تقيم السيارة",
      rat: "150.000",
      rating: "سئ",
    },
    {
      id: "5",
      clientName: "احمد الهلالي",
      mobilenum: "9665154512152",
      date: "23/04/2025 09:22 م",
      ratingType: "تقييم إيجار",
      rat: "150.000",
      rating: "سئ جداً",
    },
    {
      id: "6",
      clientName: "احمد الهلالي",
      mobilenum: "9665154512152",
      date: "23/04/2025 09:22 م",
      ratingType: "تقييم إيجار",
      rat: "150.000",
      rating: "ممتاز",
    },
    {
      id: "7",
      clientName: "احمد الهلالي",
      mobilenum: "9665154512152",
      date: "23/04/2025 09:22 م",
      ratingType: "تقيم الموظف",
      rat: "150.000",
      rating: "جيد جداً",
    },
    {
      id: "8",
      clientName: "احمد الهلالي",
      mobilenum: "9665154512152",
      date: "23/04/2025 09:22 م",
      ratingType: "تقيم الخدمة",
      rat: "150.000",
      rating: "جيد",
    },
    {
      id: "9",
      clientName: "احمد الهلالي",
      mobilenum: "9665154512152",
      date: "23/04/2025 09:22 م",
      ratingType: "تقييم إيجار",
      rat: "150.000",
      rating: "سئ جداً",
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
