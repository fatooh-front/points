import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";

import CalendarSVG from "@/main/global/assets/svg/CalendarSVG";
import { UnitFormDialog } from "./blocks/dialogs/UnitFormDialog";
import ExtraServices from "./blocks/ExtraServices/ExtraServices";
// import PreventedCarOnForeigners from "./blocks/prevented-car-on-foreigners/PreventedCarOnForeigners";
import {
  useAddSettings,
  useDeleteCustomLocations,
  useGetAllCustomLocations,
  useGetAllSettings,
} from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";
import { TDeleteDialog } from "@/main/common/components/TForm/delete/TDeleteDialog";
import { useSettingsForm } from "./hooks/UseAddOrEditDataOfPage";
import TFormNumberField from "@/main/common/components/TForm/TFormNumberField";

const Page = () => {
  const { data: CustomLocations } = useGetAllCustomLocations({});
  const { mutate: mutateDeleteCustomLocation } = useDeleteCustomLocations();
  const { data: defaultData } = useGetAllSettings({});
  const { mutate: mutateAdd } = useAddSettings();
  const { t } = useTranslation("CarBranch");

  const { form, onSubmit } = useSettingsForm({
    data: defaultData?.data || [],
    onSave: (data) =>
      mutateAdd(data, {
        onSuccess: () => {},
      }),
  });

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form
          className="w-full mx-auto gap-6 flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Section 1: Car Reservation Settings */}
          <div className="rounded-lg shadow-lg bg-white p-6 mb-4">
            <div className="font-bold text-lg mb-6 text-[#162A2B]">
              إعدادات حجز السيارة
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <TFormField
                labelClassName="text-base "
                form={form}
                label="عدد أيام الحجز للحصول على التوصيل المجاني"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="أيام"
                name="NUM_DAYS_FOR_FREE_DELIVERY"
              />
              <TFormField
                labelClassName="text-base"
                form={form}
                label="تكلفة تسليم السيارة في فرع آخر"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="ر.س"
                name="COST_PRICE_DELIVERY_CAR_AT_ANOTHER_BRANCH"
              />
              <TFormField
                labelClassName="text-base"
                form={form}
                label="تكلفة تسليم السيارة في مدينة أخرى"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="ر.س"
                name="COST_PRICE_DELIVERY_CAR_AT_ANOTHER_CITY"
              />
              <TFormField
                labelClassName="text-base"
                form={form}
                label="نسبة مقدم الحجز من إجمالي المبلغ"
                type="number"
                inputProps={{ min: 0, max: 100 }}
                InputIcon="%"
                name="DOWN_PAYMENT_PERCENTAGE_OF_THE_TOTAL_AMOUNT"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <TFormField
                labelClassName="text-base"
                form={form}
                label="عدد الساعات المسموح بها للحجز من الفرع"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="ساعة"
                name="NUM_HOURS_FOR_START_RESERVATION_FROM_BRANCH"
              />
              <TFormField
                labelClassName="text-base"
                form={form}
                label="عدد الساعات المسموح بها لتسليم الي المنزل"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="ساعة"
                name="MAX_DISTANCEKM_FOR_NEAR_BRANCH"
              />
              <TFormField
                labelClassName="text-base"
                form={form}
                label="عدد الساعات المسموح بها لحجز الليموزين "
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="ساعة"
                name="NUM_HOURS_FOR_START_RESERVATION_LIMOUSINE"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TFormField
                labelClassName="text-base"
                form={form}
                label="عدد الساعات الإضافية المجانية للحجز "
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="ساعة"
                name="NUM_HOURS_FOR_FREE_RESERVATION"
              />
              <TFormField
                labelClassName="text-base"
                form={form}
                label="عدد ساعات التأخير لتحسب يوم كامل"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="ساعة"
                name="NUM_DELAYS_HOURS_FOR_FULL_DAY"
              />
            </div>
          </div>
          {/* Section 2: Services */}
          <ExtraServices></ExtraServices>
          {/* Section 3: Car Types Not Allowed for Test Drive */}
          {/* <PreventedCarOnForeigners></PreventedCarOnForeigners> */}
          {/* Section 4: Delivery Settings */}
          <div className="rounded-lg shadow-lg bg-white p-6 mb-4">
            <div className="font-bold text-lg mb-6 text-[#162A2B]">
              إعدادات التوصيل
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <TFormNumberField
                labelClassName="text-base"
                form={form}
                label="رقم النسخة"
                type="number"
                inputProps={{ min: 0 }}
                name="VERSION_NUMBER"
              />
              <TFormNumberField
                labelClassName="text-base"
                form={form}
                label="أقل عدد أيام للحجز"
                type="number"
                inputProps={{ min: 0 }}
                name="MIN_DAYS_RESERVATION"
              />
              <TFormNumberField
                labelClassName="text-base"
                form={form}
                label="اكثر عدد أيام للحجز"
                type="number"
                inputProps={{ min: 0 }}
                name="MAX_DAYS_RESERVATION"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TFormNumberField
                labelClassName="text-base"
                form={form}
                label="سعر الكيلومتر للتوصيل "
                type="number"
                inputProps={{ min: 0 }}
                name="PRICE_FOR_EACH_KM"
              />
              <TFormNumberField
                labelClassName="text-base"
                form={form}
                label=" اكثر عدد كيلومترات للتوصيل"
                type="number"
                inputProps={{ min: 0 }}
                name="MAX_KM_FOR_DELIVERYCAR"
              />
              <TFormNumberField
                labelClassName="text-base"
                form={form}
                label=" اقل مبلغ للتوصيل"
                type="number"
                inputProps={{ min: 0 }}
                name="MIN_DELIVERY_AMOUNT"
              />
            </div>
          </div>
          {/* Interactive Google Map: Click to get coordinates */}
          <div className="   rounded-lg shadow-lg bg-white p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-lg mb-6 text-[#162A2B]">
                إضافة موقع محدد
              </p>

              <UnitFormDialog type="add"></UnitFormDialog>
            </div>
            <p className=" h-[26px]">تمت إضافتهم</p>
            {CustomLocations?.data.length < 0 ? (
              <div>
                <div className="flex w-full items-center justify-center h-full">
                  <CalendarSVG></CalendarSVG>
                </div>
                <p className=" h-[26px] w-full justify-center text-center">
                  لا توجد مواقع مضافة حتى الآن{" "}
                </p>
              </div>
            ) : (
              <div className="border mt-8 border-[#D0DADE] rounded-md p-4">
                {CustomLocations?.data?.map((Location: any) => (
                  <div
                    key={Location.serviceId}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <span className="w-1/3 text-start py-2">
                      {Location.arabicName}
                    </span>{" "}
                    <span className="w-1/3 text-start py-2 px-2 ">
                      {Location.price} ر.س
                    </span>{" "}
                    <div className="flex items-center gap-2">
                      <UnitFormDialog
                        data={Location}
                        type="edit"
                      ></UnitFormDialog>
                      <TDeleteDialog
                        id={Location.id}
                        mutate={mutateDeleteCustomLocation}
                        isAllow={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>{" "}
          {/* <div style={{ width: "100%", height: 450 }}>
            <GoogleMapPicker
              onLocationSelect={(lat, lng) =>
                console.log(`Selected Location: ${lat}, ${lng}`)
              }
            />
          </div> */}
          {/* Save Button */}
          <div className="flex w-full justify-end mt-6">
            {" "}
            <TButton
              type="reset"
              onClick={() => form.reset()}
              className="flex items-center mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
            >
              إلغاء
            </TButton>
            <TButton
              type="button"
              className="flex items-center gap-2 w-[138px]"
              onClick={form.handleSubmit(onSubmit)}
            >
              <Save size={16} />
              <p>{t("CarBranch.form.save")}</p>
            </TButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
