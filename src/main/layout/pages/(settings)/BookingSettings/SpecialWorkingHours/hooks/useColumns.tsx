import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { UnitFormDialog } from "../blocks/dialogs/UnitFormDialog";
import { Switch } from "@/components/ui/switch";
import { WorkingHours } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsTypes";
import { useSetCurrentWorkingDay } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";
import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { useDeletePrivateWorkingDay } from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";

export const useColumns = (
  { allDays }: { allDays?: WorkingHours },
  refetch: any
) => {
  const { mutate: mutateAdd } = useSetCurrentWorkingDay();
  const { mutate: mutateDelete } = useDeletePrivateWorkingDay();

  const { t } = useTranslation("carBrands");
  const columns: ColumnDef<
    [
      {
        [key: string]: string | number;
        status: string;
        Openkey: string;
        OpenMin: string;
        Closekey: string;
        CloseMin: string;
        allDays: any;
        day: string;
      },
      {
        [key: string]: string | number;
        status: string;
        Openkey: string;
        OpenMin: string;
        Closekey: string;
        CloseMin: string;
        allDays: any;

        day: string;
      }
    ]
  >[] = [
    {
      id: "day",
      header: () => <div className="text-center w-full">اسم الفترة</div>,
      cell: ({ row }) => row.original[0].hourName,
      meta: {
        header: t("carBrands.table.header.englishName"),
      },
    },
    // {
    //   id: "dateRange",
    //   header: () => (
    //     <div className="text-center w-full">تاريخ بداية ونهاية الفترة</div>
    //   ),
    //   cell: ({ row }) => {
    //     // Assume row.original is an array with at least two items: [start, end]
    //     const items = row.original;
    //     if (!Array.isArray(items) || items.length < 2) return null;
    //     const start = items[0];
    //     const end = items[1];
    //     return (
    //       <div className="flex flex-col items-center justify-center py-4">
    //         <span className="text-[#374151] text-base font-normal">
    //           {start[start.Openkey]}
    //         </span>
    //         <span className="my-2 text-[#C89B3C] text-xl">&#8595;</span>
    //         <span className="text-[#374151] text-base font-normal">
    //           {end[end.Closekey]}
    //         </span>
    //       </div>
    //     );
    //   },
    //   meta: {
    //     header: t("carBrands.table.header.englishName"),
    //   },
    // },
    {
      id: "day",
      header: () => <div className="text-center w-full">اليوم</div>,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center text-[#8E8E8E] gap-[26px]">
          {row.original.map((item, idx) =>
            item[item.status] ? <div key={idx}>{item.day}</div> : null
          )}
        </div>
      ),
      meta: {
        header: t("carBrands.table.header.englishName"),
      },
    },
    {
      id: "openTime",
      header: () => <div className="text-center w-full">إبتداء الساعة</div>,
      cell: ({ row }) => (
        <div className="flex flex-col  gap-[26px] items-center justify-center text-[#8E8E8E]">
          {row.original.map((item, idx) =>
            item[item.status] ? (
              <div key={idx}>{`${item[item.Openkey]}${
                item[item.OpenMin] ? ":" + item[item.OpenMin] : ""
              }`}</div>
            ) : null
          )}
        </div>
      ),
      meta: {
        header: t("carBrands.table.header.englishName"),
      },
    },
    {
      id: "closeTime",
      header: () => <div className="text-center w-full">إنتهاء الساعة</div>,
      cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center text-[#8E8E8E] gap-[26px]">
          {row.original.map((item, idx) =>
            item[item.status] ? (
              <div key={idx}>{`${item[item.Closekey]}${
                item[item.CloseMin] ? ":" + item[item.CloseMin] : ""
              }`}</div>
            ) : null
          )}
        </div>
      ),
      meta: {
        header: t("carBrands.table.header.arabicName"),
      },
    },
    {
      id: "المفعل",
      header: "المفعل",
      cell: ({ row }) => (
        <Switch
          dir="ltr"
          checked={row.original[0].allDays.current == "1"}
          onCheckedChange={() => {
            mutateAdd(row.original[0].allDays.hourId, {
              onSuccess: () => {
                refetch();
              },
            });
            console.log(row.original);
            /* handle toggle */
          }}
        />
      ),
      meta: {
        header: t("cars.table.header.actions"),
      },
    },
    {
      id: "actions",
      header: t("cars.table.header.actions"),
      cell: ({ row }) => (
        <div>
          {allDays || row.original[0].objId ? (
            <div className="flex justify-center items-center gap-2">
              <div className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md">
                <TDeleteDialog
                  id={row.original[0].allDays.hourId}
                  mutate={mutateDelete}
                  isAllow={true}
                ></TDeleteDialog>
              </div>
              <div className="p-0 w-[43px] h-[36px] hover:opacity-70 bg-[#E9EDE9] flex items-center justify-center rounded-md">
                <UnitFormDialog
                  type={"edit"}
                  btn
                  unit={row.original[0]}
                  refetch={refetch}
                  allDays={
                    row.original[0].allDays || { objId: row.original[0].objId }
                  }
                />
              </div>
            </div>
          ) : null}
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
