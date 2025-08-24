import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { Dot, MapPin, Store } from "lucide-react";
import { Reservation } from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingTypes";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const statusOptions = [
    { value: 1, label: "قيد الانتظار" },
    { value: 2, label: "مؤكد" },
    { value: 3, label: "نشط الآن" },
    { value: 4, label: "مكتمل" },
    { value: 5, label: "ملغي" },
  ];

  // الحالات المسموح بيها بناءً على الحالة الحالية من السيرفر

  const columns: ColumnDef<Reservation>[] = [
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
      cell: ({ row }) => row.original.clientName,
      meta: {
        header: t("Booking.table.header.customerName", {
          defaultValue: "اسم العميل",
        }),
      },
    },
    {
      id: "addedDate",
      accessorKey: "addedDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.addedDate", {
            defaultValue: "تاريخ الحجز",
          })}
        />
      ),
      cell: ({ row }) => {
        console.log(row.original);
        return row.original.startDate;
      },
      meta: {
        header: t("Booking.table.header.customerName", {
          defaultValue: "تاريخ الحجز",
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
      cell: ({ row }) => row.original.clientMobile,
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
      cell: ({ row }) => row.original.reservationId,
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
          title={t("Booking.table.header.type", {
            defaultValue: "نوع الاستلام",
          })}
        />
      ),
      cell: ({ row }) => {
        const type = row.original.deliveryLongitude;
        console.log(type, "fdgdfgdfgfdgdfg");

        return type === 0 || !type ? (
          <div className=" flex w-[200px] text-primary justify-center gap-2">
            {" "}
            الاستلام من الفرع
            <Store />
          </div>
        ) : (
          <div className=" flex w-[200px] text-[#F2AE31] justify-center gap-2">
            {" "}
            الاستلام من المنزل
            <MapPin />
          </div>
        );
      },
      meta: {
        header: t("Booking.table.header.type", { defaultValue: "النوع" }),
      },
    },
    // {
    //   id: "type",
    //   accessorKey: "type",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title={t("Booking.table.header.type", {
    //         defaultValue: "نوع التسليم",
    //       })}
    //     />
    //   ),
    //   cell: ({ row }) => {
    //     const type = row.original.pickupLatitude;
    //     return type === 0 || !type ? (
    //       <div className=" flex w-[200px] text-primary justify-center gap-2">
    //         {" "}
    //         التسليم من الفرع <Store />
    //       </div>
    //     ) : (
    //       <div className=" flex w-[200px] text-[#F2AE31] justify-center gap-2">
    //         {" "}
    //         التسليم من المنزل
    //         <MapPin />
    //       </div>
    //     );
    //   },
    //   meta: {
    //     header: t("Booking.table.header.type", { defaultValue: "النوع" }),
    //   },
    // },

    {
      id: "paymentType",
      accessorKey: "paymentType",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.paymentType", {
            defaultValue: "صافي مبلغ الحجز",
          })}
        />
      ),
      cell: ({ row }) => row.original.paymentMethod,
      meta: {
        header: t("Booking.table.header.paymentType", {
          defaultValue: "صافي مبلغ الحجز",
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
      cell: ({ row }) => (
        <div
          className={` w-[90px] mx-auto text-sm h-[36px] flex items-center justify-center rounded-[6px] border ${
            row.original.reservationStatus === 1
              ? " text-[#656565]"
              : row.original.reservationStatus === 2
              ? " text-[#601FB4]"
              : row.original.reservationStatus === 3
              ? " text-[#7AAA81]"
              : row.original.reservationStatus === 4
              ? " text-[rgb(100,179,182)]"
              : row.original.reservationStatus === 5
              ? " text-[#E52B2E]"
              : ""
          }`}
        >
          <Dot width={15} strokeWidth={5}></Dot>{" "}
          {
            statusOptions.find(
              (opt) => opt.value === row.original.reservationStatus
            )?.label
          }
        </div>
      ),
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
            to={`/booking/booking/edit/${row.original?.reservationId}`}
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
        header: t("Booking.table.header.actions", { defaultValue: "الأوامر" }),
      },
    },
  ];

  return {
    columns,
  };
};
