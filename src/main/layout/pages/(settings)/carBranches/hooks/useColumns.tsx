import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { GetBranche } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesTypes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { useDeleteBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const { mutate: mutate } = useDeleteBranches();
  const columns: ColumnDef<GetBranche>[] = [
    {
      id: "englishName",
      accessorKey: "englishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="!text-start justify-start"
          title={t("CarBranch.table.header.englishName")}
        />
      ),
      cell: ({ row }) => (
        <div className=" justify-start text-start mx-3">
          {row.original.branchName}
        </div>
      ),
      meta: {
        header: t("CarBranch.table.header.englishName"),
      },
    },
    {
      id: "arabicName",
      accessorKey: "arabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("CarBranch.table.header.arabicName")}
        />
      ),
      cell: ({ row }) => row.original.branchArName,
      meta: {
        header: t("CarBranch.table.header.arabicName"),
      },
    },
    {
      id: "arabicName",
      accessorKey: "arabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("CarBranch.table.header.phone1")}
        />
      ),
      cell: ({ row }) => row.original.phone1,
      meta: {
        header: t("CarBranch.table.header.phone1"),
      },
    },
    {
      id: "mobile",
      accessorKey: "mobile",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("CarBranch.table.header.phone2")}
        />
      ),
      cell: ({ row }) => row.original.mobile,
      meta: {
        header: t("CarBranch.table.header.phone2"),
      },
    },
    {
      id: "arabicName",
      accessorKey: "arabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("CarBranch.table.header.email")}
        />
      ),
      cell: ({ row }) => row.original.email,
      meta: {
        header: t("CarBranch.table.header.email"),
      },
    },

    {
      id: "actions",
      header: t("cars.table.header.actions"),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/settings/branches/edit/${row.original?.branchId}`}
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

          <TDeleteDialog
            id={row.original?.branchId || ""}
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
