import DueCalendarFromTo from "@/components/DueCalendarFromTo";
import { ExportToExcelButton } from "./ExportToExcelButton";
import { EmployeeStats } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsTypes";
import { useState } from "react";
import MultiSearch from "@/components/MultiSearch";
import { useGetAllEmployees } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsQuery";

export default function HeadeBar({
  data,
  handleSearch,
}: {
  data: EmployeeStats[];
  handleSearch: (value: { [key: string]: string }) => void;
}) {
  const [search, onSearch] = useState<{ [key: string]: string }>();

  function formatDateToYMD(date: Date) {
    return date.toISOString().split("T")[0] + "T23:59:59";
  }

  const defaultFrom = new Date("2025-06-24");
  const defaultTo = new Date();
  const [clientSearchKey, setClientSearchKey] = useState<string>("");
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const { data: Employees } = useGetAllEmployees({
    size: 10,
  });
  const EmployeesData = Employees?.filter(
    (item: { empName: string; empId: number }) =>
      item.empName.includes(clientSearchKey)
  );
  return (
    <div
      className="px-6
     bg-white justify-between items-center h-appbar flex md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      <div></div>
      <MultiSearch
        onSearchBtn={() => {
          handleSearch(search || {});
        }}
        search={search}
        onSearch={onSearch}
        key={data?.length}
        searchsData={[
          {
            name: "employeeId",
            title: "اسم الموظف",
            inputDefaultValue: clientSearchKey,
            minWidth: "180px",
            onChange: (value) => setClientSearchKey(value),
            options: EmployeesData?.map((item) => ({
              value: item.empId.toString(),
              label: `${item.empName} `,
            })),
          },
          {
            minWidth: "180px",
            component: (onChange) => (
              <DueCalendarFromTo
                from={from}
                to={to}
                setFrom={(value: Date) => {
                  onChange("startDate", formatDateToYMD(value).split("T")[0]);

                  setFrom(value);
                }}
                setTo={(value: Date) => {
                  onChange("endDate", formatDateToYMD(value).split("T")[0]);
                  setTo(value);
                }}
                title={
                  from == defaultFrom && to == defaultTo
                    ? "التاريخ"
                    : `${formatDateToYMD(from)
                        .split("T")[0]
                        .replace(/-/g, "/")} - ${formatDateToYMD(to)
                        .split("T")[0]
                        .replace(/-/g, "/")}`
                }
              ></DueCalendarFromTo>
            ),

            name: "reservationDate",
            title: "التاريخ",
          },
        ]}
      />
      <ExportToExcelButton data={data || []} />
    </div>
  );
}
