import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const useColumns = () => {
  const columns: ColumnDef<{
    fromDate: string;
    toDate: string;
    totalInsuranceCompensation: number;
    totalCustomerCompensation: number;
    totalAmount: number;
  }>[] = [
    {
      id: "fromDate",
      accessorKey: "fromDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="من تاريخ" />
      ),
      cell: ({ row }) => row.original.fromDate,
      meta: {
        header: "من تاريخ",
      },
    },
    {
      id: "toDate",
      accessorKey: "toDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="إلى تاريخ" />
      ),
      cell: ({ row }) => row.original.toDate,
      meta: {
        header: "إلى تاريخ",
      },
    },
    {
      id: "totalInsuranceCompensation",
      accessorKey: "totalInsuranceCompensation",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="إجمالي تعويضات شركات التأمين"
        />
      ),
      cell: ({ row }) => row.original.totalInsuranceCompensation,
      meta: {
        header: "إجمالي تعويضات شركات التأمين",
      },
    },
    {
      id: "totalCustomerCompensation",
      accessorKey: "totalCustomerCompensation",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="إجمالي تعويضات العملاء" />
      ),
      cell: ({ row }) => row.original.totalCustomerCompensation,
      meta: {
        header: "إجمالي تعويضات العملاء",
      },
    },
    {
      id: "totalAmount",
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الإجمالي" />
      ),
      cell: ({ row }) => row.original.totalAmount,
      meta: {
        header: "الإجمالي",
      },
    },
  ];

  return { columns };
};
