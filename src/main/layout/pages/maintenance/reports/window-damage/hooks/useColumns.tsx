import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const useColumns = () => {
  const columns: ColumnDef<{
    ticketNumber: string;
    contractNumber: string;
    carNumber: string;
    maintenanceStartDate: string;
    maintenanceEndDate: string;
    maintenanceType: string;
    deductible: number;
    amount: number;
    actions?: React.ReactNode;
  }>[] = [
    {
      id: "ticketNumber",
      accessorKey: "ticketNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم التذكرة" />
      ),
      cell: ({ row }) => row.original.ticketNumber,
      meta: { header: "رقم التذكرة" },
    },
    {
      id: "contractNumber",
      accessorKey: "contractNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم العقد" />
      ),
      cell: ({ row }) => row.original.contractNumber,
      meta: { header: "رقم العقد" },
    },
    {
      id: "carNumber",
      accessorKey: "carNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم السيارة" />
      ),
      cell: ({ row }) => row.original.carNumber,
      meta: { header: "رقم السيارة" },
    },
    {
      id: "maintenanceStartDate",
      accessorKey: "maintenanceStartDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="تاريخ بدأ الصيانة" />
      ),
      cell: ({ row }) => row.original.maintenanceStartDate,
      meta: { header: "تاريخ بدأ الصيانة" },
    },
    {
      id: "maintenanceEndDate",
      accessorKey: "maintenanceEndDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="تاريخ نهاية الصيانة" />
      ),
      cell: ({ row }) => row.original.maintenanceEndDate,
      meta: { header: "تاريخ نهاية الصيانة" },
    },
    {
      id: "maintenanceType",
      accessorKey: "maintenanceType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="نوع الصيانة" />
      ),
      cell: ({ row }) => row.original.maintenanceType,
      meta: { header: "نوع الصيانة" },
    },
    {
      id: "deductible",
      accessorKey: "deductible",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="التحمل" />
      ),
      cell: ({ row }) => row.original.deductible.toLocaleString(),
      meta: { header: "التحمل" },
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="المبلغ" />
      ),
      cell: ({ row }) => row.original.amount.toLocaleString(),
      meta: { header: "المبلغ" },
    },
    {
      id: "actions",
      accessorKey: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الأوامر" />
      ),
      cell: ({ row }) => row.original.actions,
      meta: { header: "الأوامر" },
    },
  ];

  return { columns };
};
