import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { UnitFormDialog } from "../blocks/dialogs/UnitFormDialog";
import { useDeleteBrands } from "@/main/global/api/restful/userManagmentAPI/BrandManager/BrandQuery";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  console.log(type);
  const { mutate: mutate } = useDeleteBrands();
  const columns: ColumnDef<{
    centerName: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    id: string;
  }>[] = [
    {
      id: "centerName",
      accessorKey: "centerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اسم المركز" />
      ),
      cell: ({ row }) => row.original.centerName,
      meta: { header: "اسم المركز" },
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
      id: "whatsapp",
      accessorKey: "whatsapp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الواتس اب" />
      ),
      cell: ({ row }) => row.original.whatsapp,
      meta: { header: "الواتس اب" },
    },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="البريد الإلكتروني" />
      ),
      cell: ({ row }) => row.original.email,
      meta: { header: "البريد الإلكتروني" },
    },
    {
      id: "address",
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="العنوان" />
      ),
      cell: ({ row }) => row.original.address,
      meta: { header: "العنوان" },
    },
    {
      id: "actions",
      accessorKey: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="الأوامر" />
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <div className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md">
            <UnitFormDialog type={"edit"} btn unit={row.original} />{" "}
          </div>

          <TDeleteDialog id={row.original?.id} mutate={mutate} isAllow={true} />
        </div>
      ),
      meta: { header: "الأوامر" },
    },
  ];

  return { columns };
};
