import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const useColumns = () => {
  const columns: ColumnDef<{
    partsTotal: number;
    laborTotal: number;
    transportTotal: number;
    otherCentersLaborTotal: number;
    otherCostsTotal: number;
    grandTotal: number;
  }>[] = [
    {
      id: "partsTotal",
      accessorKey: "partsTotal",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="إجمالي قطع الغيار" />
      ),
      cell: ({ row }) => row.original.partsTotal,
      meta: {
        header: "إجمالي قطع الغيار",
      },
    },
    {
      id: "laborTotal",
      accessorKey: "laborTotal",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="إجمالي الأجور" />
      ),
      cell: ({ row }) => row.original.laborTotal,
      meta: {
        header: "إجمالي الأجور",
      },
    },
    {
      id: "transportTotal",
      accessorKey: "transportTotal",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="إجمالي النقليات" />
      ),
      cell: ({ row }) => row.original.transportTotal,
      meta: {
        header: "إجمالي النقليات",
      },
    },
    {
      id: "otherCentersLaborTotal",
      accessorKey: "otherCentersLaborTotal",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="إجمالي أجور المراكز الأخرى"
        />
      ),
      cell: ({ row }) => row.original.otherCentersLaborTotal,
      meta: {
        header: "إجمالي أجور المراكز الأخرى",
      },
    },
    {
      id: "otherCostsTotal",
      accessorKey: "otherCostsTotal",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="إجمالي المصروفات الأخرى"
        />
      ),
      cell: ({ row }) => row.original.otherCostsTotal,
      meta: {
        header: "إجمالي المصروفات الأخرى",
      },
    },
    {
      id: "grandTotal",
      accessorKey: "grandTotal",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الإجمالي" />
      ),
      cell: ({ row }) => row.original.grandTotal,
      meta: {
        header: "الإجمالي",
      },
    },
  ];

  return { columns };
};
