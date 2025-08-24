import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { Limousine } from "@/main/global/api/restful/userManagmentAPI/LimousineManager/LimousineTypes";
import { useDeleteLimousines } from "@/main/global/api/restful/userManagmentAPI/LimousineManager/LimousineQuery";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const { mutate: mutate } = useDeleteLimousines();
  const columns: ColumnDef<Limousine>[] = [
    {
      id: "brand",
      accessorKey: "brand",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="!text-start justify-start"
          title={"ماركة السيارة"}
        />
      ),
      cell: ({ row }) => (
        <div className=" justify-start text-start mx-3">
          {row.original.brandName}
        </div>
      ),
      meta: {
        header: "ماركة السيارة",
      },
    },
    {
      id: "year",
      accessorKey: "year",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"فئة السيارة"} />
      ),
      cell: ({ row }) => row.original.year,
      meta: {
        header: "فئة السيارة",
      },
    },
    {
      id: "model",
      accessorKey: "model",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"موديل السيارة"} />
      ),
      cell: ({ row }) => row.original.modelName,
      meta: {
        header: "موديل السيارة",
      },
    },

    {
      id: "actions",
      header: t("cars.table.header.actions"),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/settings/lemozen/add-lemozen/edit/${row.original?.id}`}
            className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md"
          >
            <Button
              type="button"
              size="sm"
              className={cn(
                "h-8 lg:flex  shadow-xl  bg-transparent hover:opacity-70 w-full sm:w-fit"
              )}
            >
              <BenEditIcon className="h-4 w-4 text-yellow-700" />
            </Button>{" "}
          </Link>

          <TDeleteDialog id={row.original?.id} mutate={mutate} isAllow={true} />
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
