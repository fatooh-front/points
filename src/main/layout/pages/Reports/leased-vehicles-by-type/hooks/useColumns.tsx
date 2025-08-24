import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { useDeleteBrands } from "@/main/global/api/restful/userManagmentAPI/BrandManager/BrandQuery";

export const useColumns = () => {
  const { mutate: mutate } = useDeleteBrands();
  const columns: ColumnDef<{
    employeeName: string;
    phone: string;
    id: string;
  }>[] = [
    {
      id: "employeeName",
      accessorKey: "employeeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اسم الموظف" />
      ),
      cell: ({ row }) => row.original.employeeName,
      meta: { header: "اسم الموظف" },
    },
    {
      id: "phone",
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الهاتف" />
      ),
      cell: ({ row }) => row.original.phone,
      meta: { header: "الهاتف" },
    },
    {
      id: "actions",
      accessorKey: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الأوامر" />
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <TDeleteDialog id={row.original?.id} mutate={mutate} isAllow={true} />
        </div>
      ),
      meta: { header: "الأوامر" },
    },
  ];

  return { columns };
};
