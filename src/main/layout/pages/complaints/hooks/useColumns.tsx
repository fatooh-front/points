import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { useDeleteBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
import { Dot } from "lucide-react";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const { mutate: mutate } = useDeleteBranches();
  const columns: ColumnDef<{
    complaintStatus: string;
    orderNumber: string;
    carCode: string;
    carName: string;
    complaintDate: string;
    complaintReason: string;
    mobileNumber: string;
    contractNumber: string;
    customerName: string;
  }>[] = [
    {
      id: "customerName",
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Complaints.table.header.customerName", {
            defaultValue: "اسم العميل",
          })}
        />
      ),
      cell: ({ row }) => row.original.customerName,
      meta: {
        header: t("Complaints.table.header.customerName", {
          defaultValue: "اسم العميل",
        }),
      },
    },
    {
      id: "contractNumber",
      accessorKey: "contractNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Complaints.table.header.contractNumber", {
            defaultValue: "رقم العقد",
          })}
        />
      ),
      cell: ({ row }) => row.original.contractNumber,
      meta: {
        header: t("Complaints.table.header.contractNumber", {
          defaultValue: "رقم العقد",
        }),
      },
    },
    {
      id: "mobileNumber",
      accessorKey: "mobileNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Complaints.table.header.mobileNumber", {
            defaultValue: "الجوال",
          })}
        />
      ),
      cell: ({ row }) => row.original.mobileNumber,
      meta: {
        header: t("Complaints.table.header.mobileNumber", {
          defaultValue: "الجوال",
        }),
      },
    },
    {
      id: "complaintReason",
      accessorKey: "complaintReason",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Complaints.table.header.complaintReason", {
            defaultValue: "سبب الشكوى",
          })}
        />
      ),
      cell: ({ row }) => row.original.complaintReason,
      meta: {
        header: t("Complaints.table.header.complaintReason", {
          defaultValue: "سبب الشكوى",
        }),
      },
    },
    {
      id: "complaintDate",
      accessorKey: "complaintDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Complaints.table.header.complaintDate", {
            defaultValue: "تاريخ الشكوى",
          })}
        />
      ),
      cell: ({ row }) => row.original.complaintDate,
      meta: {
        header: t("Complaints.table.header.complaintDate", {
          defaultValue: "تاريخ الشكوى",
        }),
      },
    },
    {
      id: "carName",
      accessorKey: "carName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Complaints.table.header.carName", {
            defaultValue: "اسم السيارة",
          })}
        />
      ),
      cell: ({ row }) => row.original.carName,
      meta: {
        header: t("Complaints.table.header.carName", {
          defaultValue: "اسم السيارة",
        }),
      },
    },
    {
      id: "carCode",
      accessorKey: "carCode",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Complaints.table.header.carCode", {
            defaultValue: "كود السيارة",
          })}
        />
      ),
      cell: ({ row }) => row.original.carCode,
      meta: {
        header: t("Complaints.table.header.carCode", {
          defaultValue: "كود السيارة",
        }),
      },
    },
    {
      id: "complaintStatus",
      accessorKey: "complaintStatus",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Complaints.table.header.complaintStatus", {
            defaultValue: "حالة الشكوى",
          })}
        />
      ),
      cell: ({ row }) => (
        <div
          className={`w-[90px] mx-auto text-sm h-[36px] flex items-center justify-center rounded-[6px] border ${
            row.original.complaintStatus === "قيد العمل"
              ? "text-[#F2AE31]"
              : row.original.complaintStatus === "مغلقة"
              ? "text-[#E52B2E]"
              : row.original.complaintStatus === "جديدة"
              ? "text-[#7AAA81]"
              : ""
          }`}
        >
          <Dot width={15} strokeWidth={5} /> {row.original.complaintStatus}
        </div>
      ),
      meta: {
        header: t("Complaints.table.header.complaintStatus", {
          defaultValue: "حالة الشكوى",
        }),
      },
    },
    {
      id: "orderNumber",
      accessorKey: "orderNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Complaints.table.header.orderNumber", {
            defaultValue: "الأوامر",
          })}
        />
      ),
      cell: ({ row }) => row.original.orderNumber,
      meta: {
        header: t("Complaints.table.header.orderNumber", {
          defaultValue: "الأوامر",
        }),
      },
    },
    {
      id: "actions",
      header: t("Complaints.table.header.actions", { defaultValue: "الأوامر" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/complaints/edit/${row.original?.orderNumber}`}
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
            id={row.original?.orderNumber}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: t("Complaints.table.header.actions", {
          defaultValue: "الأوامر",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
