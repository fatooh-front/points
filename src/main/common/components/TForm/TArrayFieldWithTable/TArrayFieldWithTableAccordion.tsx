import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PopupHeader from "@/main/common/components/dialogHeader/PopupHeader";
import { ColumnDef } from "@tanstack/react-table";
import TArrayFieldWithTable from "./TArrayFieldWithTable";

type Props = {
  type?: "add" | "edit" | "view" | string;
  form: any;
  name: string;
  itemData?: any;
  children?: React.ReactNode;
  columnsPassed?: ColumnDef<any>[];
  defaultValue: any;
  accordionItemValue?: string;
  accordionItemtitle?: string;
};

export default function TArrayFieldWithTableAccordion({
  type,
  form,
  name,
  itemData,
  children,
  columnsPassed,
  defaultValue,
  accordionItemValue,
  accordionItemtitle,
}: Props) {
  return (
    <AccordionItem
      value={accordionItemValue || "array-field-table-form"}
      className="border rounded-lg shadow"
    >
      <AccordionTrigger className="px-4 hover:no-underline">
        <PopupHeader title={accordionItemtitle} className="text-xl text-gray-500" />
      </AccordionTrigger>
      <AccordionContent>
        <TArrayFieldWithTable
          type={type}
          form={form}
          name={name}
          itemData={itemData}
          columnsPassed={columnsPassed}
          defaultValue={defaultValue}
        >
          {children}
        </TArrayFieldWithTable>
      </AccordionContent>
    </AccordionItem>
  );
}

// Example Usage
// <TArrayFieldWithTableAccordion type="edit" form={form}>
//   <TFormField
//     name="name_ar"
//     label={t("unit.form.name_ar")}
//     typeField="input"
//     readOnly={false}
//   />
//   <TFormField
//     name="name_en"
//     label={t("unit.form.name_en")}
//     typeField="input"
//     readOnly={false}
//   />
// </TArrayFieldWithTableAccordion>
