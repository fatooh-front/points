import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { UnitFormDialog } from "../blocks/dialogs/UnitFormDialog";
import { Source } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsTypes";
import { useDeleteSource } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsQuery";

export const useColumns = () => {
  const { mutate: mutate } = useDeleteSource();
  const columns: ColumnDef<Source>[] = [
    {
      id: "englishName",
      accessorKey: "englishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="!text-start justify-start"
          title="اسم المصدر "
        />
      ),
      cell: ({ row }) => (
        <div className=" justify-start text-start mx-3">
          {row.original.sourceName}
        </div>
      ),
      meta: {
        header: "اسم المصدر ",
      },
    },
    {
      id: "arabicName",
      accessorKey: "arabicName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="اسم المصدر بالعربي" />
      ),
      cell: ({ row }) => row.original.arabicName,
      meta: {
        header: "اسم المصدر بالعربي",
      },
    },

    {
      id: "actions",
      header: "الأوامر",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <div className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md">
            <UnitFormDialog type={"edit"} btn unit={row.original} />{" "}
          </div>

          <TDeleteDialog
            id={row.original?.sourceId || ""}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: "الأوامر",
      },
    },
  ];

  return {
    columns,
  };
};
