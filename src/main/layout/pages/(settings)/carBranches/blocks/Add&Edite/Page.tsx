import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";

import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { useGetAllCity } from "@/main/global/api/restful/userManagmentAPI/CityManager/CityQuery";
import hundelLoclize from "@/main/global/utils/hundelLoclize";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import { useNavigate } from "react-router-dom";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit } = UseAddOrEditDataOfPage({});
  const { data: DataOfCity } = useGetAllCity();

  const navigate = useNavigate();
  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full mx-auto"
        >
          <div className="flex  md:h-full  w-full mx-auto overflow-hidden rounded-lg shadow-lg  bg-white">
            <div className="relative w-full px-6 py-4 md:px-8">
              <div className="flex flex-col gap-2 md:gap-3 mt-4">
                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                  <TFormField
                    typeField="input"
                    form={form}
                    type="string"
                    name="branchName"
                    label={t("CarBranch.form.branchName")}
                    labelInput={t("CarBranch.form.branchName")}
                  />
                  <TFormField
                    typeField="input"
                    form={form}
                    type="string"
                    name="branchArName"
                    label={t("CarBranch.form.branchArName")}
                    labelInput={t("CarBranch.form.branchArName")}
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                  <TFormField
                    typeField="input"
                    form={form}
                    type="string"
                    name="mobile"
                    label={t("CarBranch.form.mobile")}
                    labelInput={t("CarBranch.form.mobile")}
                  />
                  <TFormField
                    typeField="input"
                    form={form}
                    type="string"
                    name="phone1"
                    label={t("CarBranch.form.phone1")}
                    labelInput={t("CarBranch.form.phone1")}
                  />
                  <TFormField
                    typeField="input"
                    form={form}
                    type="number"
                    name="phone2"
                    label={t("CarBranch.form.phone2")}
                    labelInput={t("CarBranch.form.phone2")}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                  <TFormField
                    typeField="input"
                    form={form}
                    type="string"
                    name="workingHoures"
                    label={t("CarBranch.form.workingHoures")}
                    labelInput={t("CarBranch.form.workingHoures")}
                  />
                  <TFormField
                    typeField="input"
                    form={form}
                    type="email"
                    name="email"
                    label={t("CarBranch.form.email")}
                    labelInput={t("CarBranch.form.email")}
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                  <TFormField
                    typeField="input"
                    form={form}
                    type="string"
                    name="addressArabic"
                    label={" العنوان بالعربية"}
                    labelInput={" العنوان بالعربية"}
                  />
                  <TFormField
                    typeField="input"
                    form={form}
                    type="string"
                    name="addressEnglish"
                    label={" العنوان بالانجليزية"}
                    labelInput={" العنوان بالانجليزية"}
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                  <TReactSelect
                    key={`cityId`}
                    form={form}
                    name={"cityId"}
                    label={t("CarBranch.form.cityId")}
                    options={
                      DataOfCity?.data?.map((item) => {
                        return {
                          value: item.id,
                          label: hundelLoclize([item.nameAr, item.name]),
                        };
                      }) || []
                    }
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                  <TFormField
                    typeField="input"
                    form={form}
                    type="number"
                    name="latitude"
                    label={t("CarBranch.form.latitude")}
                    labelInput={t("CarBranch.form.latitude")}
                  />
                  <TFormField
                    typeField="input"
                    form={form}
                    type="number"
                    name="longitude"
                    label={t("CarBranch.form.longitude")}
                    labelInput={t("CarBranch.form.longitude")}
                  />
                </div>
              </div>
              <div className="mt-2"></div>{" "}
            </div>
          </div>{" "}
          <div className="flex w-full justify-end mt-6">
            {" "}
            <TButton
              type="reset"
              onClick={() => {
                form.reset();
                navigate("/settings/branches");
              }}
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
      </Form>{" "}
    </div>
  );
};

export default Page;
