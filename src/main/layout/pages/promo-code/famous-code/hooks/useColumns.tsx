import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { useDeletePromo } from "@/main/global/api/restful/userManagmentAPI/PromoCodeManager/PromoCodeQuery";
import { Promo } from "@/main/global/api/restful/userManagmentAPI/PromoCodeManager/PromoCodeTypes";
import { Dot } from "lucide-react";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const dateFormat = (date: Date) => {
    // Format date to yyyy/MM/dd
    const formattedDate = date.toLocaleDateString("en-CA").replace(/-/g, "/");

    // Format time to HH:mm
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    //Show date and time
    return (
      <div className=" flex flex-col justify-center items-center">
        <div className=" text-start">{formattedDate}</div>
        <div className=" text-start me-11">{formattedTime}</div>{" "}
      </div>
    );
  };
  const { mutate: mutate } = useDeletePromo();
  const columns: ColumnDef<Promo>[] = [
    {
      id: "codeName",
      accessorKey: "codeName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("PromoCode.table.header.codeName", {
            defaultValue: "اسم الكود",
          })}
        />
      ),
      cell: ({ row }) => row.original.notes,
      meta: {
        header: t("PromoCode.table.header.codeName", {
          defaultValue: "اسم الكود",
        }),
      },
    },
    {
      id: "code",
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("PromoCode.table.header.code", {
            defaultValue: "الكود",
          })}
        />
      ),
      cell: ({ row }) => row.original.promo,
      meta: {
        header: t("PromoCode.table.header.code", {
          defaultValue: "الكود",
        }),
      },
    },
    {
      id: "startDate",
      accessorKey: "startDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("PromoCode.table.header.startDate", {
            defaultValue: "تاريخ البداية",
          })}
        />
      ),
      cell: ({ row }) => dateFormat(new Date(row.original.startDate + ".000Z")),
      meta: {
        header: t("PromoCode.table.header.startDate", {
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
          title={t("PromoCode.table.header.endDate", {
            defaultValue: "تاريخ النهاية",
          })}
        />
      ),
      cell: ({ row }) => dateFormat(new Date(row.original.endDate + ".000Z")),
      meta: {
        header: t("PromoCode.table.header.endDate", {
          defaultValue: "تاريخ النهاية",
        }),
      },
    },
    {
      id: "type",
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("PromoCode.table.header.type", {
            defaultValue: "النوع",
          })}
        />
      ),
      cell: ({ row }) =>
        row.original.promoType ? "قيمة ثابتة" : "قيمة متغيرة",
      meta: {
        header: t("PromoCode.table.header.type", {
          defaultValue: "النوع",
        }),
      },
    },
    {
      id: "value",
      accessorKey: "value",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("PromoCode.table.header.value", {
            defaultValue: "القيمة",
          })}
        />
      ),
      cell: ({ row }) => row.original.promoValue,
      meta: {
        header: t("PromoCode.table.header.value", {
          defaultValue: "القيمة",
        }),
      },
    },

    {
      id: "codeStatus",
      accessorKey: "codeStatus",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("PromoCode.table.header.codeStatus", {
            defaultValue: "حالة الكود",
          })}
        />
      ),
      cell: ({ row }) => (
        <div
          className={` w-[90px] mx-auto text-sm h-[36px] flex items-center justify-center rounded-[6px] border ${
            row.original.promoStatus ? " text-[#7AAA81]" : " text-[#E52B2E]"
          }`}
        >
          <Dot width={15} strokeWidth={5}></Dot>{" "}
          {row.original.promoStatus
            ? t("cars.table.status.active", { defaultValue: "فعال" })
            : t("cars.table.status.inactive", { defaultValue: "غير فعال" })}
        </div>
      ),
      meta: {
        header: t("PromoCode.table.header.codeStatus", {
          defaultValue: "حالة الكود",
        }),
      },
    },

    {
      id: "actions",
      header: t("PromoCode.table.header.actions", { defaultValue: "الأوامر" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/promo-code/famous-codes/edit/${row.original?.promoId}`}
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
            id={row.original?.promoId || ""}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: t("PromoCode.table.header.actions", {
          defaultValue: "الأوامر",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
