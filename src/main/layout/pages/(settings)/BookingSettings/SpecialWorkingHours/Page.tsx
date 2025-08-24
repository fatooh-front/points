import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import { useColumns } from "./hooks/useColumns";
import { useGetWorkinghours } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";
import { useGetAllBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import HeaderBar from "./blocks/headeBar";
import { DefaultWorkingHours } from "./DefaultWorkingHours";
// Default working hours structure for each day
const getDefaultWorkingHours = (branchId?: string | number) =>
  DefaultWorkingHours.map((item) => ({ ...item, objId: branchId }));
export default function SpecialWorkingHoursPage() {
  // State for selected branch
  const [selectedBranch, setSelectedBranch] = useState<
    { value: string | number } | undefined
  >(undefined);
  // Fetch working hours for selected branch
  const {
    data: workingHoursData,
    isLoading: isWorkingHoursLoading,
    refetch,
  } = useGetWorkinghours(
    useMemo(() => selectedBranch?.value, [selectedBranch])
  );
  // Fetch all branches
  const { data: branchesData, isLoading: isBranchesLoading } =
    useGetAllBranches();
  // Prepare branch options for select dropdown
  const branchOptions = useMemo(
    () =>
      branchesData?.data
        ?.filter(
          (branch) => branch.branchId !== undefined && branch.branchId !== null
        )
        .map((branch) => ({
          value: branch.branchId as string | number,
          label: branch.branchArName,
        })) || [],
    [branchesData]
  );

  // Prepare table data
  const tableData: any[] = useMemo(() => {
    if (!workingHoursData) return [];
    return workingHoursData.data.map((workingHours) => {
      return getDefaultWorkingHours(selectedBranch?.value).map((item) => ({
        ...item,
        [item.status]: (workingHours as Record<string, any>)[item.status],
        [item.Openkey]: (workingHours as Record<string, any>)[item.Openkey],
        [item.Closekey]: (workingHours as Record<string, any>)[item.Closekey],
        [item.OpenMin]: (workingHours as Record<string, any>)[item.OpenMin],
        [item.CloseMin]: (workingHours as Record<string, any>)[item.CloseMin],
        current: workingHours.current,
        hourName: workingHours.hourName,
        allDays: workingHours,
      }));
    });
  }, [workingHoursData, selectedBranch]);

  // Prepare columns for DataTable
  const { columns } = useColumns(
    useMemo(
      () => ({
        allDays:
          workingHoursData && selectedBranch?.value !== undefined
            ? { ...workingHoursData.data, objId: selectedBranch.value }
            : undefined,
      }),
      [workingHoursData, selectedBranch]
    ),
    refetch
  );
  useEffect(() => {}, [selectedBranch]);
  // Show loading skeleton if data is loading
  if (isWorkingHoursLoading || isBranchesLoading || !columns) {
    return (
      <div className="p-10 mt-30">
        <TableSkeleton />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-7 mt-[80px] h-screen">
      {/* Branch selection dropdown */}
      <Select
        value={selectedBranch}
        onChange={(option) => setSelectedBranch(option ? option : undefined)}
        options={branchOptions}
        isClearable
        placeholder="اختر الفرع"
      />
      {/* Page header */}
      <HeaderBar selectedBranch={selectedBranch} refetch={refetch} />
      {/* Working hours table */}
      {tableData.length > 0 && columns && selectedBranch?.value && (
        <DataTable
          key={selectedBranch?.value} // Force re-mount on branch change
          data={tableData}
          columns={columns as any}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
