import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  console.log(type);
  const columns: ColumnDef<{
    ticketId: number;
    clientName: string;
    phoneNumber: string | null;
    title: string | null;
    typeName: string | null;
    ticketDate: string | null;
    depName: string | null;
    sourcesName: string | null;
    clientType: string;
    ticketStatus: number;
  }>[] = [
    {
      id: "clientName",
      accessorKey: "clientName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اسم العميل" />
      ),
      cell: ({ row }) => row.original.clientName || "-",
    },
    {
      id: "phoneNumber",
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم الجوال" />
      ),
      cell: ({ row }) => row.original.phoneNumber || "-",
    },
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="عنوان التذكرة" />
      ),
      cell: ({ row }) => row.original.title || "-",
    },
    {
      id: "typeName",
      accessorKey: "typeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="نوع التذكرة" />
      ),
      cell: ({ row }) => row.original.typeName || "-",
    },
    {
      id: "ticketDate",
      accessorKey: "ticketDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="التاريخ" />
      ),
      cell: ({ row }) =>
        row.original.ticketDate
          ? new Date(row.original.ticketDate).toLocaleDateString("ar-EG")
          : "-",
    },
    {
      id: "depName",
      accessorKey: "depName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="القسم" />
      ),
      cell: ({ row }) => row.original.depName || "-",
    },
    {
      id: "sourcesName",
      accessorKey: "sourcesName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="المصدر" />
      ),
      cell: ({ row }) => row.original.sourcesName || "-",
    },
    {
      id: "ticketStatus",
      accessorKey: "ticketStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الحالة" />
      ),
      cell: ({ row }) => {
        const statusMap: Record<number, string> = {
          0: "جديد",
          1: "قيد العمل",
          2: "مغلقة",
        };
        return statusMap[row.original.ticketStatus] || "-";
      },
    },
    {
      id: "actions",
      header: "الأوامر",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <Link
            to={`/customer-service/tickets/edit/${row.original.ticketId}`}
            className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md"
          >
            <Button
              type="button"
              size="sm"
              className="h-8 lg:flex shadow-xl bg-transparent hover:opacity-70"
            >
              <BenEditIcon className="h-4 w-4 text-yellow-700" />
            </Button>
          </Link>
          <TDeleteDialog
            id={row.original.ticketId}
            // mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
    },
  ];

  return {
    columns,
  };
};
