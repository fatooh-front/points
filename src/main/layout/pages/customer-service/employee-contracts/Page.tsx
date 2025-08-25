import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/headeBar";
import { useGetAllEmployeesPoints } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsQuery";
import { useState } from "react";
import { getBranchNameByEmpId } from "./branchs";

export default function Page() {
  const { columns } = useColumns();

  const [search, onSearch] = useState<{ [key: string]: string }>();

  // Branch mapping (empId → branch name)

  console.log(search, "searchsearchsearch");

  // Function to get branch name by empId

  const { data, isLoading } = useGetAllEmployeesPoints(search || {});
  console.log(data, "cars?.data");
  const dataOfPoints =
    data?.map((item) => ({
      ...item,
      id: item.empId,
      branchName: getBranchNameByEmpId(item.empId),
    })) || [];
  return (
    <div className="flex flex-col gap-7 mt-[80px] ">
      {isLoading ||
        !data ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      <HeadeBar handleSearch={onSearch} data={dataOfPoints || []}></HeadeBar>
      {data && columns && (
        <DataTable
          data={Array.isArray(data) ? dataOfPoints : []}
          columns={columns as any}
          key={data?.length}
          // paginationOptions={paginationOptions}
          // onSelectedServerValueChange={onSelectedServerValueChange}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
