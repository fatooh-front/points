import { useState } from "react";
import TFormField from "@/main/common/components/TForm/TFormField";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import type { FormType } from "../hooks/UseAddOrEditDataOfCarsForm";
import { ImagePlus } from "lucide-react";
import { useGetAllBrands } from "@/main/global/api/restful/userManagmentAPI/BrandManager/BrandQuery";
import { useGetAllTypes } from "@/main/global/api/restful/userManagmentAPI/TypeManager/TypeQuery";
import { useGetAllCarsModels } from "@/main/global/api/restful/userManagmentAPI/carsModelsManager/carsModelsQuery";
import { useGetAllcarsYears } from "@/main/global/api/restful/userManagmentAPI/carsYearManager/carsYearsQuery";
import { useGetAllEngines } from "@/main/global/api/restful/userManagmentAPI/EngineManager/EngineQuery";
import TFileField from "@/main/common/components/TForm/TFileField";
import TextEditor from "@/main/common/components/TForm/TextEditor/TextEditor";

interface CarInformationFormProps {
  form: FormType;
}

export default function CarInformationForm({ form }: CarInformationFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [file4, setFile4] = useState<File | null>(null);
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
        <div className="flex flex-row-reverse  items-start  gap-10 mb-8">
          <div className="flex flex-col my-auto  items-center flex-1 border-s-4 ps-10 ">
            <label className="mb-2 font-semibold text-gray-700">
              صورة السيارة
            </label>
            <TFileField
              form={form}
              name={"image"}
              type={"image"}
              file={file}
              setFile={setFile}
              rounded={"full"}
              imgeArea={
                <div className="relative  border-3    w-full h-full rounded-lg overflow-hidden border-none bg-white flex items-center justify-center">
                  <ImagePlus className="w-[70px] h-[70px]" />
                </div>
              }
              // labelDrag={}
              // labelReplace={t("banners.dialog.add.changeImage")}
              classNameLayout={"w-full h-full"}
              classNameRootProps={
                "relative w-full min-h-[214px] bg-white rounded-lg flex items-center justify-center border-none "
              }
              containerClassName={
                "relative w-full min-h-[214px] bg-white rounded-lg flex items-center justify-center border-[3px] bg-white  border-dashed border-gray-400"
              }
            />{" "}
            <div className=" flex mt-[26px] gap-4 w-full">
              <TFileField
                form={form}
                name={"images[0]"}
                type={"image"}
                file={file1}
                setFile={setFile1}
                rounded={"full"}
                imgeArea={
                  <div className="relative  border-3    w-full h-full rounded-lg overflow-hidden border-none bg-white flex items-center justify-center">
                    <ImagePlus />
                  </div>
                }
                // labelDrag={}
                // labelReplace={t("banners.dialog.add.changeImage")}
                classNameLayout={" aspect-[551/232] flex-1"}
                classNameRootProps={
                  "relative aspect-[551/232] flex-1 bg-gray-200  rounded-lg flex items-center justify-center border-none border-gray-400"
                }
                containerClassName={
                  "relative aspect-[551/232] flex-1 bg-gray-200 rounded-lg flex items-center border-[3px] bg-white   justify-center    border-dashed border-gray-400"
                }
              />{" "}
              <TFileField
                form={form}
                name={"images[1]"}
                type={"image"}
                file={file2}
                setFile={setFile2}
                rounded={"full"}
                imgeArea={
                  <div className="relative  border-3    w-full h-full rounded-lg overflow-hidden border-none bg-white flex items-center justify-center">
                    <ImagePlus />
                  </div>
                }
                // labelDrag={}
                // labelReplace={t("banners.dialog.add.changeImage")}
                classNameLayout={" aspect-[551/232] flex-1"}
                classNameRootProps={
                  "relative aspect-[551/232] flex-1 bg-gray-200  rounded-lg flex items-center justify-center border-none border-gray-400"
                }
                containerClassName={
                  "relative aspect-[551/232] flex-1 bg-gray-200 rounded-lg flex items-center border-[3px] bg-white   justify-center    border-dashed border-gray-400"
                }
              />{" "}
              <TFileField
                form={form}
                name={"images[2]"}
                type={"image"}
                file={file3}
                setFile={setFile3}
                rounded={"full"}
                imgeArea={
                  <div className="relative  border-3    w-full h-full rounded-lg overflow-hidden border-none bg-white flex items-center justify-center">
                    <ImagePlus />
                  </div>
                }
                // labelDrag={}
                // labelReplace={t("banners.dialog.add.changeImage")}
                classNameLayout={" aspect-[551/232] flex-1"}
                classNameRootProps={
                  "relative aspect-[551/232] flex-1 bg-gray-200  rounded-lg flex items-center justify-center border-none border-gray-400"
                }
                containerClassName={
                  "relative aspect-[551/232] flex-1 bg-gray-200 rounded-lg flex items-center border-[3px] bg-white   justify-center    border-dashed border-gray-400"
                }
              />{" "}
              <TFileField
                form={form}
                name={"images[3]"}
                type={"image"}
                file={file4}
                setFile={setFile4}
                rounded={"full"}
                imgeArea={
                  <div className="relative  border-3    w-full h-full rounded-lg overflow-hidden border-none bg-white flex items-center justify-center">
                    <ImagePlus />
                  </div>
                }
                // labelDrag={}
                // labelReplace={t("banners.dialog.add.changeImage")}
                classNameLayout={" aspect-[551/232] flex-1"}
                classNameRootProps={
                  "relative aspect-[551/232] flex-1 bg-gray-200  rounded-lg flex items-center justify-center border-none border-gray-400"
                }
                containerClassName={
                  "relative aspect-[551/232] flex-1 bg-gray-200 rounded-lg flex items-center border-[3px] bg-white   justify-center    border-dashed border-gray-400"
                }
              />{" "}
            </div>
          </div>
          {/* Form Fields */}
          <div className="flex-[1.5]">
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
            </div>

            {/* Second Column (Left) */}
          </div>
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
            placeholder={" تفاصيل السيارة"}
            label={" تفاصيل السيارة"}
            // readOnly={type === "view"}
          />
          <TextEditor
            form={form}
            name="detailsArabic"
            placeholder={" تفاصيل السيارة بالعربية"}
            label={" تفاصيل السيارة بالعربية"}
            // readOnly={type === "view"}
          />
        </div>
      </div>
    </div>
  );
}
