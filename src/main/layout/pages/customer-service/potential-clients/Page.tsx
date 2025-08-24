import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/headeBar";
import useGetDataOfPage from "./hooks/useGetDataOfPage";

export default function Page() {
  const type = "";

  const { columns } = useColumns({ type });

  const { data, paginationOptions } = useGetDataOfPage({ type });
  console.log(data, "cars?.data");

  return (
    <div className="flex flex-col gap-7 mt-[80px] ">
      {false ||
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
            Array.isArray(data)
              ? data.map((item, i) => ({ ...item, id: item.leadId || i }))
              : []
          }
          columns={columns as any}
          key={data?.length}
          paginationOptions={paginationOptions}
          // onSelectedServerValueChange={onSelectedServerValueChange}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
