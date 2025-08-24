import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import Loading from "@/main/common/components/loading/Loading";
import Attachments from "@/main/common/components/TForm/attachments/Attachments";
import PopupHeader from "@/main/common/components/dialogHeader/PopupHeader";

type Props = {
  form: any;
  type?: string;
  isLoading?: boolean;
};

export default function AttachmentsSubForm({
  form,
  type,
  isLoading = false,
}: Props) {
  const { t } = useTranslation("attachmentsSubForm");

  // const attachments: any = [];
  return (
    <AccordionItem
      value="attachments-form"
      className="border rounded-lg shadow"
    >
      <AccordionTrigger className="px-4 hover:no-underline">
        <PopupHeader
          title={t("attachments.form.accordion.trigger")}
          className="text-xl text-gray-500"
        />
      </AccordionTrigger>
      <AccordionContent className="p-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Attachments
              form={form}
              name="attachments"
              // disabled={}
              readOnly={type === "view"}
              // defaultValue={attachments}
              maxFiles={5}
              maxFileSize={5 * 1024 * 1024}
              allowedTypes={[
                "image/*",
                "video/*",
                "audio/*",
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.oasis.opendocument.spreadsheet",
                "application/vnd.ms-powerpoint",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "application/vnd.oasis.opendocument.presentation",
                "text/csv",
                "text/plain",
                "text/html",
                "application/json",
              ]}
            />
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

{
  /* <Accordion
  type="multiple"
  value={expandedItems}
  onValueChange={setExpandedItems}
  className="w-full flex flex-col gap-4"
></Accordion>; */
}

{
  /* <AccordionItem
value="procedure-top-form"
className="border rounded-lg shadow"
>
<AccordionTrigger className="px-4 hover:no-underline">
  <PopupHeader
    title={t("procedureTop.form.accordion.trigger")}
    className="text-xl text-gray-500"
  />
</AccordionTrigger>
<AccordionContent className="">
  <div className="p-4">
  </div>
</AccordionContent>
</AccordionItem> */
}

// const {
//   expandedItems,
//   setExpandedItems,
//   handleExpandAll,
//   handleCollapseAll,
//   handleExpandReset,
// } = useMultiAccordionControl({
//   defaultExpandedItems: ["procedure-top-form"],
//   items: ["procedure-top-form", "reference-range-form"],
// });

{
  /* <TMultiAccordionControl
handleCollapseAll={handleCollapseAll}
handleExpandAll={handleExpandAll}
/> */
}

{
  /* <div className="flex gap-5 items-end">
<PopupHeader title={getHeaderForm()} />
<TMultiAccordionControl
  handleCollapseAll={handleCollapseAll}
  handleExpandAll={handleExpandAll}
/>
</div> */
}

// onClose={() => {
//   fireOnClose();
//   handleExpandReset();
// }}

{
  /* <AttachmentsSubForm
form={form}
type={type}
isLoading={isLoading}
/> */
}
