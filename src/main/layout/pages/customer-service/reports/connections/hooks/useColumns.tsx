import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const useColumns = () => {
  const { t } = useTranslation("CarBranch");
  const columns: ColumnDef<{
    comment: string;
    type: string;
    date: string;
    employeeName: string;
    mobile: string;
    customerName: string;
  }>[] = [
    {
      id: "customerName",
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.customerName", {
            defaultValue: "اسم العميل",
          })}
        />
      ),
      cell: ({ row }) => row.original.customerName,
      meta: {
        header: t("Reports.table.header.customerName", {
          defaultValue: "اسم العميل",
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
      id: "employeeName",
      accessorKey: "employeeName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.employeeName", {
            defaultValue: "اسم الموظف",
          })}
        />
      ),
      cell: ({ row }) => row.original.employeeName,
      meta: {
        header: t("Reports.table.header.employeeName", {
          defaultValue: "اسم الموظف",
        }),
      },
    },
    {
      id: "date",
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.date", { defaultValue: "التاريخ" })}
        />
      ),
      cell: ({ row }) => row.original.date,
      meta: {
        header: t("Reports.table.header.date", { defaultValue: "التاريخ" }),
      },
    },
    {
      id: "type",
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.type", { defaultValue: "النوع" })}
        />
      ),
      cell: ({ row }) => (
        <div
          className={`w-[90px] mx-auto text-sm h-[36px] flex items-center justify-center rounded-[6px] border ${
            row.original.type === "Lead" ? "text-[#F2AE31]" : "text-[#2C8AA0]"
          }`}
        >
          {row.original.type}
        </div>
      ),
      meta: {
        header: t("Reports.table.header.type", { defaultValue: "النوع" }),
      },
    },
    {
      id: "comment",
      accessorKey: "comment",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Reports.table.header.comment", { defaultValue: "التعليق" })}
        />
      ),
      cell: ({ row }) => row.original.comment,
      meta: {
        header: t("Reports.table.header.comment", { defaultValue: "التعليق" }),
      },
    },
  ];

  return {
    columns,
  };
};
