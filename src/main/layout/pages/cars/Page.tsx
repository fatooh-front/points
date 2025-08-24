import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import useGetDataOfPage from "./hooks/useGetDataOfPage";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/HeadeBar/HeadeBar";

export default function Page() {
  const type = "";

  const {
    data,
    isLoading,
    paginationOptions,
    onSelectedServerValueChange,
    searchText,
    setSearchText,
  } = useGetDataOfPage({ type });

  const onItemSelect = (selected: string) => {
    if (paginationOptions) {
      if (selected !== "All") {
        paginationOptions?.setLimit &&
          paginationOptions?.setLimit(paginationOptions.totalnums || 100);
      } else {
        paginationOptions?.setLimit && paginationOptions.setLimit(10);
      }
    }
  };
  const { columns } = useColumns({ type, onItemSelect });

  // const { optionsFilter: _optionsFilter, optionsServerFilter } =
  //   useCarsFilters();
  console.log(data?.data, "cars?.data");

  return (
    <div className="flex flex-col gap-7 mt-[80px]">
      {isLoading && (
        <div className="p-10 mt-30">
          <TableSkeleton />
        </div>
      )}{" "}
      <HeadeBar
        value={searchText}
        OnChangeSearchBar={(searchText: string) => {
          setSearchText(searchText);
        }}
      ></HeadeBar>
      {data && columns && (
        <DataTable
          data={
            Array.isArray(data?.data?.cars)
              ? data?.data?.cars?.map((item) => ({ ...item, id: item.carId }))
              : []
          }
          columns={columns as any}
          keyOfTableEditPage="cars_table"
          paginationOptions={paginationOptions}
          onSelectedServerValueChange={onSelectedServerValueChange}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
