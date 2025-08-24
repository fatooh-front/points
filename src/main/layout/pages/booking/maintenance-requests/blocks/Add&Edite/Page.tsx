import { Form } from "@/components/ui/form";

import TButton from "@/main/common/components/TForm/TButton";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { Skeleton } from "@/components/ui/skeleton";
import TFormField from "@/main/common/components/TForm/TFormField";
import { UseAddOrEditMaintenanceRequest } from "./hooks/UseAddOrEditDataOfPage";
import BookingManager from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingManager";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const { form, onSubmit, isLoading, refetch, onReset } =
    UseAddOrEditMaintenanceRequest();

  return (
    <div
      onClick={() => {
        console.log(form.getValues());
        console.log(form.control._formState.errors);
      }}
      className="box-border  2xl:text-[200px]  w-full flex items-center flex-col min-h-dvh-64px "
    >
      {!isLoading ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full mx-auto"
          >
            <div className="flex p-6   md:h-full  w-full mx-auto  rounded-lg shadow-lg  bg-white">
              <div className=" grid grid-cols-3 gap-4 w-full">
                <TReactSelect
                  readOnly
                  form={form}
                  name="reqStatus"
                  label="حالة الطلب"
                  options={[
                    { value: 1, label: "قيد الانتظار" },
                    { value: 2, label: "مؤكد" },
                    { value: 3, label: "مكتمل" },
                    { value: 4, label: "ملغي" },
                  ]}
                />
                <TFormField
                  readOnly
                  form={form}
                  name="carName"
                  label="اسم السيارة"
                />
                <TFormField
                  readOnly
                  form={form}
                  name="clientName"
                  label="اسم العميل"
                />
                <TFormField form={form} name="clientPhone" label="رقم العميل" />
                <TFormField
                  readOnly
                  form={form}
                  name="rqDate"
                  label="تاريخ الطلب"
                  // type="date"
                />
                <TFormField
                  readOnly
                  form={form}
                  name="finishDate"
                  label="تاريخ الانتهاء"
                  // type="date"
                />
                <TFormField
                  typeField="textarea"
                  readOnly
                  form={form}
                  name="reqComments"
                  label=" تفاصيل الطلب"
                  multiline
                />
                {form.watch("reqStatus") == 2 ||
                form.watch("reqStatus") == 3 ? (
                  <TFormField
                    typeField="textarea"
                    readOnly={form.watch("reqStatus") === 3}
                    form={form}
                    className={
                      form.watch("reqStatus") === 2 ? " border-green-400" : ""
                    }
                    name="finishComments"
                    label="تفاصيل الانتهاء"
                    multiline
                  />
                ) : null}
              </div>
            </div>
            {form.watch("reqId") && form.watch("reqStatus") === 1 ? (
              <div className="flex w-full justify-end mt-6">
                {" "}
                <TButton
                  type="reset"
                  onClick={() =>
                    BookingManager.addMaintenanceRequestsReject(
                      form.getValues("reqId")?.toString() ?? ""
                    ).then(() => {
                      refetch();
                      onReset();
                    })
                  }
                  className="flex  text-[#E52B2E] items-center mx-4 gap-2 w-[138px] bg-white border border-[#E52B2E] hover:bg-gray-100 "
                >
                  رفض الطلب
                </TButton>
                <TButton
                  onClick={() =>
                    BookingManager.addMaintenanceRequestsApprove(
                      form.getValues("reqId")?.toString() ?? ""
                    ).then(() => {
                      refetch();
                      onReset();
                    })
                  }
                  type="reset"
                  className="flex items-center bg-[#7AAA81]  hover:bg-[#7AAA81] hover:opacity-75  gap-2 w-[138px] "
                  // disabled={isPending}
                >
                  <p> قبول الطلب</p>
                </TButton>
                {/* <TButton
                  type="submit"
                  className="flex items-center  gap-2 w-[138px] "
                  // disabled={isPending}
                >
                  <Save size={16} />
                  <p> {t("carsYear.form.save")}</p>
                </TButton> */}
              </div>
            ) : null}
            {form.watch("reqStatus") === 2 && (
              <div className="flex w-full justify-end mt-6">
                <TButton
                  onClick={() =>
                    BookingManager.addMaintenanceRequestsFinish(
                      form.getValues("reqId")?.toString() ?? "",
                      form.getValues("finishComments")
                    ).then(() => {
                      refetch();
                      onReset();
                    })
                  }
                  type="reset"
                  className="flex items-center bg-primary  hover:bg-[#7AAA81] hover:opacity-75  gap-2 w-[138px] "
                  // disabled={isPending}
                >
                  <p>إنهاء الطلب</p>
                </TButton>{" "}
              </div>
            )}
          </form>
        </Form>
      ) : (
        <div className=" w-full h-screen">
          <Skeleton className=" h-20 mb-4 w-full "></Skeleton>
          <Skeleton className=" h-20 mb-4 w-full "></Skeleton>
          <Skeleton className=" h-20 mb-4 w-full "></Skeleton>
          <Skeleton className=" h-20 mb-4 w-full "></Skeleton>
          <Skeleton className=" h-20 mb-4 w-full "></Skeleton>
          <Skeleton className=" h-20 mb-4 w-full "></Skeleton>
          <Skeleton className=" h-20 mb-4 w-full "></Skeleton>
          <Skeleton className=" h-20 mb-4 w-full "></Skeleton>
          <Skeleton className=" h-20 mb-4 w-full "></Skeleton>
        </div>
      )}
    </div>
  );
};

export default Page;
