import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { Camera, CircleX, Eye } from "lucide-react";
import { TOneActionClikeDialog } from "@/main/common/components/TForm/TOneActionClikeDialog";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const columns: ColumnDef<{
    branchId: number;
    customerType: string;
    customerName: string;
    mobileNumber: string;
    ticketTitle: string;
    for: string;
    date: string;
    section: string;
    group: string;
    type: string;
    customerStatus: string;
    stage?: string;
    ticketStatus?: string;
    maintenanceStage?: string;
    maintenanceType?: string;
    maintenanceEndDate?: string;
    maintenanceStartDate?: string;
    ticketDate?: string;
    carNumber?: string;
    ticketNumber?: string;
    serialNumber?: string;
  }>[] = [
    {
      id: "ticketStatus",
      accessorKey: "ticketStatus",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.ticketStatus", {
            defaultValue: "حالة التذكرة",
          })}
        />
      ),
      cell: ({ row }) => row.original.ticketStatus,
      meta: {
        header: t("Booking.table.header.ticketStatus", {
          defaultValue: "حالة التذكرة",
        }),
      },
    },
    {
      id: "stage",
      accessorKey: "stage",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.stage", {
            defaultValue: "المرحلة",
          })}
        />
      ),
      cell: ({ row }) => row.original.stage,
      meta: {
        header: t("Booking.table.header.stage", {
          defaultValue: "المرحلة",
        }),
      },
    },
    {
      id: "maintenanceType",
      accessorKey: "maintenanceType",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.maintenanceType", {
            defaultValue: "نوع الصيانة",
          })}
        />
      ),
      cell: ({ row }) => row.original.maintenanceType,
      meta: {
        header: t("Booking.table.header.maintenanceType", {
          defaultValue: "نوع الصيانة",
        }),
      },
    },
    {
      id: "ticketTitle",
      accessorKey: "ticketTitle",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.ticketTitle", {
            defaultValue: "عنوان التذكرة",
          })}
        />
      ),
      cell: ({ row }) => row.original.ticketTitle,
      meta: {
        header: t("Booking.table.header.ticketTitle", {
          defaultValue: "عنوان التذكرة",
        }),
      },
    },
    {
      id: "maintenanceEndDate",
      accessorKey: "maintenanceEndDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.maintenanceEndDate", {
            defaultValue: "تاريخ نهاية الصيانة",
          })}
        />
      ),
      cell: ({ row }) => row.original.maintenanceEndDate,
      meta: {
        header: t("Booking.table.header.maintenanceEndDate", {
          defaultValue: "تاريخ نهاية الصيانة",
        }),
      },
    },
    {
      id: "maintenanceStartDate",
      accessorKey: "maintenanceStartDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.maintenanceStartDate", {
            defaultValue: "تاريخ بدأ الصيانة",
          })}
        />
      ),
      cell: ({ row }) => row.original.maintenanceStartDate,
      meta: {
        header: t("Booking.table.header.maintenanceStartDate", {
          defaultValue: "تاريخ بدأ الصيانة",
        }),
      },
    },
    {
      id: "ticketDate",
      accessorKey: "ticketDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.ticketDate", {
            defaultValue: "تاريخ التذكرة",
          })}
        />
      ),
      cell: ({ row }) => row.original.ticketDate,
      meta: {
        header: t("Booking.table.header.ticketDate", {
          defaultValue: "تاريخ التذكرة",
        }),
      },
    },
    {
      id: "carNumber",
      accessorKey: "carNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.carNumber", {
            defaultValue: "رقم السيارة",
          })}
        />
      ),
      cell: ({ row }) => row.original.carNumber,
      meta: {
        header: t("Booking.table.header.carNumber", {
          defaultValue: "رقم السيارة",
        }),
      },
    },
    {
      id: "ticketNumber",
      accessorKey: "ticketNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.ticketNumber", {
            defaultValue: "رقم التذكرة",
          })}
        />
      ),
      cell: ({ row }) => row.original.ticketNumber,
      meta: {
        header: t("Booking.table.header.ticketNumber", {
          defaultValue: "رقم التذكرة",
        }),
      },
    },
    {
      id: "serialNumber",
      accessorKey: "serialNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Booking.table.header.serialNumber", {
            defaultValue: "الرقم التسلسل",
          })}
        />
      ),
      cell: ({ row }) => row.original.serialNumber,
      meta: {
        header: t("Booking.table.header.serialNumber", {
          defaultValue: "الرقم التسلسل",
        }),
      },
    },
    // Existing columns

    {
      id: "actions",
      header: t("Booking.table.header.actions", { defaultValue: "الأوامر" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <TOneActionClikeDialog
            openButton={
              <div className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E52B2E29] flex items-center justify-center rounded-md">
                <Button
                  type="button"
                  size="sm"
                  className={cn(
                    "h-8 lg:flex shadow-xl bg-transparent hover:opacity-70 w-full sm:w-fit"
                  )}
                >
                  <CircleX className="h-4 w-4 text-[#E52B2E]" />
                </Button>
              </div>
            }
            title="تأكيد الإنهاء"
            description=" هل انت متأكد من إنهاء هذه التذكرة؟"
            confirmText="تأكيد الإنهاء"
          ></TOneActionClikeDialog>
          <Link
            to={`/maintenance/glass-tickets/viwe/${row.original?.branchId}`}
            className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#C7B81829] flex items-center justify-center rounded-md"
          >
            <Button
              type="button"
              size="sm"
              className={cn(
                "h-8 lg:flex shadow-xl bg-transparent hover:opacity-70 w-full sm:w-fit"
              )}
            >
              <Eye className="h-4 w-4 text-[#C7B818]" />
            </Button>
          </Link>
          <Link
            to={"/maintenance/glass-tickets/imges"}
            className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#14489729] flex items-center justify-center rounded-md"
          >
            <Button
              type="button"
              size="sm"
              className={cn(
                "h-8 lg:flex shadow-xl bg-transparent hover:opacity-70 w-full sm:w-fit"
              )}
            >
              <Camera className="h-4 w-4 text-[#144897]" />
            </Button>
          </Link>

          <Link
            to={`/maintenance/glass-tickets/edit/${row.original?.branchId}`}
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
  columns.sort((a, b) => {
    const order = [
      "serialNumber",
      "ticketNumber",
      "carNumber",
      "ticketDate",
      "maintenanceStartDate",
      "maintenanceEndDate",
      "ticketTitle",
      "maintenanceType",
      "stage",
      "ticketStatus",
      "actions",
    ];
    const aIdx = order.indexOf(a.id as string);
    const bIdx = order.indexOf(b.id as string);
    if (aIdx === -1 && bIdx === -1) return 0;
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });

  return {
    columns,
  };
};
