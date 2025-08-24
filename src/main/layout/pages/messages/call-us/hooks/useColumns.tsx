import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";

import { useDeleteBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";

export const useColumns = () => {
  const { t } = useTranslation("CarBranch");
  const { mutate: mutate } = useDeleteBranches();
  const columns: ColumnDef<{
    comment: string;
    type: string;
    date: string;
    email: string;
    mobile: string;
    userName: string;
    actions?: any;
  }>[] = [
    {
      id: "userName",
      accessorKey: "userName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.userName", {
            defaultValue: "اسم المستخدم",
          })}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* Replace with user image if available */}
          {/* <span className="inline-block w-6 h-6 rounded-full bg-gray-300" /> */}
          <span>{row.original.userName}</span>
        </div>
      ),
      meta: {
        header: t("Reports.table.header.userName", {
          defaultValue: "اسم المستخدم",
        }),
      },
    },
    {
      id: "mobile",
      accessorKey: "mobile",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.mobile", { defaultValue: "الجوال" })}
        />
      ),
      cell: ({ row }) => row.original.mobile,
      meta: {
        header: t("Reports.table.header.mobile", { defaultValue: "الجوال" }),
      },
    },
    {
      id: "date",
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.date", {
            defaultValue: "تاريخ الرسالة",
          })}
        />
      ),
      cell: ({ row }) => row.original.date,
      meta: {
        header: t("Reports.table.header.date", {
          defaultValue: "تاريخ الرسالة",
        }),
      },
    },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.email", {
            defaultValue: "البريد الإلكتروني",
          })}
        />
      ),
      cell: ({ row }) => row.original.email,
      meta: {
        header: t("Reports.table.header.email", {
          defaultValue: "البريد الإلكتروني",
        }),
      },
    },
    {
      id: "comment",
      accessorKey: "comment",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.comment", { defaultValue: "الرسالة" })}
        />
      ),
      cell: ({ row }) => (
        <div className=" max-w-[400px] mx-auto">{row.original.comment}</div>
      ),
      meta: {
        header: t("Reports.table.header.comment", { defaultValue: "الرسالة" }),
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
