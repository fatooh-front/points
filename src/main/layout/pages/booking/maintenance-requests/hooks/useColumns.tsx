import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { useDeleteLimousines } from "@/main/global/api/restful/userManagmentAPI/LimousineManager/LimousineQuery";
import { MaintenanceRequest } from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingTypes";
import { format } from "date-fns";

export const useColumns = () => {
  const { t } = useTranslation("CarBranch");
  const { mutate } = useDeleteLimousines();

  const columns: ColumnDef<MaintenanceRequest>[] = [
    {
      id: "carName",
      accessorKey: "carName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"اسم السيارة"} />
      ),
      cell: ({ row }) => row.getValue("carName"),
    },
    {
      id: "clientPhone",
      accessorKey: "clientPhone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"الهاتف"} />
      ),
      cell: ({ row }) => row.getValue("clientPhone"),
    },
    {
      id: "clientName",
      accessorKey: "clientName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"اسم العميل"} />
      ),
      cell: ({ row }) => row.getValue("clientName"),
    },
    {
      id: "rqDate",
      accessorKey: "rqDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="تاريخ الطلب" />
      ),
      cell: ({ row }) => format(new Date(row.original.rqDate), "yyyy-MM-dd"),
      meta: { header: "Request Date" },
    },
    {
      id: "reqStatus",
      accessorKey: "reqStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="حالة الطلب" />
      ),
      cell: ({ row }) => (
        <span>
          {row.original.reqStatus === 1 && "قيد الانتظار"}
          {row.original.reqStatus === 2 && "مؤكد"}
          {row.original.reqStatus === 4 && "رفض"}
          {row.original.reqStatus === 3 && "تم الانتهاء"}
        </span>
      ),
      meta: { header: "Request Status" },
    },
    {
      id: "reservationId",
      accessorKey: "reservationId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="رقم العقد" />
      ),
      cell: ({ row }) => row.original.reservationId,
      meta: { header: "Reservation ID" },
    },
    {
      id: "reqComments",
      accessorKey: "reqComments",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="تفاصيل الطلب" />
      ),
      cell: ({ row }) => row.original.reqComments,
      meta: { header: "Request Comments" },
    },
    {
      id: "finishDate",
      accessorKey: "finishDate",
      /*************  ✨ Windsurf Command ⭐  *************/
      /**
       * Renders a header for the column with the title "تاريخ الانتهاء" (Finish Date).
       * Utilizes the DataTableColumnHeader component to display the column's header.
       * @param {Object} column - The column object for which the header is rendered.
       */

      /*******  25e519b8-4380-4bac-b17d-d80e30682aea  *******/ header: ({
        column,
      }) => <DataTableColumnHeader column={column} title="تاريخ الانتهاء" />,
      cell: ({ row }) =>
        row.original.finishDate
          ? format(new Date(row.original.finishDate), "yyyy-MM-dd")
          : "—",
      meta: { header: "Finish Date" },
    },
    {
      id: "finishComments",
      accessorKey: "finishComments",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="تفاصيل الانتهاء" />
      ),
      cell: ({ row }) => row.original.finishComments || "—",
      meta: { header: "Finish Comments" },
    },

    {
      id: "actions",
      header: "الأوامر",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/booking/maintenance-requests/edit/${row.original.reqId}`}
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
            id={row.original.reqId}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: { header: t("cars.table.header.actions") },
    },
  ];

  return { columns };
};
