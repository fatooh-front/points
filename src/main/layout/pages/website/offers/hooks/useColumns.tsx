import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { Offer } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteTypes";
import { format } from "date-fns";
import { useDeleteOffer } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteQuery";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const { mutate: mutate } = useDeleteOffer();
  const columns: ColumnDef<Offer>[] = [
    {
      id: "offerName",
      accessorKey: "offerName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Offers.table.header.offerName", {
            defaultValue: "اسم العرض",
          })}
        />
      ),
      cell: ({ row }) => row.original.offerName,
      meta: {
        header: t("Offers.table.header.offerName", {
          defaultValue: "اسم العرض",
        }),
      },
    },
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Offers.table.header.title", {
            defaultValue: "العنوان",
          })}
        />
      ),
      cell: ({ row }) => row.original.title,
      meta: {
        header: t("Offers.table.header.title", {
          defaultValue: "العنوان",
        }),
      },
    },
    {
      id: "titleAr",
      accessorKey: "titleAr",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Offers.table.header.titleAr", {
            defaultValue: "العنوان بالعربي",
          })}
        />
      ),
      cell: ({ row }) => row.original.titleArabic,
      meta: {
        header: t("Offers.table.header.titleAr", {
          defaultValue: "العنوان بالعربي",
        }),
      },
    },
    {
      id: "startDate",
      accessorKey: "startDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Offers.table.header.startDate", {
            defaultValue: "تاريخ البداية",
          })}
        />
      ),
      cell: ({ row }) =>
        format(new Date(row.original.startDate + ".000Z"), "yyyy-MM-dd"),
      meta: {
        header: t("Offers.table.header.startDate", {
          defaultValue: "تاريخ البداية",
        }),
      },
    },
    {
      id: "endDate",
      accessorKey: "endDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Offers.table.header.endDate", {
            defaultValue: "تاريخ النهاية",
          })}
        />
      ),
      cell: ({ row }) =>
        format(new Date(row.original.endDate + ".000Z"), "yyyy-MM-dd"),
      meta: {
        header: t("Offers.table.header.endDate", {
          defaultValue: "تاريخ النهاية",
        }),
      },
    },
    {
      id: "actions",
      header: t("Offers.table.header.actions", { defaultValue: "الأوامر" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/website/offers/edit/${row.original?.offerId || ""}`}
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
            id={row.original?.offerId || ""}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: t("Offers.table.header.actions", {
          defaultValue: "الأوامر",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
