import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Dispatch, SetStateAction } from "react";
import TTriggerForm from "@/main/common/components/TForm/triggerForm/TTriggerForm";

type Props = {
  type?: string;
  setArrayFields?: Dispatch<SetStateAction<any>>;
  onDelete?: (field: any, index: number) => void;
  onEdit?: (field: any, index: number) => void;
  onView?: (field: any) => void;
  columnsPassed?: ColumnDef<any>[];
  readOnly?: boolean;
};
export const useArrayFieldColumns = ({
  type: _type = "view",
  onDelete,
  onEdit,
  onView,
  columnsPassed,
  readOnly = false,
}: Props) => {
  const { t } = useTranslation("arrayFieldWithTable");

  const columns: ColumnDef<any>[] = [
    // {
    //   accessorKey: "index",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title={t("table.header.sequance")}
    //     />
    //   ),
    //   cell({ row }) {
    //     return <span className="ps-2">{row.index + 1}</span>;
    //   },
    //   meta: {
    //     header: t("table.header.sequance"),
    //   },
    //   sortingFn: (rowA, rowB) => {
    //     return rowA.index - rowB.index;
    //   },
    // },
    ...(columnsPassed || []),
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.header.actions")}
        />
      ),
      cell({ row }) {
        return (
          <div className="flex items-center gap-1">
            <TTriggerForm type="view" onClick={() => onView?.(row.original)} />

            {!readOnly && (
              <>
                <TTriggerForm
                  type="edit"
                  onClick={() => onEdit?.(row.original, row.index)}
                />
                <TTriggerForm
                  type="delete"
                  onClick={() => onDelete?.(row.original, row.index)}
                />
              </>
            )}
          </div>
        );
      },
      meta: {
        header: t("table.header.actions"),
      },
    },
  ];

  return {
    columns,
  };
};
