import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

// import { useDeleteBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
import { Angry, Frown, Laugh, Smile } from "lucide-react";

export const useColumns = () => {
  const { t } = useTranslation("CarBranch");
  const ratings = [
    { title: "ممتاز", color: "#985EB3", icon: Laugh },
    { title: "جيد جداً", color: "#7AAA81", icon: Laugh },
    { title: "جيد", color: "#CE931A", icon: Smile },
    { title: "سئ", color: "#144897", icon: Frown },

    { title: "سئ جداً", color: "#D51619", icon: Angry },
  ];
  // const { mutate: mutate } = useDeleteBranches();
  const columns: ColumnDef<{
    clientName: string;
    mobilenum: string;
    date: string;
    ratingType: string;
    rat: string;
    rating: string;
    id: string;
  }>[] = [
    {
      id: "clientName",
      accessorKey: "clientName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Branches.table.header.clientName", {
            defaultValue: "اسم العميل",
          })}
        />
      ),
      cell: ({ row }) => row.original.clientName,
      meta: {
        header: t("Branches.table.header.clientName", {
          defaultValue: "اسم العميل",
        }),
      },
    },
    {
      id: "mobilenum",
      accessorKey: "mobilenum",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Branches.table.header.mobilenum", {
            defaultValue: " رقم الجوال",
          })}
        />
      ),
      cell: ({ row }) => row.original.mobilenum,
      meta: {
        header: t("Branches.table.header.mobilenum", {
          defaultValue: " رقم الجوال",
        }),
      },
    },
    {
      id: "date",
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Branches.table.header.date", {
            defaultValue: "التاريخ",
          })}
        />
      ),
      cell: ({ row }) => row.original.date,
      meta: {
        header: t("Branches.table.header.date", {
          defaultValue: " التاريخ ",
        }),
      },
    },
    {
      id: "isActive",
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Branches.table.header.isActive", {
            defaultValue: "حالة التفعيل",
          })}
        />
      ),
      cell: ({ row }) => {
        const rat = ratings.find((rat) => rat.title === row.original.rating);
        return (
          <div
            style={{ color: rat?.color }}
            className={` w-[90px] mx-auto gap-1 text-sm h-[36px] flex items-center justify-center rounded-[6px] border text-[${rat?.color}]`}
          >
            {rat && <rat.icon color={rat?.color} size={16}></rat.icon>}{" "}
            {rat?.title}
          </div>
        );
      },
      meta: {
        header: t("Branches.table.header.isActive", {
          defaultValue: "حالة التفعيل",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
