import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/headeBar";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date_picker";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { UnitNotificationsFormDialog } from "./blocks/dialogs/send-notifications-dialogs/UnitNotificationsFormDialog";
import { Bell } from "lucide-react";
import MiniCalendarSVG from "@/main/global/assets/svg/MiniCalendarSVG";
import { useGetAllClients } from "@/main/global/api/restful/userManagmentAPI/clientsManager/clientsQuery";
import { PaginationOptions } from "@/main/common/components/dataTable/types/commonTableTypes";

export default function Page() {
  const type = "";
  const [textSearch, setTextSearch] = useState("");
  const [page, setPage] = useState<number | undefined>(1); //send it
  const [limit, setLimit] = useState<number | undefined>(10);
  const { columns } = useColumns({ type });
  function formatDateToYMD(date: Date) {
    return date.toISOString().split("T")[0] + "T23:59:59";
  }
  const form = useForm<any>({
    resolver: undefined,
    defaultValues: {
      startDate: new Date("1999-01-01"),
      endDate: new Date(),
    },
  });

  const { data, isLoading } = useGetAllClients({
    page: (page ?? 1) - 1,
    size: limit,
    firstName: textSearch,
    email: textSearch,
    mobile: textSearch,
    nationalId: textSearch,
    nationality: textSearch,
    from: formatDateToYMD(form.getValues("startDate")),
    to: formatDateToYMD(form.getValues("endDate")),
  });
  // const isLoading = false;
  const paginationOptions: PaginationOptions = {
    totalPages: data?.totalPages,
    totalnums: Number(data?.size) || 0,
    currentPage: page,
    limit,
    setPage,
    setLimit,
  };

  const onSelectedServerValueChange = () => {};

  return (
    <div className="flex flex-col gap-7 mt-[80px] ">
      {isLoading ||
        !data ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      <HeadeBar
        OnChangeSearchBar={(e) => setTextSearch(e)}
        value={textSearch}
      ></HeadeBar>
      <div className=" mt-6 flex items-center  w-full justify-center gap-4">
        <Form {...form}>
          <form className="flex flex-1 justify-center gap-4">
            <div className="max-w-[443px] flex-1">
              <DatePicker
                Icon={<MiniCalendarSVG color={"#C9972B"} />}
                form={form}
                placeholder="من تاريخ"
                name="startDate"
                label={""}
                className="h-[48px]  max-w-[443px] mt-0 "
              />
            </div>
            <div className="max-w-[443px] flex-1">
              <DatePicker
                Icon={<MiniCalendarSVG color={"#C9972B"} />}
                form={form}
                placeholder="إلى تاريخ"
                name="endDate"
                label={""}
                className="h-[48px]  max-w-[443px]  mt-0"
              />
            </div>{" "}
            <div className=" cursor-pointer gap-1 flex items-center text-base justify-center w-[53px] h-[48px] rounded-[5px] bg-white border text-center text">
              بحث
            </div>{" "}
            <UnitNotificationsFormDialog
              passedButton={
                <div className=" cursor-pointer gap-1 flex items-center text-base justify-center w-[158px] h-[48px] rounded-[5px] bg-white border text-center text">
                  <Bell size={16}></Bell> إرسال إشعار للجميع
                </div>
              }
              type="add"
            ></UnitNotificationsFormDialog>
          </form>
        </Form>
      </div>
      {data && columns && (
        <DataTable
          data={
            Array.isArray(data.content)
              ? data.content.map((item) => ({
                  ...item,
                  id: item.clientId,
                }))
              : []
          }
          columns={columns as any}
          paginationOptions={paginationOptions}
          onSelectedServerValueChange={onSelectedServerValueChange}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
