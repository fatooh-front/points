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
import CustomChechBox from "@/components/ui/custom_chech_box";
import TFileField from "@/main/common/components/TForm/TFileField";
import { useState } from "react";

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

  const [file, setFile] = useState<File | null>(null);
  console.log("file", form.getValues("icon"));

  return (
    <>
      {type !== "delete" && (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <TTriggerForm
              type={type}
              addText={t("Type.form.addText")}
              btn={btn}
            />
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
                    {" "}
                    <TFileField
                      form={form}
                      name={"icon"}
                      type={"image"}
                      file={file}
                      setFile={setFile}
                      rounded={"full"}
                      label={""}
                      // labelDrag={t("banners.dialog.add.dragActive")}
                      // labelReplace={t("banners.dialog.add.changeImage")}
                      classNameRootProps={"p-1"}
                      containerClassName={"w-[100px] h-[100px]"}
                    />{" "}
                    <div className="flex flex-col md:flex-1 gap-y-3 ">
                      <TFormField
                        placeholder={t("Type.form.placeholder.name_en")}
                        typeField="input"
                        form={form}
                        name="englishName"
                        label={t("Type.form.name_en")}
                        readOnly={type === "view"}
                      />{" "}
                      <div className=" mt-[24px]">
                        <TFormField
                          placeholder={t("Type.form.placeholder.name_ar")}
                          typeField="input"
                          form={form}
                          name="arabicName"
                          label={t("Type.form.name_ar")}
                          readOnly={type === "view"}
                        />
                      </div>{" "}
                      <div className=" mt-[24px] flex gap-3">
                        <CustomChechBox
                          form={form}
                          label={"توصيل مجاني"}
                          name="freeDelivery"
                        ></CustomChechBox>
                        <CustomChechBox
                          form={form}
                          label={t("ممنوع على الأجانب")}
                          name="forbiddenToForeigners"
                        ></CustomChechBox>
                        {/* <TextEditor
                          form={form}
                          name="notes"
                          placeholder={t("Type.form.placeholder.notes")}
                          label={t("Type.form.notes")}
                          readOnly={type === "view"}
                        /> */}
                      </div>
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
