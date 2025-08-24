import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Coins, Dot, Save } from "lucide-react";
import { Form } from "@/components/ui/form";
import PopupHeader from "@/main/common/components/dialogHeader/PopupHeader";
import Loading from "@/main/common/components/loading/Loading";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { useTranslation } from "react-i18next";
import TTriggerForm from "@/main/common/components/TForm/triggerForm/TTriggerForm";
// import TextEditor from "@/main/common/components/TForm/TextEditor/TextEditor";

import { usePointsFormDialog } from "./hooks/usePointsFormDialog";
import { useGetClientPoints } from "@/main/global/api/restful/userManagmentAPI/clientsManager/clientsQuery";
import { useGetAllSettingsByKey } from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";

type Props = {
  unit?: any;
  type?: string;
  btn?: boolean;
  passedButton?: React.ReactNode;
};
export function UnitPointsDialog({
  unit,
  type,
  btn = true,
  passedButton,
}: Props) {
  const { data: points, refetch } = useGetClientPoints(unit?.clientId);

  const {
    open,
    setOpen,
    form,
    onSubmit,
    isLoading,
    fireOnClose,
    getHeaderForm,
  } = usePointsFormDialog({
    unit,
    type,
    refetch,
  });

  const { i18n, t } = useTranslation("carBrands");
  const { data: MAX_POINTS_PER_USE } = useGetAllSettingsByKey({
    set_key: "MAX_POINTS_PER_USE",
  });
  const { data: POINTS_SPENT_PER_SAR } = useGetAllSettingsByKey({
    set_key: "POINTS_SPENT_PER_SAR",
  });
  return (
    <>
      {type !== "delete" && (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <TTriggerForm
              passedButton={passedButton}
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
            className="min-h-50vh h-fit max-h-100vh-20px w-100vw-20px md:max-w-[757px] md:!p-8 "
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
                    <div className="flex flex-col items-start gap-2 w-full max-w-[693px]">
                      {/* Points Header */}
                      <div className="flex flex-row justify-center items-center gap-2 w-[157.38px] h-[37px]">
                        {/* Points Text */} <Coins className="text-[#C9972B]" />
                        <span className="flex items-center text-start capitalize font-cairo font-normal text-[18px] leading-[34px] text-[#5E5E5E]">
                          لديك{" "}
                          <span className="font-bold mx-1">
                            {points?.data ? points?.data : 0}
                          </span>{" "}
                          نقطة
                        </span>
                        {/* Points Icon */}
                      </div>
                      {/* Points Info */}
                      <div className="flex flex-col items-start w-full max-w-[693px] gap-0">
                        {/* <div className="flex items-center text-right font-cairo font-normal text-[16px] leading-[32px] text-[#6C757D] w-full">
                          <Dot /> الحد الأدنى لأستبدال النقاط هو 100 نقطه بما
                          يعادل 30 ريال.
                        </div> */}
                        <div className="flex items-center text-right font-cairo font-normal text-[16px] leading-[32px] text-[#6C757D] w-full">
                          <Dot /> الحد الأقصى للاستفادة من النقاط هو{" "}
                          {MAX_POINTS_PER_USE?.data.setValue} في المرة الواحدة.
                        </div>
                        <div className="flex items-center text-right font-cairo font-normal text-[16px] leading-[32px] text-[#6C757D] ">
                          <Dot /> يمكن الاستفادة من النقاط عن طريق دفع جزء من
                          مبلغ الإيجار او المبلغ كامل.
                        </div>
                      </div>
                    </div>

                    <div className="flex  md:flex-1 gap-3 ">
                      <TFormField
                        placeholder={t("من فضلك ادخل عدد النقاط")}
                        type="number"
                        typeField="input"
                        form={form}
                        name="pointsUsed"
                        onChange={(value: { target: { value: number } }) => {
                          const maxPoints =
                            Number(MAX_POINTS_PER_USE?.data?.setValue) || 0;
                          if (
                            typeof Number(value.target.value) === "number" &&
                            maxPoints &&
                            Number(value.target.value) <= maxPoints
                          ) {
                            form.setValue(
                              "pointsUsed",
                              Number(value.target.value)
                            );
                            form.setValue(
                              "amount",
                              Number(value.target.value) /
                                (typeof POINTS_SPENT_PER_SAR?.data?.setValue ===
                                "number"
                                  ? POINTS_SPENT_PER_SAR.data.setValue
                                  : Number(
                                      POINTS_SPENT_PER_SAR?.data?.setValue
                                    ) || 0)
                            );
                          }
                        }}
                        label={t("عدد النقاط")}
                        InputIcon
                        readOnly={type === "view"}
                      />{" "}
                      <TFormField
                        placeholder={t("")}
                        typeField="input"
                        form={form}
                        name="amount"
                        label={t("المبلغ")}
                        InputIcon="ر.س"
                        type="number"
                        className=" bg-[#EFEFEF] "
                        readOnly={true}
                      />
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
                          <p> {t("استخدام")}</p>
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
