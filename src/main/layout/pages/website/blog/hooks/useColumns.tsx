import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { Blog } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteTypes";
import { useDeleteBlog } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteQuery";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const { mutate: mutate } = useDeleteBlog();
  const columns: ColumnDef<Blog>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Blog.table.header.title", { defaultValue: "العنوان" })}
        />
      ),
      cell: ({ row }) => row.original.title,
      meta: {
        header: t("Blog.table.header.title", { defaultValue: "العنوان" }),
      },
    },
    {
      id: "details",
      accessorKey: "details",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Blog.table.header.details", { defaultValue: "التفاصيل" })}
        />
      ),
      cell: ({ row }) => row.original.shortText,
      meta: {
        header: t("Blog.table.header.details", { defaultValue: "التفاصيل" }),
      },
    },
    {
      id: "author",
      accessorKey: "author",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Blog.table.header.author", { defaultValue: "الكاتب" })}
        />
      ),
      cell: ({ row }) => row.original.author,
      meta: {
        header: t("Blog.table.header.author", { defaultValue: "الكاتب" }),
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Blog.table.header.createdAt", {
            defaultValue: "تاريخ الإنشاء",
          })}
        />
      ),
      cell: ({ row }) => row.original.createdAt,
      meta: {
        header: t("Blog.table.header.createdAt", {
          defaultValue: "تاريخ الإنشاء",
        }),
      },
    },
    {
      id: "publishedAt",
      accessorKey: "publishedAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Blog.table.header.publishedAt", {
            defaultValue: "تاريخ النشر",
          })}
        />
      ),
      cell: ({ row }) => row.original.publishedAt,
      meta: {
        header: t("Blog.table.header.publishedAt", {
          defaultValue: "تاريخ النشر",
        }),
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Blog.table.header.status", { defaultValue: "الحالة" })}
        />
      ),
      cell: ({ row }) => (row.original.status === 0 ? "غير منشورة" : "منشورة"),
      meta: {
        header: t("Blog.table.header.status", { defaultValue: "الحالة" }),
      },
    },
    {
      id: "actions",
      header: t("Blog.table.header.actions", { defaultValue: "الأوامر" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/website/blog/edit/${row.original?.blogId}`}
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
            id={row.original?.blogId || ""}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: t("Blog.table.header.actions", { defaultValue: "الأوامر" }),
      },
    },
  ];

  return {
    columns,
  };
};
