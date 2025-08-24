import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import { useColumns } from "./hooks/useColumns";
import { useGetWorkinghours } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";
import { useGetAllBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
import Select from "react-select";
import { useState } from "react";

export default function Page() {
  const [selectBranches, setSelectBranches] = useState<
    { value: string | number } | undefined
  >(undefined);
  const {
    data: dataOfDay,
    isLoading,
    refetch: refetchWorkinghours,
  } = useGetWorkinghours(selectBranches?.value);

  const { data: Branches, isLoading: isBranchesLoading } = useGetAllBranches();
  const BranchesList =
    Branches?.data
      ?.filter((item) => item.branchId !== undefined && item.branchId !== null)
      .map((item) => ({
        value: item.branchId as string | number,
        label: item.branchArName,
      })) || [];
  const daysInArabic = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  let data = [
    {
      objId: selectBranches?.value,

      status: "sun",
      Openkey: "sunOpenHour",
      Closekey: "sunCloseHour",
      day: daysInArabic[0],
    },
    {
      objId: selectBranches?.value,

      status: "mon",
      Openkey: "monOpenHour",
      Closekey: "monCloseHour",
      day: daysInArabic[1],
    },
    {
      objId: selectBranches?.value,

      status: "tues",
      Openkey: "tuesOpenHour",
      Closekey: "tuesCloseHour",
      day: daysInArabic[2],
    },
    {
      objId: selectBranches?.value,

      status: "wed",
      Openkey: "wedOpenHour",
      Closekey: "wedCloseHour",
      day: daysInArabic[3],
    },
    {
      objId: selectBranches?.value,

      status: "thurs",
      Openkey: "thursOpenHour",
      Closekey: "thursCloseHour",
      day: daysInArabic[4],
    },
    {
      objId: selectBranches?.value,

      status: "fri",
      Openkey: "friOpenHour",
      Closekey: "friCloseHour",
      day: daysInArabic[5],
    },
    {
      objId: selectBranches?.value,

      status: "sat",
      Openkey: "satOpenHour",
      Closekey: "satCloseHour",
      day: daysInArabic[6],
    },
  ];
  if (dataOfDay) {
    data = data.map((item) => ({
      ...item,
      [item.status]: (dataOfDay.data[0] as Record<string, any>)[item.status],
      [item.Openkey]: (dataOfDay.data[0] as Record<string, any>)[item.Openkey],
      [item.Closekey]: (dataOfDay.data[0] as Record<string, any>)[
        item.Closekey
      ],
    }));
    console.log(dataOfDay, "dataOfDay");
  }
  console.log(dataOfDay, "dataOfDay");

  const { columns } = useColumns({
    refetchWorkinghours,
    allDays:
      dataOfDay && selectBranches?.value !== undefined
        ? { ...dataOfDay.data[0], objId: selectBranches.value }
        : undefined,
  });

  // const { optionsFilter: _optionsFilter, optionsServerFilter } =
  //   useCarsFilters();

  return (
    <div className="flex flex-col gap-7  h-screen ">
      {isLoading ||
        isBranchesLoading ||
        !data ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      <Select
        value={selectBranches}
        onChange={(e) => {
          setSelectBranches(e ? e : undefined);
        }}
        options={BranchesList}
        isClearable
        placeholder="اختر الفرع"
      />
      {data && columns && selectBranches?.value && (
        <DataTable
          data={
            Array.isArray(data)
              ? data.map((item) => ({ ...item, id: item.status }))
              : []
          }
          columns={columns as any}
          // paginationOptions={paginationOptions}
          // onSelectedServerValueChange={onSelectedServerValueChange}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
