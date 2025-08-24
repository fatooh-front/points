import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import useGetDataOfPage from "./hooks/useGetDataOfPage";
import { useColumns } from "./hooks/useColumns";
import HeadeBar from "./blocks/headeBar";

export default function Page() {
  const type = "";

  const {
    data,
    isLoading,
    onSelectedServerValueChange,
    // onSearchChange,
    // onSearch,
  } = useGetDataOfPage();

  const { columns } = useColumns({ type });

  // const { optionsFilter: _optionsFilter, optionsServerFilter } =
  //   useCarsFilters();
  console.log(data?.data, "cars?.data");

  // Demo data for preview purposes
  // Remove this and use real data in production
  // بيانات تجريبية للمعاينة فقط
  // احذف هذا واستخدم البيانات الحقيقية في الإنتاج
  const demoData = [
    {
      userName: "أحمد علي",
      displayDate: "2024-06-01",
      contentType: "نص",
      content: "هذا نص تجريبي للعرض.",
      id: "1",
    },
    {
      userName: "سارة محمد",
      displayDate: "2024-06-10",
      contentType: "صورة",
      content: "image1.jpg",
      id: "2",
    },
    {
      userName: "خالد يوسف",
      displayDate: "2024-06-15",
      contentType: "فيديو",
      content: "video1.mp4",
      id: "3",
    },
    {
      userName: "منى إبراهيم",
      displayDate: "2024-06-20",
      contentType: "نص",
      content: "محتوى نصي آخر للعرض.",
      id: "4",
    },
    {
      userName: "عبدالله حسن",
      displayDate: "2024-06-25",
      contentType: "صورة",
      content: "image2.jpg",
      id: "5",
    },
  ];

  return (
    <div className="flex flex-col gap-7  mt-[80px] ">
      {isLoading ||
        !demoData ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
      <HeadeBar></HeadeBar>
      {demoData && columns && (
        <DataTable
          data={Array.isArray(demoData) ? demoData : []}
          columns={columns as any}
          // paginationOptions={paginationOptions}
          onSelectedServerValueChange={onSelectedServerValueChange}
          isViewOptions={false}
          isViewServerOptions={true}
        />
      )}
    </div>
  );
}
