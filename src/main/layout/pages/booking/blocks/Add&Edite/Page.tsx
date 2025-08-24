import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";

import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { DatePicker } from "@/components/ui/date_picker";
import CustomChechBox from "@/components/ui/custom_chech_box";
import MiniCalendarSVG from "@/main/global/assets/svg/MiniCalendarSVG";
import { useGetAllExtraServices } from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { UseAddOrEditReservationDataPage } from "./hooks/UseAddOrEditDataOfPage";
import { useGetAllBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
import { Reservation } from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingTypes";
import { formatDate } from "@/main/global/utils/dateUtils";
// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const { form, data, onChangeStatus, getAllowedOptions, isLoading } =
    UseAddOrEditReservationDataPage();
  const reservationDetails: {
    label: string;
    value: keyof Reservation;
    noBorder?: boolean;
    runder?: (data: any) => any;
  }[] = [
    { label: "المجموع الفرعي ", value: "subtotal" },
    { label: " خصم نقاط ", value: "pointsDiscount" },
    { label: " خصم برومو كود ", value: "promoDiscount" },
    { label: " خصم عضويات ", value: "memberShipDiscount" },
    { label: " اجمالي التوفير ", value: "totalDiscount" },
    { label: " رسوم ساعات اضافية ", value: "pointsDiscount" },

    { label: "رسوم ساعات الاضافية", value: "extraHoursCost" },
    { label: "رسوم تسليم في فرع اخر", value: "anotherBranchCost" },
    { label: "رسوم تسليم في مدينة اخر", value: "anotherBranchCost" },
    { label: "باقة الكيلومترات", value: "extraKmPackage" },
    { label: "تامين شامل", value: "insuranceValue" },
    // { label: " تامين التوفير", value: "755 ر.س" },
    { label: " اجمالي المبلغ", value: "total" },
    { label: "رسوم التوصل", value: "deliveryCost" }, //// ddddddddddddddddddddddddddddddddddddddddddddddddddddd

    { label: "رسم تسليم", value: "pickupCost", noBorder: true },
    {
      label: "رسم توصيل",
      value: "deliveryCost",
      runder: (data) =>
        data.deliveryCost || data.pickupCost
          ? data.deliveryCost + data.pickupCost
          : 0,
    },
  ];
  const {
    data: ExtraServices,
    isError: isErrorExtraServices,
    isLoading: isLoadingExtraServices,
  } = useGetAllExtraServices({});
  const { data: Branches } = useGetAllBranches();
  const branchesList = Branches?.data?.map((item: any) => ({
    value: item.branchId,
    label: item.branchArName,
  }));
  const isPickupToHome =
    form.watch("pickupLatitude") !== 0 || form.watch("pickupLatitude");
  const isDeliveryToHome =
    form.watch("deliveryLatitude") !== 0 || form.watch("deliveryLatitude");
  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form className="w-full mx-auto">
          <div className="flex w-full mx-auto overflow-hidden rounded-lg shadow-lg bg-white">
            <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
              {/* Row 1: Customer Info */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  readOnly
                  typeField="input"
                  type="string"
                  form={form}
                  name="clientName"
                  label="اسم العميل"

                  //placeholder="علاء عبدالقادر مصطفى"
                />{" "}
                <TFormField
                  readOnly
                  typeField="input"
                  type="string"
                  form={form}
                  name="clientMobile"
                  label="جوال العميل"
                  //placeholder="0122654862"
                />
              </div>

              {/* Row 2: Car Info */}
              <TFormField
                readOnly
                typeField="input"
                type="string"
                form={form}
                name="carName"
                label="اسم السيارة"
                //placeholder="اسم السيارة"
              />

              {/* Row 3: Rental Period */}
              <div className="flex flex-col md:flex-row gap-4">
                <DatePicker
                  form={form}
                  Icon={<MiniCalendarSVG color="#C9972B"></MiniCalendarSVG>}
                  className="h-[40px] mt-2"
                  name="startDate"
                  label="بداية الإيجار"
                  //placeholder="14/04/2025"
                />
                <DatePicker
                  Icon={<MiniCalendarSVG color="#C9972B"></MiniCalendarSVG>}
                  className="h-[40px] mt-2"
                  form={form}
                  name="endDate"
                  label="نهاية الإيجار"
                  //placeholder="16/06/2025"
                />
                <TFormField
                  readOnly
                  typeField="input"
                  type="number"
                  form={form}
                  name="days"
                  label="عدد أيام الإيجار"
                  //placeholder="34"
                />
              </div>

              {/* Row 4: Status + Type */}
              {/* start pickup delivery */}

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-2 ">
                  <TReactSelect
                    readOnly
                    name="deliveryType"
                    form={form}
                    label="النوع"
                    options={[
                      { value: "1", label: "الاستلام إلى المنزل" },
                      { value: "0", label: "الاستلام من الفرع" },
                    ]}
                  />
                </div>
                {isDeliveryToHome && form.watch("deliveryAddress") ? (
                  <div className=" ">
                    <TFormField
                      readOnly
                      type="string"
                      form={form}
                      name="deliveryAddress"
                      label="عنوان التوصيل"
                      //placeholder=""
                    />
                  </div>
                ) : null}
                {isDeliveryToHome ? (
                  <div className=" flex flex-1 gap-4">
                    <TReactSelect
                      readOnly
                      name="toBranchId"
                      form={form}
                      label="الاستلام من فرع"
                      options={branchesList}
                    />
                    <TFormField
                      readOnly
                      typeField="input"
                      type="string"
                      form={form}
                      name="googleMapUrlDelivery"
                      label="رابط جوجل ماب"
                      //placeholder="https://www.google.com/maps?;/"
                    />
                  </div>
                ) : (
                  <div className=" flex flex-1 gap-4">
                    <TReactSelect
                      readOnly
                      name="toBranchId"
                      form={form}
                      label="الاستلام من فرع"
                      options={branchesList}
                    />
                  </div>
                )}
              </div>
              {/* end pickup delivery */}
              {/* start pickup  */}

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-2 ">
                  <TReactSelect
                    readOnly
                    name="pickupType"
                    form={form}
                    label="النوع"
                    options={[
                      { value: "1", label: "التسليم إلى المنزل" },
                      { value: "0", label: "التسليم إلى الفرع" },
                    ]}
                  />
                </div>{" "}
                {isPickupToHome && form.watch("pickupAddress") ? (
                  <div className=" ">
                    <TFormField
                      readOnly
                      type="string"
                      form={form}
                      name="pickupAddress"
                      label="عنوان التسليم"
                      //placeholder=""
                    />
                  </div>
                ) : null}
                {isPickupToHome ? (
                  <div className=" flex flex-1 gap-4">
                    <TReactSelect
                      readOnly
                      name="fromBranchId"
                      form={form}
                      label="التسليم من فرع"
                      options={branchesList}
                    />{" "}
                    <TFormField
                      readOnly
                      typeField="input"
                      type="string"
                      form={form}
                      name="googleMapUrlPickup"
                      label="رابط جوجل ماب"
                      //placeholder="https://www.google.com/maps?;/"
                    />
                  </div>
                ) : (
                  <div className=" flex flex-1 gap-4">
                    <TReactSelect
                      readOnly
                      name="fromBranchId"
                      form={form}
                      label="التسليم من فرع"
                      options={branchesList}
                    />{" "}
                  </div>
                )}
              </div>
              {/* end pickup  */}

              {/* Row 5: Address */}
              <div className=" w-full flex items-end gap-4">
                {!isLoading && (
                  <TReactSelect
                    // readOnly
                    filterOption={(option: any) =>
                      option.value !== form.getValues("reservationStatus")
                    }
                    afterChange={(selectedOption) => {
                      onChangeStatus(selectedOption.selectedOption?.value);
                    }}
                    name="reservationStatus"
                    form={form}
                    label="حالة الحجز"
                    className="h-[40px]"
                    isClearable={false}
                    options={getAllowedOptions()}
                  />
                )}
              </div>

              {/* Row 6: Map Link */}

              {/* Row 7: Extra Services */}
              {isErrorExtraServices ? null : !isLoadingExtraServices ? (
                <div>
                  <p className="font-medium mb-2">الخدمات الإضافية</p>
                  <div className="flex flex-wrap gap-4">
                    {ExtraServices?.data
                      .map((item) => ({
                        value: item.serviceId,
                        label: item.nameArabic,
                      }))
                      .map(
                        (item) =>
                          form.watch(`serviceIds.${item.value}`) && (
                            <CustomChechBox
                              key={item.value}
                              form={form}
                              name={"checked"}
                              onChange={() => console.log("onChange")}
                              value={{ checked: true }}
                              label={`${item.label} - 200 ر.س`}
                            />
                          )
                      )}
                  </div>
                </div>
              ) : (
                <Skeleton className=" h-10"></Skeleton>
              )}

              {/* Row 8: Booking Details */}
              <div className="p-4 mt-4 border rounded-md shadow">
                <p className="text-lg font-semibold mb-2">تفاصيل الحجز</p>
                <ul className="text-sm space-y-2">
                  {reservationDetails.map((item, index) =>
                    data?.[item.value] ? (
                      <li
                        key={index}
                        className={`py-4 flex w-full justify-between ${
                          item.noBorder ? "" : "border-b"
                        }`}
                      >
                        <div>{item.label}</div>
                        <div>
                          {item.runder && <span>{item.runder(data)} </span>}
                          {!item.runder &&
                          data?.[item.value] instanceof Date ? (
                            <span>
                              {data?.[item.value]
                                ? formatDate(data?.[item.value]?.toString())
                                : null}
                            </span>
                          ) : (
                            <span>{data?.[item.value]?.toString() || ""}</span>
                          )}
                        </div>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>

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
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
