import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { UnitFormDialog } from "../blocks/dialogs/UnitFormDialog";
import { useDeleteEngines } from "@/main/global/api/restful/userManagmentAPI/EngineManager/EngineQuery";
import { GetEngine } from "@/main/global/api/restful/userManagmentAPI/EngineManager/EngineTypes";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("carEngines");
  console.log(type);
  const { mutate: mutate } = useDeleteEngines();
  const columns: ColumnDef<GetEngine>[] = [
    {
      id: "englishName",
      accessorKey: "englishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="!text-start justify-start"
          title={t("carEngines.table.header.englishName")}
        />
      ),
      cell: ({ row }) => (
        <div className=" justify-start text-start mx-3">
          {row.original.englishName}
        </div>
      ),
      meta: {
        header: t("carEngines.table.header.englishName"),
      },
    },
    {
      id: "arabicName",
      accessorKey: "arabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("carEngines.table.header.arabicName")}
        />
      ),
      cell: ({ row }) => row.original.arabicName,
      meta: {
        header: t("carEngines.table.header.arabicName"),
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
            id={row.original?.engId || ""}
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
