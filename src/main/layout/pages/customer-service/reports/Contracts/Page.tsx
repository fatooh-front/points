import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import useGetDataOfPage from "./hooks/useGetDataOfPage";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./headeBar";

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
      branchId: 1,
      contractStatus: "مغلق",
      total: "169.57",
      to: "05/05/2025",
      from: "05/05/2025",
      date: "05/05/2025",
      customerServiceEmployee: "محمد السيد منير",
      branchEmployeeName: "محمد السيد منير",
      branch: "فرع الزهرة-مكة",
      contractNumber: "124011325",
      customerName: "محمد السيد منير",
      carName: "التاهو 2024 رمادي ر ط 4033",
      paymentStatus: "مغلق",
    },
    {
      branchId: 2,
      contractStatus: "ساري",
      total: "1560.0",
      to: "05/05/2025",
      from: "05/05/2025",
      date: "05/05/2025",
      customerServiceEmployee: "محمد السيد منير",
      branchEmployeeName: "محمد السيد منير",
      branch: "فرع الزهرة-مكة",
      contractNumber: "168",
      customerName: "محمد السيد منير",
      carName: "توسان موديل 2023 رمادي غامق س ر 6079",
      paymentStatus: "ساري",
    },
    {
      branchId: 3,
      contractStatus: "مطالبة",
      total: "24143.75",
      to: "05/05/2025",
      from: "05/05/2025",
      date: "05/05/2025",
      customerServiceEmployee: "محمد السيد منير",
      branchEmployeeName: "محمد السيد منير",
      branch: "فرع الزهرة-مكة",
      contractNumber: "168",
      customerName: "محمد السيد منير",
      carName: "أقوى آية 6 موديل 2023 رمادي ردك 8680",
      paymentStatus: "مطالبة",
    },
    {
      branchId: 4,
      contractStatus: "غير ظاهرة",
      total: "كاش",
      to: "05/05/2025",
      from: "05/05/2025",
      date: "05/05/2025",
      customerServiceEmployee: "محمد السيد منير",
      branchEmployeeName: "محمد السيد منير",
      branch: "فرع الزهرة-مكة",
      contractNumber: "168",
      customerName: "محمد السيد منير",
      carName: "يارس موديل 2022 أبيض ر أ 8259",
      paymentStatus: "غير ظاهرة",
    },
    {
      branchId: 5,
      contractStatus: "ساري",
      total: "1560.0",
      to: "05/05/2025",
      from: "05/05/2025",
      date: "05/05/2025",
      customerServiceEmployee: "محمد السيد منير",
      branchEmployeeName: "محمد السيد منير",
      branch: "فرع الزهرة-مكة",
      contractNumber: "168",
      customerName: "محمد السيد منير",
      carName: "توسان موديل 2023 رمادي غامق س ر 6079",
      paymentStatus: "ساري",
    },
    {
      branchId: 6,
      contractStatus: "ساري",
      total: "1560.0",
      to: "05/05/2025",
      from: "05/05/2025",
      date: "05/05/2025",
      customerServiceEmployee: "محمد السيد منير",
      branchEmployeeName: "محمد السيد منير",
      branch: "فرع الزهرة-مكة",
      contractNumber: "168",
      customerName: "محمد السيد منير",
      carName: "توسان موديل 2023 رمادي غامق س ر 6079",
      paymentStatus: "ساري",
    },
    {
      branchId: 7,
      contractStatus: "غير ظاهرة",
      total: "كاش",
      to: "05/05/2025",
      from: "05/05/2025",
      date: "05/05/2025",
      customerServiceEmployee: "محمد السيد منير",
      branchEmployeeName: "محمد السيد منير",
      branch: "فرع الزهرة-مكة",
      contractNumber: "168",
      customerName: "محمد السيد منير",
      carName: "أكسنت موديل 2023 أبيض ح ع 9347",
      paymentStatus: "غير ظاهرة",
    },
    {
      branchId: 8,
      contractStatus: "مطالبة",
      total: "24143.75",
      to: "05/05/2025",
      from: "05/05/2025",
      date: "05/05/2025",
      customerServiceEmployee: "محمد السيد منير",
      branchEmployeeName: "محمد السيد منير",
      branch: "فرع الزهرة-مكة",
      contractNumber: "168",
      customerName: "محمد السيد منير",
      carName: "أقوى آية 6 موديل 2023 رمادي ردك 8680",
      paymentStatus: "مطالبة",
    },
    {
      branchId: 9,
      contractStatus: "غير ظاهرة",
      total: "كاش",
      to: "05/05/2025",
      from: "05/05/2025",
      date: "05/05/2025",
      customerServiceEmployee: "محمد السيد منير",
      branchEmployeeName: "محمد السيد منير",
      branch: "فرع الزهرة-مكة",
      contractNumber: "168",
      customerName: "محمد السيد منير",
      carName: "اكسنت 2024 أبيض ر ط ك 8084",
      paymentStatus: "غير ظاهرة",
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
              ? demoData.map((item) => ({ ...item, id: item.branchId }))
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
