import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { useAddOrEditBanner } from "./hooks/UseAddOrEditDataOfPage";
import { useGetCarbyName } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";
import { useState } from "react";
import MultiSearch from "@/components/MultiSearch";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import TFileField from "@/main/common/components/TForm/TFileField";
import { useGetAllOffers } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteQuery";
import { useNavigate } from "react-router-dom";
import { Offer } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteTypes";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileAr, setFileAr] = useState<File | null>(null);
  const navigate = useNavigate();

  const { t } = useTranslation("CarBranch");
  const { form, onSubmit, CarNameSearchKey, setCarNameSearchKey, isPending } =
    useAddOrEditBanner();
  const { data: dataCar } = useGetCarbyName(
    {
      page: 1,
      size: 10,
      name: CarNameSearchKey,
    },
    CarNameSearchKey.length > 2
  );
  const { data: dataOffers } = useGetAllOffers({});
  console.log(dataOffers);

  const OffersList =
    dataOffers?.data?.content?.map((item: Offer) => ({
      value: item.offerId?.toString(),
      label: `${item.title}`,
    })) || [];
  return (
    <div
      onClick={() => console.log(form.formState.errors)}
      className="box-border w-full flex items-center  flex-col min-h-dvh-64px"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mx-auto "
        >
          <div className="w-full  mx-auto rounded-lg shadow-lg p-6 bg-white">
            {" "}
            <div className="flex  ">
              <div className="flex flex-col w-full gap-4">
                <div className="flex gap-4 items-end">
                  <div className="flex-1"></div>
                </div>
                <div className=" flex-1">
                  <div className=" flex-1 mb-4">
                    <TReactSelect
                      name="objType"
                      form={form}
                      label="النوع"
                      options={[
                        { value: 1, label: "سيارة" },
                        { value: 2, label: "العرض" },
                      ]}
                    />
                  </div>{" "}
                  <MultiSearch
                    className="flex-1"
                    onSearch={(Value) => form.setValue("objId", Value.objId)}
                    // key={data?.content?.length}
                    searchsData={[
                      {
                        minWidth: "100%",

                        inputDefaultValue: CarNameSearchKey,
                        onChange: (value: string) => setCarNameSearchKey(value),
                        options:
                          form.watch("objType") === 1
                            ? dataCar?.map((item: any) => ({
                                value: item.id.toString(),
                                label: `${item.carName}`,
                              }))
                            : OffersList,
                        name: "objId",
                        title:
                          form.watch("objType") === 1
                            ? "  البحث باسم السيارة"
                            : "اسم العرض",
                      },
                    ]}
                  />{" "}
                  {form?.formState?.errors?.objId?.message && (
                    <p className="text-red-500">
                      {form.watch("objType") === 1
                        ? " السيارة مطلوبة"
                        : " العرض مطلوب"}
                    </p>
                  )}
                  <TFormField
                    className="h-[56px]"
                    typeField="input"
                    label="الاسم"
                    type="string"
                    form={form}
                    name="bannerName"
                    // placeholder="B3"
                  />
                </div>
                <div className="flex justify-between gap-4 items-center">
                  <TFileField
                    form={form}
                    name={"image"}
                    type={"image"}
                    file={file}
                    classNameLayout="mt-7"
                    setFile={setFile}
                    rounded={"full"}
                    imgeArea={
                      <div className="relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                        {/* Replace this div with your image upload logic */}
                        <span className="absolute top-2 left-2 text-xs text-gray-400">
                          المعرض
                        </span>
                        <span className="text-gray-400">
                          [ الصور الانجليزيه]
                        </span>
                      </div>
                    }
                    // labelDrag={}
                    // labelReplace={t("banners.dialog.add.changeImage")}
                    classNameRootProps={
                      "relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400"
                    }
                    containerClassName={
                      "relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400"
                    }
                  />{" "}
                  <TFileField
                    form={form}
                    name={"arabicImage"}
                    type={"image"}
                    file={fileAr}
                    classNameLayout="mt-7"
                    setFile={setFileAr}
                    rounded={"full"}
                    imgeArea={
                      <div className="relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                        {/* Replace this div with your image upload logic */}
                        <span className="absolute top-2 left-2 text-xs text-gray-400">
                          المعرض
                        </span>
                        <span className="text-gray-400">[ الصور العربيه ]</span>
                      </div>
                    }
                    // labelDrag={}
                    // labelReplace={t("banners.dialog.add.changeImage")}
                    classNameRootProps={
                      "relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400"
                    }
                    containerClassName={
                      "relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400"
                    }
                  />{" "}
                </div>
                {/* Title Row */}
                <div className="flex gap-4">
                  {" "}
                  <TFormField
                    className="h-[56px]"
                    typeField="input"
                    label="العنوان"
                    type="string"
                    form={form}
                    name="title"
                    // placeholder="Rent Your Car"
                  />
                  <TFormField
                    className="h-[56px]"
                    typeField="input"
                    label="العنوان بالعربي"
                    type="string"
                    form={form}
                    name="arabicTitle"
                    // placeholder="استاجر سيارتك المثاليه"
                  />
                </div>
                {/* Description Row */}
                <div className="flex gap-4">
                  <TFormField
                    className="h-[56px]"
                    typeField="input"
                    label="الوصف"
                    type="string"
                    form={form}
                    name="englishText"
                    // placeholder="Start Your Trip"
                  />
                  <TFormField
                    className="h-[56px]"
                    typeField="input"
                    label="الوصف بالعربي"
                    type="string"
                    form={form}
                    name="arabicText"
                    // placeholder="ابدأ رحلتك الان"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex w-full justify-end mt-6">
            <TButton
              type="reset"
              onClick={() => {
                navigate("/website/main-images");

                form.reset();
              }}
              className="flex items-center mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
            >
              إلغاء
            </TButton>
            <TButton
              type="submit"
              isPending={isPending}
              className="flex items-center gap-2 w-[138px]"
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
