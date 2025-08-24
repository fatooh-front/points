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
  console.log(data?.data?.content, "cars?.data");

  return (
    <div className="flex flex-col gap-7 mt-[80px] ">
      {isLoading ||
        !data?.data ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      <HeadeBar></HeadeBar>
      {data?.data && columns && (
        <DataTable
          data={
            Array.isArray(data?.data?.content)
              ? data?.data?.content.map((item, i) => ({
                  id: item.bannerId || i,
                  ...item,
                }))
              : []
          }
          columns={columns as any}
          key={data?.data?.content?.length}
          // paginationOptions={paginationOptions}
          onSelectedServerValueChange={onSelectedServerValueChange}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
