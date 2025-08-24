import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";
import { Lead } from "@/main/global/api/restful/userManagmentAPI/CustomerServiceManager/CustomerServiceTypes";
import { useDeleteLead } from "@/main/global/api/restful/userManagmentAPI/CustomerServiceManager/CustomerServiceQuery";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const { mutate: mutate } = useDeleteLead();
  const columns: ColumnDef<Lead>[] = [
    {
      id: "customerName",
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.customerName", {
            defaultValue: "اسم العميل",
          })}
        />
      ),
      cell: ({ row }) => (
        <div className=" flex">{row.original.companyName}</div>
      ),
      meta: {
        header: t("Booking.table.header.customerName", {
          defaultValue: "اسم العميل",
        }),
      },
    },
    {
      id: "mobileNumber",
      accessorKey: "mobileNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.mobileNumber", {
            defaultValue: "رقم الجوال",
          })}
        />
      ),
      cell: ({ row }) => row.original.mobile1,
      meta: {
        header: t("Booking.table.header.mobileNumber", {
          defaultValue: "رقم الجوال",
        }),
      },
    },
    {
      id: "details",
      accessorKey: "reservationNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.reservationNumber", {
            defaultValue: "التفاصيل",
          })}
        />
      ),
      cell: ({ row }) =>
        typeof row.original.notes === "string" &&
        row.original.notes?.slice(0, 20) +
          (row.original.notes?.length > 20 ? "..." : ""),
      meta: {
        header: t("Booking.table.header.reservationNumber", {
          defaultValue: "التفاصيل",
        }),
      },
    },
    {
      id: "date",
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.date", {
            defaultValue: "",
          })}
        />
      ),
      cell: ({ row }) => row.original.addedDate,
      meta: {
        header: t("Booking.table.header.date", {
          defaultValue: "التاريخ",
        }),
      },
    },
    {
      id: "city",
      accessorKey: "city",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.city", { defaultValue: "المدينة" })}
        />
      ),
      cell: ({ row }) => row.original.city,
      meta: {
        header: t("Booking.table.header.city", { defaultValue: "المدينة" }),
      },
    },
    {
      id: "group",
      accessorKey: "group",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.group", {
            defaultValue: "المجموعة",
          })}
        />
      ),
      cell: ({ row }) => row.original.groupName,
      meta: {
        header: t("Booking.table.header.group", {
          defaultValue: "المجموعة",
        }),
      },
    },
    {
      id: "source",
      accessorKey: "source",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.source", {
            defaultValue: "المصدر",
          })}
        />
      ),
      cell: ({ row }) => row.original.sourceName,
      meta: {
        header: t("Booking.table.header.source", {
          defaultValue: "المصدر",
        }),
      },
    },
    {
      id: "customerStatus",
      accessorKey: "customerStatus",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.customerStatus", {
            defaultValue: "حالة الحجز",
          })}
        />
      ),
      cell: ({ row }) => {
        // const randomColors = [
        //   "text-[#FF5733]",
        //   "text-[#33C3FF]",
        //   "text-[#28A745]",
        //   "text-[#FFC107]",
        //   "text-[#6C757D]",
        // ];
        // const randomIndex = Math.floor(Math.random() * randomColors.length);
        // randomColors[randomIndex];
        return (
          <div
            className={` w-[90px] mx-auto text-sm h-[36px] flex items-center justify-center rounded-[6px] border `}
          >
            <Dot width={15} strokeWidth={5}></Dot> {row.original.statusName}
          </div>
        );
      },
      meta: {
        header: t("Booking.table.header.reservationStatus", {
          defaultValue: "حالة الحجز",
        }),
      },
    },
    {
      id: "actions",
      header: t("Booking.table.header.actions", { defaultValue: "الأوامر" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/customer-service/potential-clients/edit/${row.original?.leadId}`}
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
            id={row.original?.leadId}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: t("Booking.table.header.actions", { defaultValue: "الأوامر" }),
      },
    },
  ];

  return {
    columns,
  };
};
