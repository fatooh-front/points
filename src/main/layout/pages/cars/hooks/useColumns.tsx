import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { GetCars } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsTypes";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { useDeleteCars } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";
import InProgressSVG from "@/main/global/assets/svg/InProgressSVG";
import { Dot } from "lucide-react";
// import hundelLoclize from "@/main/global/utils/hundelLoclize";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import BenEditIcon from "@/main/global/assets/svg/benEditIcon";
// import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
// import { useDeleteCars } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";

export const useColumns = ({
  type = "",
}: // onItemSelect,
{
  type: string | undefined;
  onItemSelect?: (item: string) => void;
}) => {
  const { t } = useTranslation("cars");
  console.log(type);
  const { mutate: mutate } = useDeleteCars();

  const columns: ColumnDef<GetCars>[] = [
    {
      id: "carStatus",
      accessorKey: "carStatus",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.carStatus")}
        />
      ),
      cell: ({ row }) => (
        <div
          className={` w-[90px] mx-auto text-sm h-[36px] flex items-center justify-center rounded-[6px] border ${
            row.getValue("carStatus") ? " text-[#7AAA81]" : " text-[#E52B2E]"
          }`}
        >
          <Dot width={15} strokeWidth={5}></Dot>{" "}
          {row.getValue("carStatus")
            ? t("cars.table.status.active", { defaultValue: "ظاهرة" })
            : t("cars.table.status.inactive", { defaultValue: "غير ظاهرة" })}
        </div>
      ),
    },
    {
      id: "carName",
      accessorKey: "carName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.carName")}
        />
      ),
      cell: ({ row }) => row.getValue("carName"),
    },
    {
      id: "carCode",
      accessorKey: "carCode",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.carCode")}
        />
      ),
      cell: ({ row }) => row.getValue("carCode"),
    },
    {
      id: "plateNumber",
      accessorKey: "plateNumber",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.plateNumber")}
        />
      ),
      cell: ({ row }) => row.getValue("plateNumber"),
    },

    {
      id: "image",
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.image")}
        />
      ),
      cell: ({ row }) => row.getValue("image"),
    },
    {
      id: "cover",
      accessorKey: "cover",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.cover")}
        />
      ),
      cell: ({ row }) => row.getValue("cover"),
    },
    {
      id: "numberOfDoors",
      accessorKey: "numberOfDoors",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.numberOfDoors")}
        />
      ),
      cell: ({ row }) => row.getValue("numberOfDoors"),
    },
    {
      id: "numberOfPassengers",
      accessorKey: "numberOfPassengers",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.numberOfPassengers")}
        />
      ),
      cell: ({ row }) => row.getValue("numberOfPassengers"),
    },
    {
      id: "airCondition",
      accessorKey: "airCondition",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.airCondition")}
        />
      ),
      cell: ({ row }) => (row.getValue("airCondition") ? t("yes") : t("no")),
    },
    {
      id: "showHome",
      accessorKey: "showHome",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.showHome")}
        />
      ),
      cell: ({ row }) => (row.getValue("showHome") ? t("yes") : t("no")),
    },
    {
      id: "offer",
      accessorKey: "offer",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.offer")}
        />
      ),
      cell: ({ row }) => (row.getValue("offer") ? t("yes") : t("no")),
    },
    {
      id: "insurancePrice",
      accessorKey: "insurancePrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.insurancePrice")}
        />
      ),
      cell: ({ row }) => row.getValue("insurancePrice"),
    },
    {
      id: "dailyPrice",
      accessorKey: "dailyPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.dailyPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("dailyPrice"),
    },
    {
      id: "weeklyPrice",
      accessorKey: "weeklyPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.weeklyPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("weeklyPrice"),
    },
    {
      id: "monthlyPrice",
      accessorKey: "monthlyPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.monthlyPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("monthlyPrice"),
    },
    {
      id: "yearlyPrice",
      accessorKey: "yearlyPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.yearlyPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("yearlyPrice"),
    },
    {
      id: "offerDailyPrice",
      accessorKey: "offerDailyPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.offerDailyPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("offerDailyPrice"),
    },
    {
      id: "offerWeeklyPrice",
      accessorKey: "offerWeeklyPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.offerWeeklyPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("offerWeeklyPrice"),
    },
    {
      id: "offerMonthlyPrice",
      accessorKey: "offerMonthlyPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.offerMonthlyPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("offerMonthlyPrice"),
    },
    {
      id: "offerYearlyPrice",
      accessorKey: "offerYearlyPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.offerYearlyPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("offerYearlyPrice"),
    },
    {
      id: "kmPrice",
      accessorKey: "kmPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.kmPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("kmPrice"),
    },
    {
      id: "maxKm",
      accessorKey: "maxKm",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.maxKm")}
        />
      ),
      cell: ({ row }) => row.getValue("maxKm"),
    },

    {
      id: "notes",
      accessorKey: "notes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("notes")} />
      ),
      cell: ({ row }) => row.getValue("notes"),
    },
    {
      id: "brandLogo",
      accessorKey: "brandLogo",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.brandLogo")}
        />
      ),
      cell: ({ row }) => row.getValue("brandLogo"),
    },
    {
      id: "modelEnglishName",
      accessorKey: "modelEnglishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.modelEnglishName")}
        />
      ),
      cell: ({ row }) => row.getValue("modelEnglishName"),
    },
    {
      id: "modelArabicName",
      accessorKey: "modelArabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.modelArabicName")}
        />
      ),
      cell: ({ row }) => row.getValue("modelArabicName"),
    },

    {
      id: "brandName",
      accessorKey: "brandName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.brandName")}
        />
      ),
      cell: ({ row }) => row.getValue("brandName"),
    },
    {
      id: "brandArabicName",
      accessorKey: "brandArabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.brandArabicName")}
        />
      ),
      cell: ({ row }) => row.getValue("brandArabicName"),
    },

    {
      id: "engineEnglishName",
      accessorKey: "engineEnglishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.engineEnglishName")}
        />
      ),
      cell: ({ row }) => row.getValue("engineEnglishName"),
    },
    {
      id: "engineArabicName",
      accessorKey: "engineArabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.engineArabicName")}
        />
      ),
      cell: ({ row }) => row.getValue("engineArabicName"),
    },

    {
      id: "carYear",
      accessorKey: "carYear",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.carYear")}
        />
      ),
      cell: ({ row }) => row.getValue("carYear"),
    },
    {
      id: "typeArabicName",
      accessorKey: "typeArabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.typeArabicName")}
        />
      ),
      cell: ({ row }) => row.getValue("typeArabicName"),
    },
    {
      id: "typeEnglishName",
      accessorKey: "typeEnglishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.typeEnglishName")}
        />
      ),
      cell: ({ row }) => row.getValue("typeEnglishName"),
    },
    {
      id: "typeNotes",
      accessorKey: "typeNotes",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.typeNotes")}
        />
      ),
      cell: ({ row }) => row.getValue("typeNotes"),
    },
    {
      id: "categoryEnglishName",
      accessorKey: "categoryEnglishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.categoryEnglishName")}
        />
      ),
      cell: ({ row }) => row.getValue("categoryEnglishName"),
    },
    {
      id: "categoryArabicName",
      accessorKey: "categoryArabicName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.categoryArabicName")}
        />
      ),
      cell: ({ row }) => row.getValue("categoryArabicName"),
    },
    {
      id: "categoryDeliveryPrice",
      accessorKey: "categoryDeliveryPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.categoryDeliveryPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("categoryDeliveryPrice"),
    },

    {
      id: "finalPrice",
      accessorKey: "finalPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.finalPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("finalPrice"),
    },
    {
      id: "numOfDays",
      accessorKey: "numOfDays",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.numOfDays")}
        />
      ),
      cell: ({ row }) => row.getValue("numOfDays"),
    },
    {
      id: "datingType",
      accessorKey: "datingType",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.datingType")}
        />
      ),
      cell: ({ row }) => row.getValue("datingType"),
    },

    {
      id: "extraKm",
      accessorKey: "extraKm",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.extraKm")}
        />
      ),
      cell: ({ row }) => row.getValue("extraKm"),
    },
    {
      id: "extraPrice",
      accessorKey: "extraPrice",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("cars.table.header.extraPrice")}
        />
      ),
      cell: ({ row }) => row.getValue("extraPrice"),
    },

    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"الأوامر"} />
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          {row.original?.carStatus ? (
            <Link
              to={`/cars/edit/${row.original?.carId}`}
              className="p-0 w-[43px]  h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md"
            >
              <Button
                type="button"
                size="sm"
                className={cn(
                  "h-8 lg:flex bg-yellow-700 shadow-xl  bg-transparent hover:opacity-70 w-full sm:w-fit"
                )}
              >
                <BenEditIcon className="h-4 w-4 text-yellow-700" />
              </Button>{" "}
            </Link>
          ) : (
            <Link
              to={`/cars/add/${row.original?.carId}`}
              className="p-0 w-[43px] h-[36px] hover:opacity-50 bg-[#C9972B1F]  flex items-center justify-center rounded-md"
            >
              <Button
                type="button"
                size="sm"
                className={cn(
                  "h-8 lg:flex   shadow-none hover:bg-transparent  bg-transparent w-full sm:w-fit"
                )}
              >
                <InProgressSVG />
              </Button>{" "}
            </Link>
          )}

          <TDeleteDialog
            id={row.original?.carId}
            mutate={mutate}
            isAllow={true}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return {
    columns,
  };
};
