import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/headeBar";

export default function Page() {
  const type = "";

  const data = {
    data: [
      {
        id: "1",
        employeeName: "أحمد علي",
        phone: "966503456789",
        actions: null,
      },
      {
        id: "2",
        employeeName: "سارة محمد",
        phone: "966504567890",
        actions: null,
      },
    ],
  };

  const { columns } = useColumns({ type });

  // const { optionsFilter: _optionsFilter, optionsServerFilter } =
  //   useCarsFilters();
  console.log(data?.data, "cars?.data");

  return (
    <div className="flex flex-col gap-7 mt-[80px] ">
      {true ||
        !data ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      <HeadeBar></HeadeBar>
      {data && columns && (
        <DataTable
          data={
            Array.isArray(data?.data)
              ? data?.data.map((item) => ({ ...item, id: item.id }))
              : []
          }
          columns={columns as any}
          // paginationOptions={paginationOptions}
          // onSelectedServerValueChange={}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
