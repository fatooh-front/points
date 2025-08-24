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
// import "react-timeit/dist/index.css";

import { useUnitFormDialog } from "./hooks/useUnitFormDialog";
import { WorkingHours } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsTypes";

import { Timeit } from "@/components/ui/Timeit";
import { Switch } from "@/components/ui/switch";
import { DefaultWorkingHours } from "../../DefaultWorkingHours";
// import CustomChechBox from "@/components/ui/custom_chech_box";
// import { useGetAllBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";

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
  refetch: any;
};
export function UnitFormDialog({
  unit,
  allDays,
  type,
  btn = true,
  refetch,
}: Props) {
  // const { data: branchesData } = useGetAllBranches();
  const { open, setOpen, form, onSubmit, isLoading, fireOnClose } =
    useUnitFormDialog({
      unit,
      allDays,
      type,
      refetch,
    });
  console.log("sdssdswerwerwerdsallDays", allDays);

  const { i18n, t } = useTranslation("carBrands");

  return (
    <>
      {type !== "delete" && (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <TTriggerForm type={type} addText={" إضافة فترة جديدة"} btn={btn} />
          </DialogTrigger>
          <DialogContent
            isOverLay={open}
            onClose={fireOnClose}
            onInteractOutside={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            side={`${i18n.language === "ar" ? "right" : "left"}`}
            className="min-h-50vh overflow-x-hidden h-fit  max-h-100vh-20px w-100vw-20px md:max-w-[1000px] md:!p-8 "
          >
            <div className="m-0 pb-4 ">
              <DialogHeader>
                <DialogTitle>
                  <PopupHeader title={"تعديل التوقيت"} />
                </DialogTitle>
              </DialogHeader>
              {isLoading && <Loading />}
              {(type === "edit" ? !isLoading : true) && (
                <Form {...form}>
                  <form
                    onClick={() => console.log("form", form.getValues())}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex  flex-col max-h-full gap-6 pt-3  h-100-31px"
                  >
                    <TFormField
                      placeholder={"اسم الفترة"}
                      typeField="input"
                      form={form}
                      name="hourName"
                      label={"اسم الفترة"}
                      readOnly={type === "view"}
                    />{" "}
                    <div className=" ">
                      <p className=" h-[26px] ">تمت إضافتهم</p>
                      <table className="  h- border rounded-sm w-full h-full text-center border-separate border-spacing-y-4">
                        <thead>
                          <tr className=" pt-6 ">
                            <th className="w-[120px] pt-5">اليوم</th>
                            <th className="w-[120px] pt-5">بداية التوقيت</th>
                            <th className="w-[120px] pt-5">نهاية التوقيت</th>
                            <th className="w-[80px]"></th>{" "}
                          </tr>
                        </thead>
                        <tbody>
                          {DefaultWorkingHours.map((DefaultWorkingHours) => (
                            <tr key={DefaultWorkingHours.day} className="  ">
                              {" "}
                              <td className=" !border-t pt-5">
                                {DefaultWorkingHours.day}
                              </td>
                              <td className=" !border-t pt-5">
                                <div className="flex items-center justify-center gap-2">
                                  <Timeit
                                    hourValue={String(
                                      form.watch(
                                        DefaultWorkingHours.Openkey as any
                                      ) ?? ""
                                    )}
                                    minuteValue={String(
                                      form.watch(
                                        DefaultWorkingHours.OpenMin as any
                                      ) ?? ""
                                    )}
                                    onChange={(hour, minute) => {
                                      form.setValue(
                                        DefaultWorkingHours.Openkey as any,
                                        hour
                                      );
                                      form.setValue(
                                        DefaultWorkingHours.OpenMin as any,
                                        minute
                                      );
                                    }}
                                  />
                                </div>
                              </td>
                              <td className=" !border-t pt-5">
                                <div className="flex items-center justify-center gap-2">
                                  <Timeit
                                    hourValue={String(
                                      form.watch(
                                        DefaultWorkingHours.Closekey as any
                                      ) ?? ""
                                    )}
                                    minuteValue={String(
                                      form.watch(
                                        DefaultWorkingHours.CloseMin as any
                                      ) ?? ""
                                    )}
                                    onChange={(hour, minute) => {
                                      form.setValue(
                                        DefaultWorkingHours.Closekey as any,
                                        hour
                                      );
                                      form.setValue(
                                        DefaultWorkingHours.CloseMin as any,
                                        minute
                                      );
                                    }}
                                  />
                                </div>
                              </td>
                              <td className=" !border-t">
                                <Switch
                                  dir="ltr"
                                  checked={form.watch(
                                    DefaultWorkingHours.status as any
                                  )}
                                  onCheckedChange={(checked) => {
                                    form.setValue(
                                      DefaultWorkingHours.status as any,
                                      checked ? 1 : 0
                                    );
                                  }}
                                ></Switch>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>{" "}
                    {type !== "view" && (
                      <div className="flex w-full mt-5 justify-end">
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
