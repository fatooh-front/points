import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const useColumns = () => {
  const columns: ColumnDef<{
    ticketNumber: string;
    carNumber: string;
    startDate: string;
    endDate: string;
    daysCount: number;
    maintenanceType: string;
    center: string;
    employee: string;
  }>[] = [
    {
      id: "ticketNumber",
      accessorKey: "ticketNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم التذكرة" />
      ),
      cell: ({ row }) => row.original.ticketNumber,
      meta: {
        header: "رقم التذكرة",
      },
    },
    {
      id: "carNumber",
      accessorKey: "carNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم السيارة" />
      ),
      cell: ({ row }) => row.original.carNumber,
      meta: {
        header: "رقم السيارة",
      },
    },
    {
      id: "startDate",
      accessorKey: "startDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="تاريخ بداية الصيانة" />
      ),
      cell: ({ row }) => row.original.startDate,
      meta: {
        header: "تاريخ بداية الصيانة",
      },
    },
    {
      id: "endDate",
      accessorKey: "endDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="تاريخ نهاية الصيانة" />
      ),
      cell: ({ row }) => row.original.endDate,
      meta: {
        header: "تاريخ نهاية الصيانة",
      },
    },
    {
      id: "daysCount",
      accessorKey: "daysCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="عدد الأيام" />
      ),
      cell: ({ row }) => row.original.daysCount,
      meta: {
        header: "عدد الأيام",
      },
    },
    {
      id: "maintenanceType",
      accessorKey: "maintenanceType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="نوع الصيانة" />
      ),
      cell: ({ row }) => row.original.maintenanceType,
      meta: {
        header: "نوع الصيانة",
      },
    },
    {
      id: "center",
      accessorKey: "center",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="المركز" />
      ),
      cell: ({ row }) => row.original.center,
      meta: {
        header: "المركز",
      },
    },
    {
      id: "employee",
      accessorKey: "employee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الموظف" />
      ),
      cell: ({ row }) => row.original.employee,
      meta: {
        header: "الموظف",
      },
    },
  ];

  return {
    columns,
  };
};
