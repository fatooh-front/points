import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { UnitFormDialog } from "../blocks/dialogs/UnitFormDialog";
import { GetType } from "@/main/global/api/restful/userManagmentAPI/TypeManager/TypeTypes";
import { useDeleteTypes } from "@/main/global/api/restful/userManagmentAPI/TypeManager/TypeQuery";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("Type");
  console.log(type);
  const { mutate: mutate } = useDeleteTypes();
  const columns: ColumnDef<GetType>[] = [
    {
      id: "englishName",
      accessorKey: "englishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="!text-start justify-start"
          title={t("Type.table.header.englishName")}
        />
      ),
      cell: ({ row }) => (
        <div className=" justify-start text-start mx-3">
          {row.original.englishName}
        </div>
      ),
      meta: {
        header: t("Type.table.header.englishName"),
      },
    },
    {
      id: "arabicName",
      accessorKey: "arabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Type.table.header.arabicName")}
        />
      ),
      cell: ({ row }) => row.original.arabicName,
      meta: {
        header: t("Type.table.header.arabicName"),
      },
    },

    {
      id: "actions",
      header: t("cars.table.header.actions"),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <div className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md">
            <UnitFormDialog type={"edit"} btn unit={row.original} />{" "}
          </div>

          <TDeleteDialog
            id={row.original?.typeId || ""}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: t("cars.table.header.actions"),
      },
    },
  ];

  return {
    columns,
  };
};
