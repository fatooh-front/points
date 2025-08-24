import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const columns: ColumnDef<{
    userName: string;
    displayDate: string;
    contentType: string;
    content: string;
    id: string;
  }>[] = [
    {
      id: "userName",
      accessorKey: "userName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("DisplayedContent.table.header.userName", {
            defaultValue: "اسم المستخدم",
          })}
        />
      ),
      cell: ({ row }) => row.original.userName,
      meta: {
        header: t("DisplayedContent.table.header.userName", {
          defaultValue: "اسم المستخدم",
        }),
      },
    },
    {
      id: "displayDate",
      accessorKey: "displayDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("DisplayedContent.table.header.displayDate", {
            defaultValue: "تاريخ العرض",
          })}
        />
      ),
      cell: ({ row }) => row.original.displayDate,
      meta: {
        header: t("DisplayedContent.table.header.displayDate", {
          defaultValue: "تاريخ العرض",
        }),
      },
    },
    {
      id: "contentType",
      accessorKey: "contentType",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("DisplayedContent.table.header.contentType", {
            defaultValue: "نوع المحتوى",
          })}
        />
      ),
      cell: ({ row }) => row.original.contentType,
      meta: {
        header: t("DisplayedContent.table.header.contentType", {
          defaultValue: "نوع المحتوى",
        }),
      },
    },
    {
      id: "content",
      accessorKey: "content",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("DisplayedContent.table.header.content", {
            defaultValue: "المحتوى",
          })}
        />
      ),
      cell: ({ row }) => row.original.content,
      meta: {
        header: t("DisplayedContent.table.header.content", {
          defaultValue: "المحتوى",
        }),
      },
    },
    {
      id: "actions",
      header: t("DisplayedContent.table.header.actions", {
        defaultValue: "الأوامر",
      }),
      cell: () => (
        <div className="flex justify-center items-center gap-2">
          <TDeleteDialog />
        </div>
      ),
      meta: {
        header: t("DisplayedContent.table.header.actions", {
          defaultValue: "الأوامر",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
