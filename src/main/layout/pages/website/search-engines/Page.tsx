import TableSkeleton from "@/main/common/components/dataTable/blocks/tableskeleton/TableSkeleton";
import { DataTable } from "@/main/common/components/dataTable/DataTable";
import useGetDataOfPage from "./hooks/useGetDataOfPage";
import { useColumns } from "./hooks/useColumns";

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
      pageName: "الرئيسية",
      metaTitle: "ALghazal",
      metaKeywords: "غير ظاهرة",
      id: "1",
    },
    {
      pageName: "العروض",
      metaTitle: "عروض مذهلة: استمتع بأفضل الأسعار",
      metaKeywords: "غير ظاهرة",
      id: "2",
    },
    {
      pageName: "الفروع",
      metaTitle: "فروعنا: أقرب موقع لخدمتك",
      metaKeywords: "غير ظاهرة",
      id: "3",
    },
    {
      pageName: "المدونة",
      metaTitle: "المدونة: أحدث المقالات والنصائح بين يديك",
      metaKeywords: "غير ظاهرة",
      id: "4",
    },
    {
      pageName: "الوظائف المتاحة",
      metaTitle: "الوظائف المتاحة: انضم لفريق عملنا المتميز",
      metaKeywords: "غير ظاهرة",
      id: "5",
    },
    {
      pageName: "تواصل شروط الإستخدام",
      metaTitle: "شروط الاستخدام: استخدامك لخدماتنا بكل شفافية",
      metaKeywords: "غير ظاهرة",
      id: "6",
    },
    {
      pageName: "تواصل معنا",
      metaTitle: "تواصل معنا: نحن هنا لخدمتك دائمًا",
      metaKeywords: "غير ظاهرة",
      id: "7",
    },
    {
      pageName: "سياسة الخصوصية",
      metaTitle: "سياسة الخصوصية: حماية بياناتك أولويتنا",
      metaKeywords: "غير ظاهرة",
      id: "8",
    },
    {
      pageName: "شروط الإلغاء",
      metaTitle: "شروط الإلغاء: تعرف على السياسة بكل وضوح",
      metaKeywords: "غير ظاهرة",
      id: "9",
    },
    {
      pageName: "من نحن",
      metaTitle: "اكتشف من نحن: رؤيتنا وقيمنا في خدمتكم",
      metaKeywords: "غير ظاهرة",
      id: "10",
    },
  ];

  return (
    <div className="flex flex-col gap-7 ">
      {isLoading ||
        !demoData ||
        (!columns && (
          <div className="p-10 mt-30">
            <TableSkeleton />
          </div>
        ))}
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
