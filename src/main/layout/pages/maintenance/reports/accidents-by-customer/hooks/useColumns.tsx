import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const useColumns = () => {
  const columns: ColumnDef<{
    customerName: string;
    mobileNumber: string;
    rentedCarsCount: number;
    accidentCount: number;
    accidentPercentage: number; // أو string لو جاي من API كنص
  }>[] = [
    {
      id: "customerName",
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اسم العميل" />
      ),
      cell: ({ row }) => row.original.customerName,
      meta: {
        header: "اسم العميل",
      },
    },
    {
      id: "mobileNumber",
      accessorKey: "mobileNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم الجوال" />
      ),
      cell: ({ row }) => row.original.mobileNumber,
      meta: {
        header: "رقم الجوال",
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
      cell: ({ row }) =>
        typeof row.original.accidentPercentage === "number"
          ? `${(row.original.accidentPercentage * 100).toFixed(2)}%`
          : row.original.accidentPercentage,
      meta: {
        header: "النسبة المئوية للحوادث",
      },
    },
  ];

  return { columns };
};
