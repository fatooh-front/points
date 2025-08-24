import { useState } from "react";
import {
  //  ArrowLeftRightIcon,
  XIcon,
  RotateCcwIcon,
  GripVertical,
} from "lucide-react";
import clsx from "clsx";
import columnTitleArray from "../../column_data";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ALL_COLUMNS = columnTitleArray;

const DEFAULT_COLUMNS = [
  "carName",
  "carCode",
  "typeArabicName",
  "modelArabicName",
  "dailyPrice",
  "carStatus",
  // "actions",
];

function getColumnById(id: string) {
  return ALL_COLUMNS.find((col) => col.id === id)!;
}

export default function Page() {
  const TEMP_DEFAULT_COLUMNS = sessionStorage.getItem("cars_table")
    ? JSON.parse(sessionStorage.getItem("cars_table") || "[]")
    : undefined;
  const SAVED_DEFAULT_COLUMNS = localStorage.getItem("cars_table")
    ? JSON.parse(localStorage.getItem("cars_table") || "[]")
    : undefined;
  const { i18n, t } = useTranslation("cars");
  const direction = i18n.dir ? (i18n.dir() === "ltr" ? "rtl" : "ltr") : "ltr";
  const [selected, setSelected] = useState<string[]>(
    TEMP_DEFAULT_COLUMNS || SAVED_DEFAULT_COLUMNS || DEFAULT_COLUMNS
  );
  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchSelected, setSearchSelected] = useState("");
  // Drag state
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const available = ALL_COLUMNS.filter(
    (col) => !selected.includes(col.id) && col.label.includes(searchAvailable)
  );
  const selectedColumns = selected
    .map(getColumnById)
    .filter((col): col is (typeof ALL_COLUMNS)[number] => !!col)
    .filter((col) => col.label.includes(searchSelected));

  const addColumn = (id: string) => setSelected((s) => [...s, id]);
  const removeColumn = (id: string) =>
    setSelected((s) => s.filter((c) => c !== id));
  const moveColumn = (from: number, to: number) => {
    if (from === to) return;
    setSelected((s) => {
      const arr = [...s];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };
  const resetColumns = () => setSelected(DEFAULT_COLUMNS);
  const navigate = useNavigate();

  return (
    <div
      dir={direction}
      className=" bg-white shadow-[0px_2px_32px_rgba(47,43,61,0.12)] w-full rounded-2xl flex flex-col justify-between items-start p-8 gap-[54px] font-cairo"
      style={{ height: 862 }}
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-center pb-4 gap-[170px] w-full h-[83px] border-b border-[#C4C8CC] mx-auto">
        <div className="flex flex-col justify-center items-start w-full h-[67px]">
          <div className="font-medium  text-[20px] leading-[37px] text-[#162A2B] mb-0 capitalize  h-[37px] flex items-center text-right">
            {t("editTable.title")}
          </div>
          <div className="font-normal text-[16px] leading-[30px] text-[#8E8E8E]  h-[30px] flex items-center text-right capitalize">
            {t("editTable.subtitle")}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-row justify-between items-center gap-8 w-full h-[551px] mx-auto">
        {/* Selected columns */}
        <div className="box-border flex flex-col items-start p-4 gap-4 h-[551px] flex-1 bg-white border border-[#D2D2D2] rounded-lg w-auto">
          {/* Title */}
          <div className="flex flex-row justify-end items-center pb-4 gap-6 w-full h-[56px] border-b border-[#EBEDEE]">
            <div className="flex flex-row items-center gap-2.5  h-[37px] font-medium text-[20px] text-[#162A2B] capitalize">
              {t("editTable.selectedColumns")}
            </div>
          </div>
          {/* Search */}
          <div className="flex flex-row justify-end items-center px-4 py-1 gap-4 w-full h-10 bg-white border border-[#D0DADE] rounded-lg mt-4 mb-2">
            <input
              className="border-none outline-none font-cairo font-normal text-[16px] text-[#C4C8CC] bg-transparent w-full text-right"
              placeholder={t("editTable.searchColumn")}
              value={searchSelected}
              onChange={(e) => setSearchSelected(e.target.value)}
            />
            {/* ...svg */}
          </div>
          {/* List */}
          <div className="w-full flex-1 overflow-y-auto">
            {selectedColumns.length === 0 && (
              <div className="text-[#C4C8CC] text-[16px] text-center py-8">
                {t("editTable.noSelected")}
              </div>
            )}
            {selectedColumns.map((col, index) => {
              const idx = index;
              return (
                <div
                  key={col.id}
                  className={clsx(
                    "flex flex-row items-center px-2 gap-2 w-full h-10 rounded-lg mb-2 cursor-grab",
                    draggedIdx === idx && "opacity-50 bg-[#ECF3F3]"
                  )}
                  draggable
                  onDragStart={() => setDraggedIdx(idx)}
                  onDragEnd={() => setDraggedIdx(null)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (draggedIdx !== null && draggedIdx !== idx) {
                      moveColumn(draggedIdx, idx);
                      setDraggedIdx(idx);
                    }
                  }}
                >
                  <button
                    className="bg-none border-none cursor-pointer text-[#8E8E8E] w-6 h-6"
                    onClick={() => removeColumn(col.id)}
                    aria-label={t("editTable.remove")}
                    type="button"
                  >
                    <XIcon size={24} />
                  </button>
                  <div className="flex flex-row justify-end items-center w-full h-10 font-normal text-[18px] text-[#162A2B] opacity-90">
                    {t(`cars.table.header.${col.label}`)}
                  </div>
                  <span className="w-6 h-[26px] flex items-center justify-center scale-x-[-1] ">
                    <GripVertical />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Arrow */}
        {/* ... */}
        {/* Available columns */}
        <div className="box-border flex-1 flex flex-col items-start p-4 gap-4 h-[551px] bg-white border border-[#D2D2D2] rounded-lg">
          {/* Title */}
          <div className="flex flex-row justify-end items-center pb-4 gap-6 w-full h-[56px] border-b border-[#EBEDEE]">
            <div className="flex flex-row items-center gap-2.5  h-[37px] font-medium text-[20px] text-[#162A2B] capitalize">
              {t("editTable.availableColumns")}
            </div>
          </div>
          {/* Search */}
          <div className="flex flex-row justify-end items-center px-4 py-1 gap-4 w-full h-10 bg-white border border-[#D0DADE] rounded-lg mt-4 mb-2">
            <input
              className="border-none outline-none font-cairo font-normal text-[16px] text-[#C4C8CC] bg-transparent w-full text-right"
              placeholder={t("editTable.searchColumn")}
              value={searchAvailable}
              onChange={(e) => setSearchAvailable(e.target.value)}
            />
            {/* ...svg */}
          </div>
          {/* List */}
          <div className="w-full flex-1 overflow-y-auto">
            {available.length === 0 && (
              <div className="text-[#C4C8CC] text-[16px] text-center py-8">
                {t("editTable.noAvailable")}
              </div>
            )}
            {available.map((col) => (
              <div
                key={col.id}
                className="flex flex-row items-center px-2 gap-2 w-full h-10 rounded-lg mb-2"
              >
                <div className="flex flex-row justify-end items-center w-full h-10 font-normal text-[18px] text-[#162A2B] opacity-90">
                  {t(`cars.table.header.${col.label}`)}
                </div>
                <button
                  className="bg-[#ECF3F3] text-[#162A2B] border-none rounded-lg px-4 py-1 font-medium text-[16px] cursor-pointer"
                  onClick={() => addColumn(col.id)}
                  type="button"
                >
                  {t("editTable.add")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-row justify-between items-center gap-4 w-full h-12 mx-auto">
        <div className="flex flex-row gap-4">
          <button
            onClick={() => {
              localStorage.setItem("cars_table", JSON.stringify(selected));
              sessionStorage.removeItem("cars_table");
              setTimeout(() => {
                navigate("/cars");
              }, 100);
            }}
            className="flex items-center justify-center py-1 gap-2.5 w-[170px] h-12 bg-[#162A2B] rounded-lg text-[#E7ECEE] font-normal text-[16px] border-none cursor-pointer"
            type="button"
          >
            {t("editTable.save")}
          </button>
          <button
            onClick={() => {
              sessionStorage.setItem("cars_table", JSON.stringify(selected));
              setTimeout(() => {
                navigate("/cars");
              }, 100);
            }}
            className="flex items-center justify-center py-1 gap-2.5 w-[170px] h-12 bg-white border border-[#162A2B] rounded-lg text-[#162A2B] font-normal text-[16px] cursor-pointer"
            type="button"
          >
            {t("editTable.saveTemp")}
          </button>
        </div>
        <button
          className="flex items-center gap-2.5 w-[196px] h-12 rounded-lg bg-none text-[#7E858E] font-normal text-[16px] border-none cursor-pointer"
          onClick={resetColumns}
          type="button"
        >
          <RotateCcwIcon size={20} color="#7E858E" />
          إعادة تعيين إلى الافتراضي
        </button>
      </div>
    </div>
  );
}
