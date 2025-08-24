import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";

import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { UseAddOrEditReservationDetails } from "./hooks/UseAddOrEditDataOfPage";

import Airport from "./blocks/Airport";
import AnotherLocation from "./blocks/AnotherLocation";
import Hours from "./blocks/Hours";
import Fullday from "./blocks/Fullday";
import { ReservationDetails } from "./blocks/Details";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const { form, onSubmit, getAllowedOptions, onChangeStatus } =
    UseAddOrEditReservationDetails();

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full mx-auto  rounded-lg shadow-lg bg-white">
            <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
              {/* Row 1: Customer Info */}
              <div className="flex flex-col md:flex-row gap-4">
                {" "}
                <TFormField
                  readOnly={true}
                  typeField="input"
                  type="string"
                  form={form}
                  name="clientFirstName"
                  label="اسم العميل"
                  placeholder="علاء عبدالقادر مصطفى"
                />
                <TFormField
                  readOnly={true}
                  typeField="input"
                  type="string"
                  form={form}
                  name="mobile"
                  label="جوال العميل"
                  placeholder="0122654862"
                />
              </div>
              {/* Row 2: Car Info */}{" "}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  readOnly={true}
                  typeField="input"
                  type="string"
                  form={form}
                  name="carName"
                  label="اسم السيارة"
                  placeholder="اسم السيارة"
                />
                <TReactSelect
                  readOnly={true}
                  name="reservationType"
                  form={form}
                  label="نوع الحجز"
                  options={[
                    { value: "AIRPORT", label: "مطار" },
                    { value: "OTHER_PLACES", label: "اماكن اخري" },

                    { value: "HOURLY", label: "ساعة" },
                    { value: "DAILY", label: "يوم كامل" },
                  ]}
                />
              </div>
              {(() => {
                const reservationType = form.watch?.("reservationType");
                return (
                  <>
                    {reservationType === "AIRPORT" && (
                      <Airport
                        getAllowedOptions={getAllowedOptions}
                        onChangeStatus={onChangeStatus}
                        form={form}
                      />
                    )}
                    {reservationType === "OTHER_PLACES" && (
                      <AnotherLocation
                        getAllowedOptions={getAllowedOptions}
                        onChangeStatus={onChangeStatus}
                        form={form}
                      />
                    )}
                    {reservationType === "HOURLY" && (
                      <Hours
                        getAllowedOptions={getAllowedOptions}
                        onChangeStatus={onChangeStatus}
                        form={form}
                      />
                    )}
                    {reservationType === "DAILY" && (
                      <Fullday
                        getAllowedOptions={getAllowedOptions}
                        onChangeStatus={onChangeStatus}
                        form={form}
                      />
                    )}
                  </>
                );
              })()}
            </div>{" "}
          </div>{" "}
          {form.watch("reservationType") && (
            <div className="flex w-full mx-auto overflow-hidden rounded-lg mt-4 shadow-lg bg-white">
              {/* Row 8: Booking Details */}
              <ReservationDetails data={form.watch() as any} />
            </div>
          )}
          {/* Submit Button */}
          {/* <div className="flex w-full justify-end mt-6">
            <TButton
              type="reset"
              onClick={() => form.reset()}
              className="flex items-center mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
            >
              إلغاء
            </TButton>
            <TButton
              type="submit"
              className="flex items-center gap-2 w-[138px]"
            >
              <Save size={16} />
              <p>{t("CarBranch.form.save")}</p>
            </TButton>
          </div> */}
        </form>
      </Form>
    </div>
  );
};

export default Page;
