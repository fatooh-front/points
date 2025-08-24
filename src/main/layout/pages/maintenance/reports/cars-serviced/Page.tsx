import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/headeBar";

export default function Page() {
  // const [textSearch, setTextSearch] = useState("");
  const { columns } = useColumns();

  // const { optionsFilter: _optionsFilter, optionsServerFilter } =
  //   useCarsFilters();

  const isLoading = false;

  const onSelectedServerValueChange = () => {};

  return (
    <div className="flex flex-col gap-7 mt-[80px] ">
      {isLoading ||
        !true ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      <HeadeBar></HeadeBar>

      {true && columns && (
        <DataTable
          data={[]}
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
