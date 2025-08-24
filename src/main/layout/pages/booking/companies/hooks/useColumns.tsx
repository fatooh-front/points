import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { Link } from "react-router-dom";
import { CompanyRequest } from "@/main/global/api/restful/userManagmentAPI/CompanyRequestManager/CompanyRequestTypes";

export const useColumns = () => {
  const statusOptions = [
    { value: 1, label: "قيد الانتظار" },
    { value: 2, label: "مؤكد" },
    { value: 3, label: "مرفوض" },
  ];
  const columns: ColumnDef<CompanyRequest>[] = [
    {
      id: "companyName",
      header: "اسم الشركة",
      cell: ({ row }) => row.original.companyName || "-",
    },
    {
      id: "activity",
      header: "النشاط",
      cell: ({ row }) => row.original.activity || "-",
    },
    {
      id: "city",
      header: "المدينة",
      cell: ({ row }) => row.original.city || "-",
    },
    {
      id: "responsibleName",
      header: "اسم المسؤول",
      cell: ({ row }) => row.original.responsibleName || "-",
    },
    {
      id: "mobile",
      header: "رقم الجوال",
      cell: ({ row }) => row.original.mobile || "-",
    },
    {
      id: "requestStatus",
      header: "حالة الطلب",
      cell: ({ row }) =>
        statusOptions.find(
          (option) => option.value === row.original.requestStatus
        )?.label || "-",
    },

    {
      id: "carsNumber",
      header: "عدد السيارات",
      cell: ({ row }) => row.original.carsNumber,
    },
    {
      id: "months",
      header: "عدد الأشهر",
      cell: ({ row }) => row.original.months,
    },
    {
      id: "addedDate",
      header: "تاريخ الإضافة",
      cell: ({ row }) => new Date(row.original.addedDate).toLocaleDateString(),
    },
    {
      id: "addedDate",
      header: "الأوامر",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/booking/companies/edit/${row.original?.requestId}`}
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
    },
  ];

  return { columns };
};
