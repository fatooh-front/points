import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { Membership } from "@/main/global/api/restful/userManagmentAPI/membershipManager/membershipTypes";
import { useDeleteMemberships } from "@/main/global/api/restful/userManagmentAPI/membershipManager/membershipQuery";
import Image from "@/components/ui/Image";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);

  const { mutate: mutate } = useDeleteMemberships();
  const columns: ColumnDef<Membership>[] = [
    {
      id: "membershipName",
      accessorKey: "membershipName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Membership.table.header.membershipName", {
            defaultValue: "اسم العضوية",
          })}
        />
      ),
      cell: ({ row }) => row.original.arabicName,
      meta: {
        header: t("Membership.table.header.membershipName", {
          defaultValue: "اسم العضوية",
        }),
      },
    },
    {
      id: "imgeCard",
      accessorKey: "imgeCard",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Membership.table.header.imgeCard", {
            defaultValue: "صورة البطاقة",
          })}
        />
      ),
      cell: ({ row }) => (
        <div className=" w-full flex justify-center">
          <Image
            src={
              row.original.icon.startsWith("http")
                ? `${row.original.icon}`
                : `${import.meta.env.VITE_FILE_ROOT}/${row.original.icon}`
            }
            alt={row.original.arabicName}
            className="w-24 relative  object-cover rounded "
          />
        </div>
      ),
      meta: {
        header: t("Membership.table.header.imgeCard", {
          defaultValue: "صورة البطاقة",
        }),
      },
    },
    {
      id: "membershipPoint",
      accessorKey: "membershipPoint",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Membership.table.header.membershipPoint", {
            defaultValue: "نقاط العضوية",
          })}
        />
      ),
      cell: ({ row }) => (
        <div>
          {" "}
          من {row.original.startPoints} إلى {row.original.endPoints} ر.س
        </div>
      ),
      meta: {
        header: t("Membership.table.header.membershipPoint", {
          defaultValue: "نقاط العضوية",
        }),
      },
    },
    {
      id: "actions",
      header: t("Membership.table.header.actions", { defaultValue: "الأوامر" }),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/membership/edit/${row.original?.memberId}`}
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
            id={row.original?.memberId}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: t("Membership.table.header.actions", {
          defaultValue: "الأوامر",
        }),
      },
    },
  ];

  return {
    columns,
  };
};
