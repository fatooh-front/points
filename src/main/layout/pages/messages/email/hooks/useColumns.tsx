import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";

import { useDeleteBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";

export const useColumns = () => {
  const { t } = useTranslation("CarBranch");
  const { mutate: mutate } = useDeleteBranches();
  const columns: ColumnDef<{
    email?: string;
    messageDate?: string;
  }>[] = [
    {
      id: "messageDate",
      accessorKey: "messageDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="تاريخ الرسالة" />
      ),
      cell: ({ row }) => row.original.messageDate || "",
      meta: {
        header: "تاريخ الرسالة",
      },
    },

    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="البريد الإلكتروني" />
      ),
      cell: ({ row }) => row.original.email || "",
      meta: {
        header: "البريد الإلكتروني",
      },
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("actions")} />
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <TDeleteDialog
            id={row.original?.email}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return {
    columns,
  };
};
