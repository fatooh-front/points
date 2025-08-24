import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";

import { useDeleteBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const { mutate: mutate } = useDeleteBranches();
  const columns: ColumnDef<{
    carName: string;
    code: string;
    brand: string;
    model: string;
    type: string;
    year: string;
    engineCapacity: string;
    price: string;
    id: string;
  }>[] = [
    {
      id: "carName",
      accessorKey: "carName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Car.table.header.carName", {
            defaultValue: "اسم السيارة",
          })}
        />
      ),
      cell: ({ row }) => row.original.carName,
      meta: {
        header: t("Car.table.header.carName", {
          defaultValue: "اسم السيارة",
        }),
      },
    },
    {
      id: "code",
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Car.table.header.code", {
            defaultValue: "الكود",
          })}
        />
      ),
      cell: ({ row }) => row.original.code,
      meta: {
        header: t("Car.table.header.code", {
          defaultValue: "الكود",
        }),
      },
    },
    {
      id: "brand",
      accessorKey: "brand",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Car.table.header.brand", {
            defaultValue: "الماركة",
          })}
        />
      ),
      cell: ({ row }) => row.original.brand,
      meta: {
        header: t("Car.table.header.brand", {
          defaultValue: "الماركة",
        }),
      },
    },
    {
      id: "model",
      accessorKey: "model",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Car.table.header.model", {
            defaultValue: "الموديل",
          })}
        />
      ),
      cell: ({ row }) => row.original.model,
      meta: {
        header: t("Car.table.header.model", {
          defaultValue: "الموديل",
        }),
      },
    },
    {
      id: "type",
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Car.table.header.type", {
            defaultValue: "النوع",
          })}
        />
      ),
      cell: ({ row }) => row.original.type,
      meta: {
        header: t("Car.table.header.type", {
          defaultValue: "النوع",
        }),
      },
    },
    {
      id: "year",
      accessorKey: "year",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Car.table.header.year", {
            defaultValue: "سنة الصنع",
          })}
        />
      ),
      cell: ({ row }) => row.original.year,
      meta: {
        header: t("Car.table.header.year", {
          defaultValue: "سنة الصنع",
        }),
      },
    },
    {
      id: "engineCapacity",
      accessorKey: "engineCapacity",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Car.table.header.engineCapacity", {
            defaultValue: "سعة المحرك",
          })}
        />
      ),
      cell: ({ row }) => row.original.engineCapacity,
      meta: {
        header: t("Car.table.header.engineCapacity", {
          defaultValue: "سعة المحرك",
        }),
      },
    },
    {
      id: "price",
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Car.table.header.price", {
            defaultValue: "السعر",
          })}
        />
      ),
      cell: ({ row }) => row.original.price,
      meta: {
        header: t("Car.table.header.price", {
          defaultValue: "السعر",
        }),
      },
    },
    {
      id: "actions",
      header: t("Car.table.header.actions", { defaultValue: "الأوامر" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <TDeleteDialog id={row.original?.id} mutate={mutate} isAllow={true} />
        </div>
      ),
      meta: {
        header: t("Car.table.header.actions", {
          defaultValue: "الأوامر",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
