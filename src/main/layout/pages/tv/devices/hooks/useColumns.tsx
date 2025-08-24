import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";

import { Dot } from "lucide-react";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const columns: ColumnDef<{
    branchName: string;
    activationDate: string;
    lastDisplayDate: string;
    isActive: boolean;
    id: string;
  }>[] = [
    {
      id: "branchName",
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Branches.table.header.branchName", {
            defaultValue: "الفرع",
          })}
        />
      ),
      cell: ({ row }) => row.original.branchName,
      meta: {
        header: t("Branches.table.header.branchName", {
          defaultValue: "الفرع",
        }),
      },
    },
    {
      id: "activationDate",
      accessorKey: "activationDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Branches.table.header.activationDate", {
            defaultValue: "تاريخ التفعيل",
          })}
        />
      ),
      cell: ({ row }) => row.original.activationDate,
      meta: {
        header: t("Branches.table.header.activationDate", {
          defaultValue: "تاريخ التفعيل",
        }),
      },
    },
    {
      id: "lastDisplayDate",
      accessorKey: "lastDisplayDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Branches.table.header.lastDisplayDate", {
            defaultValue: "آخر تاريخ للعرض",
          })}
        />
      ),
      cell: ({ row }) => row.original.lastDisplayDate,
      meta: {
        header: t("Branches.table.header.lastDisplayDate", {
          defaultValue: "آخر تاريخ للعرض",
        }),
      },
    },
    {
      id: "isActive",
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Branches.table.header.isActive", {
            defaultValue: "حالة التفعيل",
          })}
        />
      ),
      cell: ({ row }) => (
        <div
          className={` w-[90px] mx-auto text-sm h-[36px] flex items-center justify-center rounded-[6px] border ${
            row.original.isActive ? " text-[#7AAA81]" : " text-[#E52B2E]"
          }`}
        >
          <Dot width={15} strokeWidth={5}></Dot>{" "}
          {row.original.isActive
            ? t("Branches.table.status.active", { defaultValue: "مفعل" })
            : t("Branches.table.status.inactive", { defaultValue: "غير مفعل" })}
        </div>
      ),
      meta: {
        header: t("Branches.table.header.isActive", {
          defaultValue: "حالة التفعيل",
        }),
      },
    },
    {
      id: "actions",
      header: t("Branches.table.header.actions", {
        defaultValue: "الأوامر",
      }),
      cell: () => (
        <div className="flex justify-center items-center gap-2">
          <TDeleteDialog />
        </div>
      ),
      meta: {
        header: t("Branches.table.header.actions", {
          defaultValue: "الأوامر",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
