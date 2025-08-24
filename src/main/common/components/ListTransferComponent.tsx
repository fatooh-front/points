import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { GripVertical, X as XIcon } from "lucide-react";

type Column = {
  id: string;
  label: string;
};

interface ListTransferComponentProps {
  initialSelected: Column[];
  initialAvailable: Column[];
}

export default function ListTransferComponent({
  initialSelected,
  initialAvailable,
}: ListTransferComponentProps) {
  const { t } = useTranslation();

  // Example initial data, replace with your actual data source

  const [searchSelected, setSearchSelected] = useState("");
  const [searchAvailable, setSearchAvailable] = useState("");
  const [selectedColumns, setSelectedColumns] =
    useState<Column[]>(initialSelected);
  const [available, setAvailable] = useState<Column[]>(initialAvailable);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const removeColumn = (id: string) => {
    const col = selectedColumns.find((c) => c.id === id);
    if (col) {
      setSelectedColumns(selectedColumns.filter((c) => c.id !== id));
      setAvailable([...available, col]);
    }
  };

  const addColumn = (id: string) => {
    const col = available.find((c) => c.id === id);
    if (col) {
      setAvailable(available.filter((c) => c.id !== id));
      setSelectedColumns([...selectedColumns, col]);
    }
  };

  const moveColumn = (from: number, to: number) => {
    if (from === to) return;
    const updated = [...selectedColumns];
    const [removed] = updated.splice(from, 1);
    updated.splice(to, 0, removed);
    setSelectedColumns(updated);
  };

  const filteredSelected = selectedColumns.filter((col) =>
    col.label.toLowerCase().includes(searchSelected.toLowerCase())
  );
  const filteredAvailable = available.filter((col) =>
    col.label.toLowerCase().includes(searchAvailable.toLowerCase())
  );

  return (
    <div
      dir="ltr"
      className="flex flex-row justify-between items-center gap-8 w-full h-[551px] mx-auto"
    >
      {/* Main content */}
      {/* Selected columns */}
      <div className="box-border flex flex-col items-start p-4 gap-4 h-[551px] flex-1 bg-white border border-[#D2D2D2] rounded-lg w-auto">
        {/* Title */}
        <div className="flex flex-row justify-end items-center pb-4 gap-6 w-full h-[56px] border-b border-[#EBEDEE]">
          <div className="flex flex-row items-center gap-2.5  h-[37px] font-medium text-[20px] text-[#162A2B] capitalize">
            الفروع المختارة{" "}
          </div>
        </div>
        {/* Search */}
        <div className="flex flex-row justify-end items-center px-4 py-1 gap-4 w-full h-10 bg-white border border-[#D0DADE] rounded-lg mt-4 mb-2">
          <input
            className="border-none outline-none font-cairo font-normal text-[16px] text-[#C4C8CC] bg-transparent w-full text-right"
            placeholder={t("ابحث عن اسم عمود")}
            value={searchSelected}
            onChange={(e) => setSearchSelected(e.target.value)}
          />
          {/* ...svg */}
        </div>
        {/* List */}
        <div className="w-full flex-1 overflow-y-auto">
          {filteredSelected.length === 0 && (
            <div className="text-[#C4C8CC] text-[16px] text-center py-8">
              {t("editTable.noSelected")}
            </div>
          )}
          {filteredSelected.map((col: Column, index: number) => {
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
                  {t(`${col.label}`)}
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
            {t("الفروع الموجودة")}
          </div>
        </div>
        {/* Search */}
        <div className="flex flex-row justify-end items-center px-4 py-1 gap-4 w-full h-10 bg-white border border-[#D0DADE] rounded-lg mt-4 mb-2">
          <input
            className="border-none outline-none font-cairo font-normal text-[16px] text-[#C4C8CC] bg-transparent w-full text-right"
            placeholder={t("ابحث عن اسم عمود")}
            value={searchAvailable}
            onChange={(e) => setSearchAvailable(e.target.value)}
          />
          {/* ...svg */}
        </div>
        {/* List */}
        <div className="w-full flex-1 overflow-y-auto">
          {filteredAvailable.length === 0 && (
            <div className="text-[#C4C8CC] text-[16px] text-center py-8">
              {t("editTable.noAvailable")}
            </div>
          )}
          {filteredAvailable.map((col: Column) => (
            <div
              key={col.id}
              className="flex flex-row items-center px-2 gap-2 w-full h-10 rounded-lg mb-2"
            >
              <div className="flex flex-row justify-end items-center w-full h-10 font-normal text-[18px] text-[#162A2B] opacity-90">
                {t(`${col.label}`)}
              </div>
              <button
                className="bg-[#ECF3F3] text-[#162A2B] border-none rounded-lg px-4 py-1 font-medium text-[16px] cursor-pointer"
                onClick={() => addColumn(col.id)}
                type="button"
              >
                {t("اضافه")}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
    </div>
  );
}
