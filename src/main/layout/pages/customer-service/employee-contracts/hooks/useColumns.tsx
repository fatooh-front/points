import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

interface EmployeeStats {
  empName: string;
  createdContracts: number;
  closedContracts: number;
  openPoints: number;
  closedPoints: number;
  totalPoints: number;
}
export const useColumns = () => {
  const { t } = useTranslation("EmployeeStats");

  const columns: ColumnDef<EmployeeStats>[] = [
    {
      accessorKey: "empName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.header.empName", { defaultValue: "اسم الموظف" })}
        />
      ),
    },
    {
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.header.totalPoints", {
            defaultValue: " اسم الفرع",
          })}
        />
      ),
    },
    {
      accessorKey: "openPoints",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.header.openPoints", {
            defaultValue: "نقاط  العقود المفتوحة",
          })}
        />
      ),
    },
    {
      accessorKey: "closedPoints",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.header.closedPoints", {
            defaultValue: "نقاط  العقود المغلقة",
          })}
        />
      ),
    },
    {
      accessorKey: "mapPoints",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.header.totalPoints", {
            defaultValue: "نقاط التقيم",
          })}
        />
      ),
    },
    {
      accessorKey: "totalPoints",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.header.totalPoints", {
            defaultValue: "إجمالي النقاط",
          })}
        />
      ),
      cell: ({ row }) => <div>{row.original.totalPoints ?? 0}</div>,
    },
  ];

  return { columns };
};
