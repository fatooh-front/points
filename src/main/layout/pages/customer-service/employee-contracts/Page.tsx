import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/headeBar";
import { useGetAllEmployeesPoints } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsQuery";
import { useState } from "react";

export default function Page() {
  const { columns } = useColumns();

  const [search, onSearch] = useState<{ [key: string]: string }>();

  // Branch mapping (empId → branch name)
  const branches: { [key: string]: string } = {
    "95": "فرع قريش - جدة",
    "124": "فرع قريش - جدة",
    "129": "فرع قريش - جدة",
    "130": "فرع قريش - جدة",
    "22": "فرع العزيزية - مكة",
    "75": "فرع العزيزية - مكة",
    "103": "فرع العزيزية - مكة",
    "23": "فرع الكعكية - مكة",
    "72": "فرع الكعكية - مكة",
    "94": "فرع طريق المدينة - جدة",
    "117": "فرع طريق المدينة - جدة",
    "31": "فرع النزهة - مكة",
    "38": "فرع النزهة - مكة",
    "91": "فرع النزهة - مكة",
    "119": "فرع النزهة - مكة",
    "120": "فرع النزهة - مكة",
    "125": "فرع النزهة - مكة",
    "136": "فرع النزهة - مكة",
    "49": "فرع اُبحر - جدة",
    "126": "فرع اُبحر - جدة",
  };
  console.log(search, "searchsearchsearch");

  // Function to get branch name by empId
  function getBranchNameByEmpId(empId: number) {
    return branches[String(empId)] || "Unknown Branch";
  }
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
