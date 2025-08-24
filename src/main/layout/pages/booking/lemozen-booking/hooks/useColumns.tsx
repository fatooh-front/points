import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { Dot } from "lucide-react";
import { LimousineReservation } from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingTypes";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const columns: ColumnDef<LimousineReservation>[] = [
    {
      id: "carName",
      accessorKey: "carName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.carName", {
            defaultValue: "اسم السيارة",
          })}
        />
      ),
      cell: ({ row }) => row.original.carName,
      meta: {
        header: t("Booking.table.header.carName", {
          defaultValue: "اسم السيارة",
        }),
      },
    },
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
      cell: ({ row }) =>
        `${row.original.firstName} ${row.original.lastName || ""}`,
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
      cell: ({ row }) => row.original.mobile,
      meta: {
        header: t("Booking.table.header.mobileNumber", {
          defaultValue: "رقم الجوال",
        }),
      },
    },
    {
      id: "reservationNumber",
      accessorKey: "reservationNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.reservationNumber", {
            defaultValue: "رقم الحجز",
          })}
        />
      ),
      cell: ({ row }) => row.original.resId,
      meta: {
        header: t("Booking.table.header.reservationNumber", {
          defaultValue: "رقم الحجز",
        }),
      },
    },
    {
      id: "type",
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.type", { defaultValue: "النوع" })}
        />
      ),
      cell: ({ row }) => {
        let statusText;

        switch (row.original.resType) {
          case "AIRPORT":
            statusText = "مطار";
            break;
          case "OTHER_PLACES":
            statusText = "اماكن اخري";
            break;
          case "HOURLY":
            statusText = "ساعة";
            break;
          case "DAILY":
            statusText = "يوم كامل";
            break;
          default:
            statusText = row.original.resStatus;
        }

        return statusText;
      },
      meta: {
        header: t("Booking.table.header.type", { defaultValue: "النوع" }),
      },
    },
    {
      id: "paymentType",
      accessorKey: "paymentType",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.paymentType", {
            defaultValue: "نوع الدفع",
          })}
        />
      ),
      cell: ({ row }) => row.original.paymentType,
      meta: {
        header: t("Booking.table.header.paymentType", {
          defaultValue: "نوع الدفع",
        }),
      },
    },
    {
      id: "reservationStatus",
      accessorKey: "reservationStatus",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.reservationStatus", {
            defaultValue: "حالة الحجز",
          })}
        />
      ),

      cell: ({ row }) => {
        let statusText;
        switch (row.original.resStatus) {
          case "PAYMENT_PENDING":
            statusText = "انتظار الدفع";
            break;
          case "NOT_STARTED":
            statusText = "لم يبدأ";
            break;
          case "APPROVED":
            statusText = "مؤكد";
            break;
          case "ACTIVE":
            statusText = "نشط الآن";
            break;
          case "FINISHED":
            statusText = "مكتمل";
            break;
          case "CANCELLED":
            statusText = "ملغي";
            break;
          default:
            statusText = row.original.resStatus;
        }

        // Then use the statusText variable in your JSX
        <div>
          <Dot width={15} strokeWidth={5}></Dot> {statusText}
        </div>;
        return (
          <div
            className={` font-semibold w-[100px] mx-auto text-sm h-[36px] flex items-center justify-center rounded-[6px] border ${
              row.original.resStatus === "PAYMENT_PENDING"
                ? " text-[#9ed603]"
                : row.original.resStatus === "NOT_STARTED"
                ? " text-[#656565]"
                : row.original.resStatus === "FINISHED"
                ? " text-[#656565]"
                : row.original.resStatus === "ACTIVE"
                ? " text-[#601FB4]"
                : row.original.resStatus === "CANCELLED"
                ? " text-[#E52B2E]"
                : row.original.resStatus === "ACTIVE"
                ? " text-[#7AAA81]"
                : ""
            }`}
          >
            <Dot width={15} strokeWidth={5}></Dot> {statusText}
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
      header: t("Booking.table.header.actions", { defaultValue: "إجراءات" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/booking/booking-lemozen/edit/${row.original?.resId}`}
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
        header: t("Booking.table.header.actions", { defaultValue: "إجراءات" }),
      },
    },
  ];

  return {
    columns,
  };
};
