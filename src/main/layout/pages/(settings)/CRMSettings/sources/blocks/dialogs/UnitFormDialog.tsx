import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Save } from "lucide-react";
import { Form } from "@/components/ui/form";
import PopupHeader from "@/main/common/components/dialogHeader/PopupHeader";
import Loading from "@/main/common/components/loading/Loading";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { useTranslation } from "react-i18next";
import TTriggerForm from "@/main/common/components/TForm/triggerForm/TTriggerForm";
// import TextEditor from "@/main/common/components/TForm/TextEditor/TextEditor";

import { useUnitFormDialog } from "./hooks/useUnitFormDialog";

type Props = {
  unit?: any;
  type?: string;
  btn?: boolean;
};
export function UnitFormDialog({ unit, type, btn = true }: Props) {
  const {
    open,
    setOpen,
    form,
    onSubmit,
    isLoading,
    fireOnClose,
    getHeaderForm,
  } = useUnitFormDialog({
    unit,
    type,
  });

  const { i18n, t } = useTranslation("Type");

  return (
    <>
      {type !== "delete" && (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <TTriggerForm type={type} addText={"إضافة سبب"} btn={btn} />
          </DialogTrigger>
          <DialogContent
            isOverLay={open}
            onClose={fireOnClose}
            onInteractOutside={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            side={`${i18n.language === "ar" ? "right" : "left"}`}
            className="min-h-50vh h-fit max-h-100vh-20px w-100vw-20px md:max-w-[519px] md:!p-8 "
          >
            <div className="m-0 pb-4">
              <DialogHeader>
                <DialogTitle>
                  <PopupHeader title={getHeaderForm()} />
                </DialogTitle>
              </DialogHeader>
              {isLoading && <Loading />}
              {(type === "edit" ? !isLoading : true) && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col max-h-full gap-6 pt-3  h-100-31px"
                  >
                    <div className="flex flex-col md:flex-1 gap-y-3 ">
                      <TFormField
                        placeholder={t("Type.form.placeholder.name_en")}
                        typeField="input"
                        form={form}
                        name="englishName"
                        label="اسم السبب"
                        readOnly={type === "view"}
                      />{" "}
                      <div className=" mt-[24px]">
                        <TFormField
                          placeholder={t("Type.form.placeholder.name_ar")}
                          typeField="input"
                          form={form}
                          name="arabicName"
                          label="اسم السبب بالعربي"
                          readOnly={type === "view"}
                        />
                      </div>{" "}
                    </div>
                    {type !== "view" && (
                      <div className="flex w-full justify-end">
                        <TButton
                          type="submit"
                          className="flex items-center  gap-2 w-[138px] "
                          // disabled={isPending}
                        >
                          <Save size={16} />
                          <p> {"حفظ"}</p>
                        </TButton>
                      </div>
                    )}
                  </form>
                </Form>
              )}
              <DialogFooter>
                <DialogClose asChild></DialogClose>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
