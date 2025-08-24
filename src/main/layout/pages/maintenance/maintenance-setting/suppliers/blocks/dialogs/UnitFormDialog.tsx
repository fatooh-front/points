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
// import TFileField from "@/main/common/components/TForm/TFileField";

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
    // getHeaderForm,
    // file,
    // setFile,
  } = useUnitFormDialog({
    unit,
    type,
  });

  const { i18n } = useTranslation("carBrands");

  return (
    <>
      {type !== "delete" && (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <TTriggerForm type={type} addText={"إضافة مورد جديد"} btn={btn} />
          </DialogTrigger>
          <DialogContent
            isOverLay={open}
            onClose={fireOnClose}
            onInteractOutside={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            side={`${i18n.language === "ar" ? "right" : "left"}`}
            className="min-h-50vh h-fit max-h-100vh-20px w-100vw-20px md:max-w-[729px] md:!p-8 "
          >
            <div className="m-0 pb-4">
              <DialogHeader>
                <DialogTitle>
                  <PopupHeader title={"إضافة مورد جديد"} />
                </DialogTitle>
              </DialogHeader>
              {isLoading && <Loading />}
              {(type === "edit" ? !isLoading : true) && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col max-h-full gap-6 pt-3 h-100-31px"
                  >
                    <div className="flex flex-col md:flex-1 gap-y-3">
                      <TFormField
                        placeholder="اسم المورد"
                        typeField="input"
                        form={form}
                        name="supplierName"
                        label="اسم المورد"
                        readOnly={type === "view"}
                      />

                      <TFormField
                        placeholder="الهاتف"
                        typeField="input"
                        form={form}
                        name="phone"
                        label="الهاتف"
                        readOnly={type === "view"}
                      />

                      <TFormField
                        placeholder="رقم الواتس اب"
                        typeField="input"
                        form={form}
                        name="whatsapp"
                        label="رقم الواتس اب"
                        readOnly={type === "view"}
                      />

                      <TFormField
                        placeholder="العنوان"
                        typeField="input"
                        form={form}
                        name="address"
                        label="العنوان"
                        readOnly={type === "view"}
                      />

                      <TFormField
                        placeholder="البريد الإلكتروني"
                        typeField="input"
                        form={form}
                        name="email"
                        label="البريد الإلكتروني"
                        readOnly={type === "view"}
                      />

                      <TFormField
                        placeholder="معلومات إضافية"
                        typeField="textarea"
                        form={form}
                        name="notes"
                        label="معلومات إضافية"
                        readOnly={type === "view"}
                      />
                    </div>

                    {type !== "view" && (
                      <div className="flex w-full justify-end">
                        <TButton
                          type="submit"
                          className="flex items-center gap-2 w-[138px]"
                        >
                          <Save size={16} />
                          <p>حفظ</p>
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
