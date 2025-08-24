import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { useDeleteBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
import { UnitPointsDialog } from "../blocks/dialogs/points-dialogs/UnitPointsDialog";
import { Bell } from "lucide-react";
import { UnitpPaymentLinkFormDialog } from "./../blocks/dialogs/paymentLink-dialogs/UnitpPaymentLinkFormDialog";
import { UnitNotificationsFormDialog } from "../blocks/dialogs/send-notifications-dialogs/UnitNotificationsFormDialog";
import { Client } from "@/main/global/api/restful/userManagmentAPI/clientsManager/clientsTypes";

export const useColumns = ({ type = "" }: { type: string | undefined }) => {
  const { t } = useTranslation("CarBranch");
  console.log(type);
  const { mutate: mutate } = useDeleteBranches();
  const columns: ColumnDef<Client>[] = [
    {
      id: "customerName",
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="!text-start justify-start"
          title={"اسم العميل"}
        />
      ),
      cell: ({ row }) => (
        <div className=" justify-start text-start mx-3">
          {row.original.firstName + " " + row.original.lastName}
        </div>
      ),
      meta: {
        header: "اسم العميل",
      },
    },
    {
      id: "mobileNumber",
      accessorKey: "mobileNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"الجوال"} />
      ),
      cell: ({ row }) => row.original.mobile,
      meta: {
        header: "الجوال",
      },
    },
    {
      id: "membership",
      accessorKey: "membership",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"العضوية"} />
      ),
      cell: ({ row }) => row.original.membershipName,
      meta: {
        header: "العضوية",
      },
    },

    {
      id: "idNumber",
      accessorKey: "idNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"رقم الهوية"} />
      ),
      cell: ({ row }) => row.original.nationalId,
      meta: {
        header: "رقم الهوية",
      },
    },

    {
      id: "paymentLink",
      accessorKey: "paymentLink",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"رابط الدفع"} />
      ),
      cell: ({}) => (
        <UnitpPaymentLinkFormDialog
          type="add"
          btn={true}
          passedButton={
            <div className=" border-[#0B7FAF] hover:opacity-70 border rounded-md w-[105px] mx-auto justify-center h-[40px] text-[#0B7FAF] text-lg font-normal flex items-center ">
              رابط الدفع{" "}
            </div>
          }
        />
      ),
      meta: {
        header: "رابط الدفع",
      },
    },
    {
      id: "points",
      accessorKey: "points",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"النقاط"} />
      ),
      cell: ({ row }) => (
        <UnitPointsDialog
          type="add"
          btn={true}
          unit={row.original}
          passedButton={
            <div className=" border-[#C9972B] mx-auto  hover:opacity-70 border rounded-md w-[105px]  justify-center h-[40px] text-[#C9972B] text-lg font-normal flex items-center gap-1">
              دفع بنقاط
            </div>
          }
        />
      ),
      meta: {
        header: "النقاط",
      },
    },
    {
      id: "RegistrationDate",
      accessorKey: "RegistrationDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"تاريخ التسجيل"} />
      ),
      cell: ({ row }) => {
        const dateStr = row.original.addedDate;
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toISOString().split("T")[0].replace(/-/g, "/");
      },
      meta: {
        header: "تاريخ التسجيل",
      },
    },
    {
      id: "actions",
      header: t("cars.table.header.actions"),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <UnitNotificationsFormDialog
            type="add"
            passedButton={
              <div className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md">
                <Button
                  type="button"
                  size="sm"
                  className={cn(
                    "h-8 lg:flex  shadow-xl  bg-transparent hover:opacity-70 w-full sm:w-fit"
                  )}
                >
                  <Bell className="h-4 w-4 text-[#7E858E]" />
                </Button>{" "}
              </div>
            }
          ></UnitNotificationsFormDialog>

          <Link
            to={`/client/edit/${row.original?.clientId}`}
            className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md"
          >
            <Button
              type="button"
              size="sm"
              className={cn(
                "h-8 lg:flex  shadow-xl  bg-transparent hover:opacity-70 w-full sm:w-fit"
              )}
            >
              <BenEditIcon className="h-4 w-4 text-yellow-700" />
            </Button>{" "}
          </Link>

          <TDeleteDialog
            id={row.original?.clientId}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      meta: {
        header: t("cars.table.header.actions"),
      },
    },
  ];

  return {
    columns,
  };
};
