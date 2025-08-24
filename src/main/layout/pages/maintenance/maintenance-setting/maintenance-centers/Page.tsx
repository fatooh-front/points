import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
// import useGetDataOfPage from "./hooks/useGetDataOfPage";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/headeBar";

export default function Page() {
  const type = "";

  const data = {
    data: [
      {
        id: "1",
        centerName: "مركز النخبة",
        phone: "0551234567",
        whatsapp: "0551234567",
        email: "elite@center.com",
        address: "الرياض - حي العليا",
        actions: null,
      },
      {
        id: "2",
        centerName: "مركز الرائد",
        phone: "0557654321",
        whatsapp: "0557654321",
        email: "leader@center.com",
        address: "جدة - شارع فلسطين",
        actions: null,
      },
      {
        id: "3",
        centerName: "مركز المحترف",
        phone: "0561122334",
        whatsapp: "0561122334",
        email: "pro@center.com",
        address: "الدمام - طريق الخليج",
        actions: null,
      },
    ],
  };

  const { columns } = useColumns({ type });

  // const { optionsFilter: _optionsFilter, optionsServerFilter } =
  //   useCarsFilters();
  console.log(data?.data, "cars?.data");

  return (
    <div className="flex flex-col gap-7 mt-[80px] ">
      {true ||
        !data ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      <HeadeBar></HeadeBar>
      {data && columns && (
        <DataTable
          data={
            Array.isArray(data?.data)
              ? data?.data.map((item) => ({ ...item, id: item.id }))
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
