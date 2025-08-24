import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { Banner } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteTypes";
import { useDeleteBanner } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteQuery";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const { mutate: mutate } = useDeleteBanner();
  const columns: ColumnDef<Banner>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Membership.table.header.name", {
            defaultValue: "الاسم",
          })}
        />
      ),
      cell: ({ row }) => row.original.bannerName,
      meta: {
        header: t("Membership.table.header.name", {
          defaultValue: "الاسم",
        }),
      },
    },
    {
      id: "address",
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Membership.table.header.address", {
            defaultValue: "العنوان",
          })}
        />
      ),
      cell: ({ row }) => row.original.title,
      meta: {
        header: t("Membership.table.header.address", {
          defaultValue: "العنوان",
        }),
      },
    },
    {
      id: "addressAr",
      accessorKey: "addressAr",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Membership.table.header.addressAr", {
            defaultValue: "العنوان بالعربي",
          })}
        />
      ),
      cell: ({ row }) => row.original.arabicText,
      meta: {
        header: t("Membership.table.header.addressAr", {
          defaultValue: "العنوان بالعربي",
        }),
      },
    },
    {
      id: "actions",
      header: t("Membership.table.header.actions", { defaultValue: "الأوامر" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/website/main-images/edit/${row.original?.bannerId}`}
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
          <TDeleteDialog
            id={row.original?.bannerId || ""}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: t("Membership.table.header.actions", {
          defaultValue: "الأوامر",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
