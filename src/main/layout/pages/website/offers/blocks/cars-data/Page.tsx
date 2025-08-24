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
      carName: "تويوتا كامري",
      code: "CAM2024",
      brand: "Toyota",
      model: "Camry",
      type: "Sedan",
      year: "2024",
      engineCapacity: "Hybrid",
      price: "150",
      id: "C-001",
    },
    {
      carName: "هيونداي النترا",
      code: "ELN2023",
      brand: "Hyundai",
      model: "Elantra",
      type: "Sedan",
      year: "2023",
      engineCapacity: "Gasoline",
      price: "120",
      id: "C-002",
    },
    {
      carName: "كيا سبورتاج",
      code: "SPT2022",
      brand: "Kia",
      model: "Sportage",
      type: "SUV",
      year: "2022",
      engineCapacity: "Diesel",
      price: "200",
      id: "C-003",
    },
  ];

  // Define default pagination options

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
          data={Array.isArray(demoData) ? demoData : []}
          columns={columns as any}
          // keyOfTableEditPage="cars_table"
          onSelectedServerValueChange={onSelectedServerValueChange}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
