import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { UnitFormDialog } from "../blocks/dialogs/UnitFormDialog";
import { useDeletecarsYears } from "@/main/global/api/restful/userManagmentAPI/carsYearManager/carsYearsQuery";
import { GetcarsYears } from "@/main/global/api/restful/userManagmentAPI/carsYearManager/carsYearsTypes";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("carsYear");
  console.log(type);
  const { mutate: mutate } = useDeletecarsYears();
  const columns: ColumnDef<GetcarsYears>[] = [
    {
      id: "englishName",
      accessorKey: "englishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="!text-start justify-start"
          title={t("carsYear.table.header.englishName")}
        />
      ),
      cell: ({ row }) => (
        <div className=" justify-start text-start mx-3">
          {row.original.year}
        </div>
      ),
      meta: {
        header: t("carsYear.table.header.englishName"),
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
            id={row.original?.yearId || ""}
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
