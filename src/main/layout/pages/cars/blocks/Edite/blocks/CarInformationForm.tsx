import TFormField from "@/main/common/components/TForm/TFormField";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import type { FormType } from "../hooks/UseAddOrEditDataOfCarsForm";
import { useGetAllBrands } from "@/main/global/api/restful/userManagmentAPI/BrandManager/BrandQuery";
import { useGetAllTypes } from "@/main/global/api/restful/userManagmentAPI/TypeManager/TypeQuery";
import { useGetAllCarsModels } from "@/main/global/api/restful/userManagmentAPI/carsModelsManager/carsModelsQuery";
import { useGetAllcarsYears } from "@/main/global/api/restful/userManagmentAPI/carsYearManager/carsYearsQuery";
import { useGetAllEngines } from "@/main/global/api/restful/userManagmentAPI/EngineManager/EngineQuery";
import TextEditor from "@/main/common/components/TForm/TextEditor/TextEditor";
interface CarInformationFormProps {
  form: FormType;
}

export default function CarInformationForm({ form }: CarInformationFormProps) {
  const { data: CarBrandsData } = useGetAllBrands();
  const carBrands =
    CarBrandsData?.data?.map((item) => {
      return {
        value: item.brandId,
        label: item.brandName,
      };
    }) || [];
  const { data: CarTypesData } = useGetAllTypes();
  const carTypes =
    CarTypesData?.data?.map((item) => {
      return {
        value: item.typeId,
        label: item.arabicName,
      };
    }) || [];
  const { data: CarModelsData } = useGetAllCarsModels({});
  const carModels =
    CarModelsData?.data?.map((item) => {
      return {
        value: item.carModelId,
        label: item.arabicName,
        brand_id: item.carBrandId,
      };
    }) || [];
  const { data: YearsData } = useGetAllcarsYears({});
  const years =
    YearsData?.data?.map((item) => {
      return {
        value: item.yearId,
        label: item.year,
      };
    }) || [];
  const { data: EnginesData } = useGetAllEngines();
  const engines =
    EnginesData?.data?.map((item) => {
      return {
        value: item.engId,
        label: item.arabicName,
      };
    }) || [];

  return (
    <div dir="rtl" className="flex mt-[12px] justify-center   ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full ">
        {/* Top Section: Car Image */}
        <div className="flex flex-row-reverse items-start  gap-6 mb-8">
          {/* Form Fields */}
          <div className="flex-1 ">
            {/* First Column (Right) */}
            <div className="flex flex-col gap-4">
              <TFormField
                typeField="input"
                form={form}
                type="string"
                name="carName"
                label="الاسم"
                labelInput="الاسم"
              />
              <TFormField
                typeField="input"
                form={form}
                type="string"
                name="carCode"
                label="كود السيارة"
                labelInput="كود السيارة"
              />
              <TFormField
                typeField="input"
                form={form}
                type="string"
                name="plateNumber"
                label="رقم اللوحة"
                labelInput="رقم اللوحة"
              />
            </div>

            {/* Second Column (Left) */}
          </div>
        </div>
        <div className=" flex gap-[16px] items-center mt-[16px]">
          {" "}
          <TReactSelect
            form={form}
            name="brandId"
            label="ماركة السيارة"
            options={carBrands}
          />
          <TReactSelect
            form={form}
            name="modelId"
            label="موديل السيارة"
            options={carModels.filter(
              (item) => item.brand_id === form.watch("brandId")
            )}
          />
          <TReactSelect
            form={form}
            name="yearId"
            label="سنة الصنع"
            options={years}
          />
        </div>{" "}
        <div className=" flex gap-[16px] items-center mt-[16px]">
          {" "}
          <TFormField
            typeField="input"
            form={form}
            type="number"
            name="numberOfDoors"
            label="عدد الأبواب"
            labelInput="عدد الأبواب"
            fromItemClassName=""
          />
          <TReactSelect
            form={form}
            name="typeId"
            label="نوع السيارة"
            options={carTypes}
          />
          <TReactSelect
            form={form}
            name="engineId"
            label="المحرك"
            options={engines}
          />{" "}
        </div>
        {/* Air Conditioned Checkbox */}
        <div className="flex w-full  items-end gap-4">
          <div className=" flex-1">
            <TFormField
              className="h-[48px]"
              type="number"
              form={form}
              name="numberOfPassengers"
              label="عدد الركاب"
            />
          </div>
          <div
            onClick={() =>
              form.setValue("airCondition", !form.getValues("airCondition"))
            }
            className="flex flex-1 border px-4 h-[48px] rounded-[8px] items-center gap-2 mt-4 cursor-pointer"
          >
            <input
              type="checkbox"
              id="airConditioned"
              className="form-checkbox accent-[#CE931A] c"
              checked={form.watch("airCondition")}
              onChange={() =>
                form.setValue("airCondition", !form.getValues("airCondition"))
              }
            />
            <label
              htmlFor="airConditioned"
              className="flex items-center gap-1 font-medium"
            >
              مكيفة
            </label>
          </div>
          <div
            onClick={() =>
              form.setValue("showHome", !form.getValues("showHome"))
            }
            className="flex flex-1 border px-4 h-[48px] rounded-[8px] items-center gap-2 mt-4 cursor-pointer"
          >
            <input
              type="checkbox"
              id="showOnHomepage"
              className="form-checkbox accent-[#CE931A] checked:!bg-[#CE931A] checked:!border-[#CE931A] checked:!text-white"
              checked={form.watch("showHome")}
              onChange={() =>
                form.setValue("showHome", !form.getValues("showHome"))
              }
            />
            <label htmlFor="showOnHomepage" className="font-medium">
              إظهار السيارة في الصفحة الرئيسية
            </label>
          </div>{" "}
        </div>{" "}
        <div className=" flex  gap-4 mt-4">
          <TextEditor
            form={form}
            name="detailsEnglish"
            placeholder={"-"}
            label={" تفاصيل السيارة"}
            // readOnly={type === "view"}
          />
          <TextEditor
            form={form}
            name="detailsArabic"
            placeholder={"-"}
            label={" تفاصيل السيارة بالعربية"}
            // readOnly={type === "view"}
          />
        </div>
      </div>
    </div>
  );
}
