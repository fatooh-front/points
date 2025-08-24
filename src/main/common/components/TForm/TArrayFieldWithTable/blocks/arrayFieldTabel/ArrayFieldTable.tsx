import { DataTable } from "@/main/common/components/dataTable/DataTable";
import { useArrayFieldColumns } from "./hooks/useArrayFieldColumns";
import { ColumnDef } from "@tanstack/react-table";

export default function ArrayFieldTable({
  type,
  fields,
  onDelete,
  onEdit,
  onView,
  columnsPassed,
  readOnly = false,
}: {
  type?: string;
  fields?: any[];
  onDelete?: (field: any, index: number) => void;
  onEdit?: (field: any, index: number) => void;
  onView?: (field: any) => void;
  columnsPassed?: ColumnDef<any>[];
  readOnly?: boolean;
}) {

  const { columns } = useArrayFieldColumns({
    type,
    onDelete,
    onEdit,
    onView,
    columnsPassed,
    readOnly,
  });

  return (
    <div className="w-full">
      <DataTable
        data={fields || []}
        isLoading={false}
        columns={columns}
        isDataTableServer={false}
        isViewOptions={false}
      />
    </div>
  );
}
