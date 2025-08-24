import DueCalendarFromTo from "@/components/DueCalendarFromTo";
import MultiSearch from "@/components/MultiSearch";

import { useGetCarbyName } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";
import { useGetAllClients } from "@/main/global/api/restful/userManagmentAPI/clientsManager/clientsQuery";
import { useState } from "react";

export default function HeadeBar({
  onSearch,
}: {
  onSearch: (value: { [key: string]: string }) => void;
}) {
  function formatDateToYMD(date: Date) {
    return date.toISOString().split("T")[0] + "T23:59:59";
  }

  const defaultFrom = new Date("2025-06-24");
  const defaultTo = new Date();
  const [clientSearchKey, setClientSearchKey] = useState<string>("");
  const [mobileSearchKey, setMobileSearchKey] = useState<string>("");
  const [CarNameSearchKey, setCarNameSearchKey] = useState<string>("");
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const { data } = useGetAllClients({
    size: 10,
    firstName: clientSearchKey,
    mobile: mobileSearchKey,
  });
  const { data: dataCar } = useGetCarbyName(
    {
      page: 1,
      size: 10,
      name: CarNameSearchKey,
    },
    CarNameSearchKey.length > 2
  );
  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-center md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] md:ms-sidebar"
    >
      <MultiSearch
        onClear={() => {
          setFrom(defaultFrom);
          setTo(defaultTo);
          setClientSearchKey("");
          setMobileSearchKey("");
          setCarNameSearchKey("");
        }}
        onSearch={onSearch}
        key={data?.content?.length}
        searchsData={[
          {
            name: "clientId",
            title: "اسم العميل",
            inputDefaultValue: clientSearchKey,
            minWidth: "180px",
            onChange: (value) => setClientSearchKey(value),
            options: data?.content?.map((item) => ({
              value: item.clientId.toString(),
              label: `${item.firstName} ${item.lastName}`,
            })),
          },
          {
            minWidth: "180px",

            inputDefaultValue: mobileSearchKey,
            onChange: (value: string) => setMobileSearchKey(value),
            options: data?.content?.map((item) => ({
              value: item.clientId.toString(),
              label: `${item.mobile}`,
            })),
            name: "clientId",
            title: "رقم الجوال",
          },
          {
            minWidth: "180px",
            component: (onChange) => (
              <DueCalendarFromTo
                from={from}
                to={to}
                setFrom={(value: Date) => {
                  onChange("from", formatDateToYMD(value).split("T")[0]);

                  setFrom(value);
                }}
                setTo={(value: Date) => {
                  onChange("to", formatDateToYMD(value).split("T")[0]);
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
          {
            minWidth: "180px",

            inputDefaultValue: CarNameSearchKey,
            onChange: (value: string) => setCarNameSearchKey(value),
            options: dataCar?.map((item: any) => ({
              value: item.id.toString(),
              label: `${item.carName}`,
            })),
            name: "carId",
            title: "اسم السيارة",
          },
          {
            minWidth: "180px",

            name: "reservationId",
            title: "رقم الحجز",
          },
        ]}
      />
      {/* <Link to={"/booking/booking/add"}>
        <Button
          type="button"
          className={cn(
            " lg:flex  shadow-xl font-normal text-sm h-[48px]  gap-2 hover:opacity-70 w-full sm:w-fit"
          )}
        >
          + إضافة حجز جديد
        </Button>{" "}
      </Link> */}
    </div>
  );
}
