import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { UnitFormDialog } from "../blocks/dialogs/UnitFormDialog";
import { Switch } from "@/components/ui/switch";
import { WorkingHours } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsTypes";
import { useAddWorkinghours } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";

export const useColumns = ({
  refetchWorkinghours,
  allDays,
}: {
  refetchWorkinghours: any;
  allDays?: WorkingHours;
}) => {
  const { t } = useTranslation("carBrands");
  const { mutate: mutateAdd } = useAddWorkinghours();
  let defaultData: WorkingHours = {
    objId: null,
    sun: 0,
    mon: 0,
    tues: 0,
    wed: 0,
    thurs: 0,
    fri: 0,
    sat: 0,
    sunOpenHour: 0,
    sunOpenMin: 0,
    monOpenHour: 0,
    monOpenMin: 0,
    tuesOpenHour: 0,
    tuesOpenMin: 0,
    wedOpenHour: 0,
    wedOpenMin: 0,
    thursOpenHour: 0,
    thursOpenMin: 0,
    friOpenHour: 0,
    friOpenMin: 0,
    satOpenHour: 0,
    satOpenMin: 0,
    sunCloseHour: 0,
    sunCloseMin: 0,
    monCloseHour: 0,
    monCloseMin: 0,
    tuesCloseHour: 0,
    tuesCloseMin: 0,
    wedCloseHour: 0,
    wedCloseMin: 0,
    thursCloseHour: 0,
    thursCloseMin: 0,
    friCloseHour: 0,
    friCloseMin: 0,
    satCloseHour: 0,
    satCloseMin: 0,
    notes: null,
  };
  const columns: ColumnDef<{
    day: string;
    Closekey: string;
    Openkey: string;
    status: string;
    [key: string]: string | number;
  }>[] = [
    {
      id: "englishName",
      accessorKey: "englishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="!text-start justify-start"
          title={"اليوم"}
        />
      ),
      cell: ({ row }) => (
        <div className=" justify-start text-start mx-3">{row.original.day}</div>
      ),
      meta: {
        header: t("carBrands.table.header.englishName"),
      },
    },
    {
      id: "englishName",
      accessorKey: "englishName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="!text-start justify-start"
          title={"إبتداء  الساعة"}
        />
      ),
      cell: ({ row }) => (
        <div
          onClick={() =>
            console.log(row, "sssssssssssssssssssssssssssssssssss")
          }
          className=" justify-start text-start mx-3"
        >
          {row.original[row.original.Openkey]}
        </div>
      ),
      meta: {
        header: t("carBrands.table.header.englishName"),
      },
    },
    {
      id: "arabicName",
      accessorKey: "arabicName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"إنتهاء الساعة"} />
      ),
      cell: ({ row }) => row.original[row.original.Closekey],
      meta: {
        header: t("carBrands.table.header.arabicName"),
      },
    },

    {
      id: "actions",
      header: t("cars.table.header.actions"),
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Switch
            dir="ltr"
            checked={row.original[row.original.status] == "1"}
            onCheckedChange={(checked) => {
              defaultData.objId = row.original.objId;
              console.log(defaultData, row.original.status, "fgggggggg");

              (defaultData as any)[row.original.status] = checked ? 1 : 0;
              const sendData = allDays
                ? { ...allDays, [row.original.status]: checked ? 1 : 0 }
                : null;
              mutateAdd(
                {
                  ...(sendData || defaultData),
                },
                {
                  onSuccess: () => {
                    refetchWorkinghours();
                  },
                }
              );
            }}
          />
          <div className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md">
            {allDays || row.original.objId ? (
              <UnitFormDialog
                type={"edit"}
                btn
                refetchWorkinghours={refetchWorkinghours}
                unit={row.original}
                allDays={allDays || { objId: row.original.objId }}
              />
            ) : null}
          </div>
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
