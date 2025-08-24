import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { Dot } from "lucide-react";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const columns: ColumnDef<{
    contractStatus: string;
    total: string;
    to: string;
    from: string;
    date: string;
    customerServiceEmployee: string;
    branchEmployeeName: string;
    branch: string;
    contractNumber: string;
    customerName: string;
    carName: string;
    paymentStatus: string;
  }>[] = [
    {
      id: "carName",
      accessorKey: "carName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.carName", {
            defaultValue: "اسم السيارة",
          })}
        />
      ),
      cell: ({ row }) => (
        <div className=" justify-start flex-wrap text-start  nnn ">
          {" "}
          {row.original.carName}
        </div>
      ),
      meta: {
        header: t("Contracts.table.header.carName", {
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
          title={t("Contracts.table.header.customerName", {
            defaultValue: "اسم العميل",
          })}
        />
      ),
      cell: ({ row }) => row.original.customerName,
      meta: {
        header: t("Contracts.table.header.customerName", {
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
          title={t("Contracts.table.header.contractNumber", {
            defaultValue: "رقم العقد",
          })}
        />
      ),
      cell: ({ row }) => row.original.contractNumber,
      meta: {
        header: t("Contracts.table.header.contractNumber", {
          defaultValue: "رقم العقد",
        }),
      },
    },
    {
      id: "branch",
      accessorKey: "branch",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.branch", { defaultValue: "الفرع" })}
        />
      ),
      cell: ({ row }) => row.original.branch,
      meta: {
        header: t("Contracts.table.header.branch", { defaultValue: "الفرع" }),
      },
    },
    {
      id: "branchEmployeeName",
      accessorKey: "branchEmployeeName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.branchEmployeeName", {
            defaultValue: "اسم الموظف بالفرع",
          })}
        />
      ),
      cell: ({ row }) => row.original.branchEmployeeName,
      meta: {
        header: t("Contracts.table.header.branchEmployeeName", {
          defaultValue: "اسم الموظف بالفرع",
        }),
      },
    },
    {
      id: "customerServiceEmployee",
      accessorKey: "customerServiceEmployee",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.customerServiceEmployee", {
            defaultValue: "موظف خدمة العملاء",
          })}
        />
      ),
      cell: ({ row }) => row.original.customerServiceEmployee,
      meta: {
        header: t("Contracts.table.header.customerServiceEmployee", {
          defaultValue: "موظف خدمة العملاء",
        }),
      },
    },
    {
      id: "date",
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.date", { defaultValue: "التاريخ" })}
        />
      ),
      cell: ({ row }) => row.original.date,
      meta: {
        header: t("Contracts.table.header.date", { defaultValue: "التاريخ" }),
      },
    },
    {
      id: "from",
      accessorKey: "from",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.from", { defaultValue: "من" })}
        />
      ),
      cell: ({ row }) => row.original.from,
      meta: {
        header: t("Contracts.table.header.from", { defaultValue: "من" }),
      },
    },
    {
      id: "to",
      accessorKey: "to",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.to", { defaultValue: "إلى" })}
        />
      ),
      cell: ({ row }) => row.original.to,
      meta: { header: t("Contracts.table.header.to", { defaultValue: "إلى" }) },
    },
    {
      id: "total",
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.total", {
            defaultValue: "الإجمالي",
          })}
        />
      ),
      cell: ({ row }) => row.original.total,
      meta: {
        header: t("Contracts.table.header.total", { defaultValue: "الإجمالي" }),
      },
    },
    {
      id: "paymentStatus",
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.paymentStatus", {
            defaultValue: "حالة الدفع",
          })}
        />
      ),
      cell: ({ row }) => row.original.paymentStatus,
      meta: {
        header: t("Contracts.table.header.paymentStatus", {
          defaultValue: "حالة الدفع",
        }),
      },
    },
    {
      id: "contractStatus",
      accessorKey: "contractStatus",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Contracts.table.header.contractStatus", {
            defaultValue: "حالة الحجز",
          })}
        />
      ),
      cell: ({ row }) => (
        <div
          className={`w-[90px] mx-auto text-sm h-[36px] flex items-center justify-center rounded-[6px] border ${
            row.original.contractStatus === "مطالبة"
              ? "text-[#F2AE31]"
              : row.original.contractStatus === "مغلق"
              ? "text-[#E52B2E]"
              : row.original.contractStatus === "ساري"
              ? "text-[#7AAA81]"
              : "text-[#E52B2E]"
          }`}
        >
          <Dot width={15} strokeWidth={5} /> {row.original.contractStatus}
        </div>
      ),
      meta: {
        header: t("Contracts.table.header.contractStatus", {
          defaultValue: "حالة الحجز",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
