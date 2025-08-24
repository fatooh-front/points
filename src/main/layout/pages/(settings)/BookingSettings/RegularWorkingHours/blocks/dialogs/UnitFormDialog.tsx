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
import { Input } from "@/components/ui/input";
import { WorkingHours } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsTypes";

type Props = {
  unit: {
    day: string;
    Closekey: string;
    Openkey: string;
    status: string;
    [key: string]: string | number;
  };
  allDays: WorkingHours;
  type?: string;
  btn?: boolean;
  refetchWorkinghours: any;
};
export function UnitFormDialog({
  refetchWorkinghours,
  unit,
  allDays,
  type,
  btn = true,
}: Props) {
  const { open, setOpen, form, onSubmit, isLoading, fireOnClose } =
    useUnitFormDialog({
      allDays,
      type,
      refetchWorkinghours,
    });

  const { i18n, t } = useTranslation("carBrands");

  return (
    <>
      {type !== "delete" && (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <TTriggerForm
              type={type}
              addText={t("carBrands.form.addText")}
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
                  <PopupHeader title={"تعديل التوقيت"} />
                </DialogTitle>
              </DialogHeader>
              {isLoading && <Loading />}
              {(type === "edit" ? !isLoading : true) && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col max-h-full gap-6 pt-3  h-100-31px"
                  >
                    <div>
                      <p className=" text-[#8E8E8E]">اليوم</p>
                      <Input
                        value={unit?.day}
                        name={`${unit[unit?.Openkey]}`}
                        readOnly={true}
                        className="mt-2 bg-[#F3F3F3]"
                      />{" "}
                    </div>
                    <div className="flex flex-col md:flex-1 gap-y-3 ">
                      <TFormField
                        type="number"
                        placeholder={"إبتداء الساعة"}
                        typeField="input"
                        form={form}
                        name={unit?.Openkey}
                        label={"إبتداء الساعة"}
                        readOnly={type === "view"}
                      />{" "}
                      <div className=" mt-[24px]">
                        <TFormField
                          type="number"
                          placeholder={"إنتهاء الساعة"}
                          typeField="input"
                          form={form}
                          name={unit?.Closekey}
                          label={"إنتهاء الساعة"}
                          readOnly={type === "view"}
                        />
                      </div>{" "}
                      <div className=" mt-[24px]">
                        {/* <TextEditor
                          form={form}
                          name="notes"
                          placeholder={t("carBrands.form.placeholder.notes")}
                          label={t("carBrands.form.notes")}
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
                          <p> {t("carBrands.form.save")}</p>
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
