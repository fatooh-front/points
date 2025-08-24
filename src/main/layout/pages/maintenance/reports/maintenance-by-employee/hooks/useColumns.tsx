import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const useColumns = () => {
  const columns: ColumnDef<{
    branchName: string;
    employeeName: string;
    receivedCars: number;
    finishedCars: number;
    finishedCarsPercentage: string; // أو number حسب نوع القيمة
  }>[] = [
    {
      id: "branchName",
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اسم المركز" />
      ),
      cell: ({ row }) => row.original.branchName,
      meta: {
        header: "اسم المركز",
      },
    },
    {
      id: "employeeName",
      accessorKey: "employeeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اسم الموظف" />
      ),
      cell: ({ row }) => row.original.employeeName,
      meta: {
        header: "اسم الموظف",
      },
    },
    {
      id: "receivedCars",
      accessorKey: "receivedCars",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="السيارات المستلمة" />
      ),
      cell: ({ row }) => row.original.receivedCars,
      meta: {
        header: "السيارات المستلمة",
      },
    },
    {
      id: "finishedCars",
      accessorKey: "finishedCars",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="السيارات المنتهية" />
      ),
      cell: ({ row }) => row.original.finishedCars,
      meta: {
        header: "السيارات المنتهية",
      },
    },
    {
      id: "finishedCarsPercentage",
      accessorKey: "finishedCarsPercentage",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="النسبة المئوية للسيارات المنتهية"
        />
      ),
      cell: ({ row }) => row.original.finishedCarsPercentage,
      meta: {
        header: "النسبة المئوية للسيارات المنتهية",
      },
    },
  ];

  return { columns };
};
