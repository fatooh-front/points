import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";

import TButton from "@/main/common/components/TForm/TButton";
import { Camera, Save } from "lucide-react";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { UseAddOrEditLimousine } from "./hooks/UseAddOrEditDataOfPage";
import { useRef, useState } from "react";
import { useGetAllBrands } from "@/main/global/api/restful/userManagmentAPI/BrandManager/BrandQuery";
import { useGetAllCarsModels } from "@/main/global/api/restful/userManagmentAPI/carsModelsManager/carsModelsQuery";
import { useGetAllcarsYears } from "@/main/global/api/restful/userManagmentAPI/carsYearManager/carsYearsQuery";
import { useGetAllTypes } from "@/main/global/api/restful/userManagmentAPI/TypeManager/TypeQuery";
import TFileField from "@/main/common/components/TForm/TFileField";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "@/components/ui/Image";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit, isLoading } = UseAddOrEditLimousine();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files?.[0]);

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const { data: TypesData } = useGetAllTypes();
  const Types =
    TypesData?.data?.map((item) => {
      return {
        value: item.typeId,
        label: item.arabicName,
      };
    }) || [];
  const { data: CarsYearsData } = useGetAllcarsYears({});
  const yearsData =
    CarsYearsData?.data?.map((item) => {
      return {
        value: item.yearId,
        label: item.year,
      };
    }) || [];

  const { data: CarBrandsData } = useGetAllBrands();
  const carBrands =
    CarBrandsData?.data?.map((item) => {
      return {
        value: item.brandId,
        label: item.brandName,
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

  function getImageUrl(value: string | undefined) {
    if (!value) return "";
    return value.startsWith("http")
      ? value
      : `${import.meta.env.VITE_FILE_ROOT}/${value}`;
  }
  return (
    <div
      onClick={() => {
        console.log(form.getValues());
        console.log(form.control._formState.errors);
      }}
      className="box-border w-full flex items-center flex-col min-h-dvh-64px "
    >
      {!isLoading ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full mx-auto"
          >
            <div className="flex p-6   md:h-full  w-full mx-auto  rounded-lg shadow-lg  bg-white">
              <div className="flex w-full flex-row-reverse items-start  gap-6 mb-8">
                <div className=" hidden ">
                  <TFileField
                    form={form}
                    name={"image"}
                    type={"image"}
                    file={file}
                    setFile={setFile}
                    rounded={"full"}
                    label={""}
                    // labelDrag={t("banners.dialog.add.dragActive")}
                    // labelReplace={t("banners.dialog.add.changeImage")}
                    classNameRootProps={"p-1"}
                    containerClassName={"w-[100px] h-[100px]"}
                  />{" "}
                </div>
                <div className="flex flex-col items-center w-1/2 ">
                  <label className="mb-2 font-normal text-gray-400 w-full ">
                    صورة السيارة
                  </label>
                  <div className="relative  h-[256px] w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                    <Image
                      src={getImageUrl(
                        form.watch("image") ||
                          "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=400"
                      )}
                      alt="Car"
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-sm font-medium transition hover:bg-opacity-60"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="mb-1" size={22} />
                      المعرض
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                {/* Form Fields */}
                <div className="flex-1 ">
                  {/* First Column (Right) */}
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
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
                    </div>

                    <TReactSelect
                      form={form}
                      name="yearId"
                      className="h-[56px]"
                      label="سنة السيارة"
                      options={yearsData}
                    />
                    <TReactSelect
                      form={form}
                      name="typeId"
                      className="h-[56px]"
                      label="نوع السيارة"
                      options={Types}
                    />
                  </div>

                  {/* Second Column (Left) */}
                </div>
              </div>
            </div>
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
                type="submit"
                className="flex items-center  gap-2 w-[138px] "
                // disabled={isPending}
              >
                <Save size={16} />
                <p> {t("CarBranch.form.save")}</p>
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
