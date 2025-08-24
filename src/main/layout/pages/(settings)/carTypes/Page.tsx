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
  } = useGetDataOfPage({ type });

  const { columns } = useColumns({ type });

  // const { optionsFilter: _optionsFilter, optionsServerFilter } =
  //   useCarsFilters();
  console.log(data?.data, "cars?.data");

  return (
    <div className="flex flex-col gap-7 mt-[80px] ">
      {isLoading ||
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
              ? data?.data.map((item, index) => ({ ...item, id: index }))
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
