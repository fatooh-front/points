import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import PopupHeader from "@/main/common/components/dialogHeader/PopupHeader";
import Loading from "@/main/common/components/loading/Loading";
import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import TButton from "@/main/common/components/TForm/TButton";
import TFormField from "@/main/common/components/TForm/TFormField";
import TTriggerForm from "@/main/common/components/TForm/triggerForm/TTriggerForm";
import { Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import TDateTimePacker from "../../../TDateTimePacker";
import TextEditor from "../../../TextEditor/TextEditor";
import { useCurdFormDialog } from "./hooks/useCurdFormDialog";
import { Field, OptionFields } from "./utils/fieldsTypes";
import TReactSelect from "../../TReactSelect";

type Props = {
  item?: any;
  type?: string;
  btn?: boolean;
  addMutate?: any;
  addIsPending?: boolean;
  updateMutate?: any;
  updateIsPending?: boolean;
  deleteMutate?: any;
  deleteIsPending?: boolean;
  fields?: Field[];
  label?: string | number;
  isFemale?: boolean;
  optionFields?: OptionFields;
};

export function CurdFormDialog({
  item,
  type,
  btn = false,
  addMutate,
  addIsPending = false,
  updateMutate,
  updateIsPending = false,
  deleteMutate,
  deleteIsPending = false,
  fields: passedFields,
  label,
  isFemale,
  optionFields,
}: Props) {
  const { i18n, t } = useTranslation("curd");

  const fields = passedFields || [
    {
      name: "name_ar",
      label: t("curd.form.name_ar"),
      type: "text",
      required: true,
    },
    {
      name: "name_en",
      label: t("curd.form.name_en"),
      type: "text",
      required: true,
    },
  ];

  const {
    open,
    setOpen,
    form,
    onSubmit,
    isLoading,
    fireOnClose,
    isPending,
    getHeaderForm,
  } = useCurdFormDialog({
    item,
    type,
    addMutate,
    addIsPending,
    updateMutate,
    updateIsPending,
    fields,
    label,
    isFemale,
    optionFields,
  });

  return (
    <>
      {type === "delete" && item?.[optionFields?.value || "id"] && (
        <TDeleteDialog
          id={item?.[optionFields?.value || "id"]}
          mutate={deleteMutate}
          isPending={deleteIsPending}
        />
      )}
      {type !== "delete" && (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <TTriggerForm
              type={type}
              addText={t("curd.form.addText")}
              btn={btn}
            />
          </DialogTrigger>
          <DialogContent
            isOverLay={open}
            onClose={fireOnClose}
            onInteractOutside={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            side={`${i18n.language === "ar" ? "right" : "left"}`}
            className="min-h-50vh h-fit max-h-100vh-20px w-100vw-20px md:max-w-[580px]"
          >
            <div className="m-0 p-0">
              <DialogHeader>
                <DialogTitle>
                  <PopupHeader title={getHeaderForm()} />
                </DialogTitle>
              </DialogHeader>
              {isLoading && <Loading />}
              {(type === "edit" ? !isLoading : true) && (
                <Form {...form}>
                  <form className="flex flex-col max-h-full gap-6 pt-3 h-100-31px">
                    <div className="flex flex-col md:flex-1 gap-y-3">
                      <div className="grid grid-cols-1 xs:grid-cols-2 justify-between gap-5">
                        {fields
                          ?.filter(
                            (field) =>
                              field.type !== "textarea" &&
                              field.type !== "textEditor" &&
                              field.type !== "Select" &&
                              field.type !== "date"
                          )
                          .map((field, index) => (
                            <TFormField
                              key={`${field.name}${index}`}
                              typeField={"input"}
                              type={field.type}
                              form={form}
                              name={field.name}
                              label={field.label}
                              readOnly={type === "view"}
                            />
                          ))}
                        {fields
                          ?.filter((field) => field.type === "date")
                          ?.map((field, index) => (
                            <TDateTimePacker
                              key={`${field.name}${index}`}
                              form={form}
                              name={field.name}
                              label={field.label}
                              readOnly={type === "view"}
                              granularity={field?.granularity}
                              // fromItemClassName="xs:w-1/2-0.625rem"
                            />
                          ))}
                        {fields
                          ?.filter((field) => field.type === "Select")
                          ?.map((field, index) => (
                            <TReactSelect
                              key={`${field.name}${index}`}
                              form={form}
                              name={field.name}
                              label={field.label}
                              options={field?.options ? field?.options : []}
                              readOnly={type === "view"}
                              granularity={field?.granularity}
                            />
                          ))}
                      </div>
                      <div className="grid grid-cols-1 justify-between gap-5 w-full">
                        {fields
                          ?.filter((field) => field.type === "textarea")
                          ?.map((field, index) => (
                            <TFormField
                              key={`${field.name}${index}`}
                              typeField={"textarea"}
                              type={field.type}
                              form={form}
                              name={field.name}
                              label={field.label}
                              readOnly={type === "view"}
                            />
                          ))}
                      </div>
                      <div className="grid grid-cols-1 justify-between gap-5 w-full">
                        {fields
                          ?.filter((field) => field.type === "textEditor")
                          ?.map((field, index) => (
                            <TextEditor
                              key={`${field.name}${index}`}
                              typeField={"textEditor"}
                              form={form}
                              name={field.name}
                              label={field.label}
                              readOnly={type === "view"}
                            />
                          ))}
                      </div>
                    </div>
                    {type !== "view" && (
                      <TButton
                        type="submit"
                        className="flex items-center gap-2 w-full"
                        disabled={isPending}
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        <Save size={16} />
                        <p>{t("curd.form.save")}</p>
                      </TButton>
                    )}
                  </form>
                </Form>
              )}
              <DialogFooter>
                <DialogClose asChild />
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
