import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const columns: ColumnDef<{
    pageName: string;
    metaTitle: string;
    metaKeywords: string;
    id: string;
  }>[] = [
    {
      id: "pageName",
      accessorKey: "pageName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("SearchEngines.table.header.pageName", {
            defaultValue: "اسم الصفحة",
          })}
        />
      ),
      cell: ({ row }) => row.original.pageName,
      meta: {
        header: t("SearchEngines.table.header.pageName", {
          defaultValue: "اسم الصفحة",
        }),
      },
    },
    {
      id: "metaTitle",
      accessorKey: "metaTitle",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("SearchEngines.table.header.metaTitle", {
            defaultValue: "Meta Title",
          })}
        />
      ),
      cell: ({ row }) => row.original.metaTitle,
      meta: {
        header: t("SearchEngines.table.header.metaTitle", {
          defaultValue: "Meta Title",
        }),
      },
    },
    {
      id: "metaKeywords",
      accessorKey: "metaKeywords",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("SearchEngines.table.header.metaKeywords", {
            defaultValue: "Meta Keywords",
          })}
        />
      ),
      cell: ({ row }) => row.original.metaKeywords,
      meta: {
        header: t("SearchEngines.table.header.metaKeywords", {
          defaultValue: "Meta Keywords",
        }),
      },
    },
    {
      id: "actions",
      header: t("SearchEngines.table.header.actions", {
        defaultValue: "الأوامر",
      }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/website/search-engines/edit/${row.original?.pageName}`}
            className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md"
          >
            <Button
              type="button"
              size="sm"
              className={cn(
                "h-8 lg:flex shadow-xl bg-transparent hover:opacity-70 w-full sm:w-fit"
              )}
            >
              <BenEditIcon className="h-4 w-4 text-yellow-700" />
            </Button>
          </Link>
        </div>
      ),
      meta: {
        header: t("SearchEngines.table.header.actions", {
          defaultValue: "الأوامر",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
