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
import GoogleMapPicker from "@/main/common/components/GoogleMapPicker";

type Props = {
  type?: string;
  btn?: boolean;
  data?: any;
};
export function UnitFormDialog({ data, type, btn = true }: Props) {
  const { open, setOpen, form, onSubmit, isLoading, fireOnClose } =
    useUnitFormDialog({
      data,
      type,
    });

  const { i18n, t } = useTranslation("carBrands");

  return (
    <>
      {type !== "delete" && (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <TTriggerForm type={type} addText={"اضافة موقع جديد"} btn={btn} />
          </DialogTrigger>
          <DialogContent
            isOverLay={open}
            onClose={fireOnClose}
            onInteractOutside={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            side={`${i18n.language === "ar" ? "right" : "left"}`}
            className="min-h-50vh h-fit max-h-100vh-20px w-100vw-20px md:max-w-[1489px] md:!p-8 "
          >
            <div className="m-0 pb-4">
              <DialogHeader>
                <DialogTitle>
                  <PopupHeader title={"إضافة موقع جديد"} />
                </DialogTitle>
              </DialogHeader>
              {isLoading && <Loading />}
              {(type === "edit" ? !isLoading : true) && (
                <Form {...form}>
                  <form className="flex flex-col max-h-full gap-6 pt-3  h-100-31px">
                    <div className=" flex w-full gap-6">
                      <div className="flex flex-col md:flex-1 gap-y-3 w-1/2 ">
                        <TFormField
                          placeholder={"الاسم"}
                          typeField="input"
                          form={form}
                          name={"arabicName"}
                          label={"الاسم"}
                          readOnly={type === "view"}
                        />{" "}
                        <div className=" mt-[24px]">
                          <TFormField
                            type="number"
                            placeholder={"النصف قطر"}
                            typeField="input"
                            form={form}
                            name={"radiusInMeters"}
                            label={"النصف قطر"}
                            readOnly={type === "view"}
                          />
                        </div>{" "}
                        <div className=" mt-[24px]">
                          <TFormField
                            type="number"
                            placeholder={"خط الطول"}
                            typeField="input"
                            form={form}
                            name={"longitude"}
                            label={"خط الطول"}
                            readOnly={type === "view"}
                          />
                        </div>{" "}
                        <div className=" mt-[24px]">
                          <TFormField
                            type="number"
                            placeholder={"خط العرض"}
                            typeField="input"
                            form={form}
                            name={"latitude"}
                            label={"خط العرض"}
                            readOnly={type === "view"}
                          />
                        </div>{" "}
                        <div className=" mt-[24px]">
                          <TFormField
                            type="number"
                            placeholder={"السعر"}
                            typeField="input"
                            form={form}
                            name={"price"}
                            label={"السعر"}
                            readOnly={type === "view"}
                          />
                        </div>{" "}
                      </div>
                      <div style={{ width: "50%", height: "100%" }}>
                        <GoogleMapPicker
                          setMarker={({ lat, lng }) => {
                            form.setValue("latitude", lat);
                            form.setValue("longitude", lng);
                          }}
                          marker={{
                            lat: form.watch("latitude") || 24.662898933839585,
                            lng: form.watch("longitude") || 46.72015157531366,
                          }}
                          onLocationSelect={(lat, lng) => {
                            form.setValue("latitude", lat);
                            form.setValue("longitude", lng);
                          }}
                        />
                      </div>
                    </div>

                    {type !== "view" && (
                      <div className="flex w-full justify-end">
                        <TButton
                          onClick={form.handleSubmit(onSubmit)}
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
