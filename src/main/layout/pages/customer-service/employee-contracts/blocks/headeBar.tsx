import { ExportToExcelButton } from "./ExportToExcelButton";
import { EmployeeStats } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsTypes";
import { useState } from "react";
import MultiSearch from "@/components/MultiSearch";
import { useGetAllEmployees } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsQuery";
import { Form } from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date_picker";
import MiniCalendarSVG from "@/main/global/assets/svg/MiniCalendarSVG";
import { useForm } from "react-hook-form";
import { getBranchNameByEmpId } from "../branchs";

export default function HeadeBar({
  data,
  handleSearch,
}: {
  data: EmployeeStats[];
  handleSearch: (value: { [key: string]: string }) => void;
}) {
  const [search, onSearch] = useState<{ [key: string]: string }>();

  function formatDateToYMD(date: Date) {
    return date.toISOString().split("T")[0];
  }

  const [clientSearchKey, setClientSearchKey] = useState<string>("");

  const { data: Employees } = useGetAllEmployees({
    size: 10,
  });
  const EmployeesData = Employees?.filter(
    (item: { empName: string; empId: number }) =>
      item.empName.includes(clientSearchKey)
  );
  const form = useForm<any>({
    resolver: undefined,
    defaultValues: {
      startDate: new Date("2025-01-08"),
      endDate: (() => {
        const y = new Date();
        y.setDate(y.getDate() - 1);
        return y;
      })(),
    },
  });
  return (
    <div
      className="px-6
     bg-white justify-between gap-6 items-center h-appbar flex md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      <div className="w-[300px] me-3">
        <MultiSearch
          search={search}
          onSearch={onSearch}
          key={data?.length}
          searchsData={[
            {
              name: "employeeId",
              title: "اسم الموظف",
              inputDefaultValue: clientSearchKey,
              minWidth: "300px",
              onChange: (value) => setClientSearchKey(value),
              options: [
                { value: "0", label: "الكل" },
                ...(EmployeesData?.map((item) => ({
                  value: item.empId.toString(),
                  label: `${item.empName}      -   ${
                    getBranchNameByEmpId(item.empId) || ""
                  }`,
                })) || []),
              ],
            },
          ]}
        />
      </div>
      <div className=" flex items-center  w-full justify-center gap-4">
        <Form {...form}>
          <form className="flex flex-1 justify-center gap-4">
            <div className="max-w-[443px] items-center gap-2 flex-1 flex">
              <p className="w-[90px] font-semibold text-base">من تاريخ : </p>
              <DatePicker
                Icon={<MiniCalendarSVG color={"#C9972B"} />}
                form={form}
                placeholder="من تاريخ"
                name="startDate"
                disabled={(date: Date) => {
                  const y = new Date();
                  y.setDate(y.getDate() - 1);
                  return date > y;
                }}
                label={""}
                className="h-[48px]  max-w-[443px] mt-0 "
              />
            </div>
            <div className="max-w-[443px] items-center flex gap-2 flex-1">
              <p className="w-[90px] font-semibold text-base"> إلى تاريخ : </p>
              <DatePicker
                Icon={<MiniCalendarSVG color={"#C9972B"} />}
                form={form}
                placeholder="إلى تاريخ"
                name="endDate"
                disabled={(date: Date) => {
                  const y = new Date();
                  y.setDate(y.getDate() - 1);
                  return date > y;
                }}
                label={""}
                className="h-[48px]  max-w-[443px]  mt-0"
              />
            </div>{" "}
            <div
              onClick={() => {
                handleSearch(
                  search?.employeeId === "0"
                    ? {
                        startDate: formatDateToYMD(form.getValues("startDate")),
                        endDate: formatDateToYMD(form.getValues("endDate")),
                      }
                    : {
                        startDate: formatDateToYMD(form.getValues("startDate")),
                        endDate: formatDateToYMD(form.getValues("endDate")),
                        ...search,
                      }
                );
              }}
              className=" cursor-pointer gap-1 flex items-center text-white text-base justify-center w-[53px] h-[48px] rounded-[5px] bg-primary border text-center text"
            >
              بحث
            </div>{" "}
          </form>
        </Form>
      </div>
      <ExportToExcelButton data={data || []} />
    </div>
  );
}
