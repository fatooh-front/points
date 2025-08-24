import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const useColumns = () => {
  const columns: ColumnDef<{
    branchName: string;
    rentedCarsCount: number;
    accidentCount: number;
    accidentPercentage: number; // أو string لو بترجّعها جاهزة بـ %
  }>[] = [
    {
      id: "branchName",
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اسم الفرع" />
      ),
      cell: ({ row }) => row.original.branchName,
      meta: {
        header: "اسم الفرع",
      },
    },
    {
      id: "rentedCarsCount",
      accessorKey: "rentedCarsCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="عدد السيارات المؤجرة" />
      ),
      cell: ({ row }) => row.original.rentedCarsCount,
      meta: {
        header: "عدد السيارات المؤجرة",
      },
    },
    {
      id: "accidentCount",
      accessorKey: "accidentCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="عدد الحوادث" />
      ),
      cell: ({ row }) => row.original.accidentCount,
      meta: {
        header: "عدد الحوادث",
      },
    },
    {
      id: "accidentPercentage",
      accessorKey: "accidentPercentage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="النسبة المئوية للحوادث" />
      ),
      cell: ({ row }) => `${row.original.accidentPercentage}%`,
      meta: {
        header: "النسبة المئوية للحوادث",
      },
    },
  ];

  return { columns };
};
