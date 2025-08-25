import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { EmployeeStats } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsTypes";
import { saveAs } from "file-saver";

export function ExportToExcelButton({ data }: { data: EmployeeStats[] | [] }) {
  const handleExport = () => {
    const exportData = data.map((item) => ({
      "رقم الموظف": item.empId,
      "اسم الموظف": item.empName,
      "النقاط التقييم": item.mapPoints,
      "نقاط العقود المفتوحة": item.openPoints,
      "نقاط العقود المغلقة": item.closedPoints,
      "إجمالي النقاط": item.totalPoints ?? 0,
      "اسم الفرع": item.branchName ?? "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // هنا بنحدد عرض الأعمدة + محاذاة للنصوص
    worksheet["!cols"] = [
      { wch: 15 }, // رقم الموظف
      { wch: 25 }, // اسم الموظف
      { wch: 20 }, // النقاط التقييم
      { wch: 25 }, // نقاط العقود المفتوحة
      { wch: 25 }, // نقاط العقود المغلقة
      { wch: 20 }, // إجمالي النقاط
      { wch: 25 }, // اسم الفرع
    ];

    // إضافة اتجاه RTL عن طريق ستايل الخلايا (محاذاة يمين)
    Object.keys(worksheet).forEach((key) => {
      if (key[0] === "!") return; // تخطي الميتا زي !ref و !cols
      const cell = worksheet[key];
      if (cell && typeof cell === "object") {
        cell.s = {
          alignment: { horizontal: "right" }, // محاذاة يمين
        };
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "إحصائيات الموظفين");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true, // مهم عشان يطبق ستايل
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "EmployeeStats.xlsx");
  };

  return (
    <Button
      onClick={handleExport}
      className=" h-11 bg-white text-base text-primary hover:bg-slate-100"
    >
      تصدير إلى Excel
    </Button>
  );
}
