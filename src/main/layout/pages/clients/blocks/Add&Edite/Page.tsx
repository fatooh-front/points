import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";

import { useState } from "react";
import CustomChechBox from "./../../../../../../components/ui/custom_chech_box";
import TFileField from "@/main/common/components/TForm/TFileField";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const { form, onSubmit } = UseAddOrEditDataOfPage({});

  return (
    <div
      onClick={() => console.log(form.control._formState.errors)}
      className="flex justify-center items-start min-h-screen "
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-lg w-full  p-8"
        >
          {/* Profile Image and Name */}
          <div className="flex flex-col items-center mb-8">
            <TFileField
              readOnly={true}
              form={form}
              name={"image"}
              type={"image"}
              file={file}
              setFile={setFile}
              rounded={"full"}
              label={""}
              classNameRootProps={"p-1"}
              containerClassName={"w-[100px] h-[100px]"}
            />
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <TFormField
                readOnly={true}
                className={"bg-[#EFEFEF]"}
                typeField="input"
                form={form}
                type="string"
                name="firstName"
                label={"الاسم الأول"}
                labelInput={"الاسم الأول"}
              />
              <TFormField
                readOnly={true}
                className={"bg-[#EFEFEF]"}
                typeField="input"
                form={form}
                type="string"
                name="lastName"
                label={"اسم العائلة"}
                labelInput={"اسم العائلة"}
              />
              <TFormField
                readOnly={true}
                className={"bg-[#EFEFEF]"}
                typeField="input"
                form={form}
                type="string"
                name="mobile"
                label={"الجوال"}
                labelInput={"الجوال"}
              />
              <TFormField
                readOnly={true}
                className={"bg-[#EFEFEF]"}
                typeField="input"
                form={form}
                type="string"
                name="email"
                label={"البريد الإلكتروني"}
                labelInput={"البريد الإلكتروني"}
              />
            </div>
            <TFormField
              readOnly={true}
              className={"bg-[#EFEFEF]"}
              key={`gender`}
              form={form}
              name={"gender"}
              label={"النوع"}
            />
            <TFormField
              readOnly={true}
              className={"bg-[#EFEFEF]"}
              form={form}
              placeholder="من فضلك ادخل تاريخ الميلاد"
              name="birthdate"
              label={"تاريخ الميلاد"}
            />
            <div className=" col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              <TFormField
                readOnly={true}
                className={"bg-[#EFEFEF]"}
                key={`clientType`}
                form={form}
                name={"clientType"}
                label={" نوع الهوية"}
              />
              <TFormField
                readOnly={true}
                className={"bg-[#EFEFEF]"}
                key={`nationality`}
                form={form}
                name={"nationality"}
                label={"الجنسية"}
              />
              <TFormField
                readOnly={true}
                className={"bg-[#EFEFEF]"}
                typeField="input"
                form={form}
                type="string"
                name="nationalId"
                label={"رقم الهوية / الجواز"}
                labelInput={"رقم الهوية / الجواز"}
              />
            </div>
            <TFormField
              readOnly={true}
              className={"bg-[#EFEFEF]"}
              key={`cityName`}
              form={form}
              name={"cityName"}
              label={"المدينة"}
            />
            <TFormField
              readOnly={true}
              className={"bg-[#EFEFEF]"}
              typeField="address"
              form={form}
              type="string"
              name="address"
              label={"العنوان"}
              placeholder="من فضلك ادخل العنوان"
              labelInput={"العنوان"}
            />
            <TFormField
              readOnly={true}
              className={"bg-[#EFEFEF]"}
              form={form}
              placeholder="من فضلك ادخل تاريخ انتهاء الرخصة"
              name="licenseExpiration"
              label={"تاريخ انتهاء الرخصة"}
            />
            <TFormField
              readOnly={true}
              className={"bg-[#EFEFEF]"}
              key={`membership`}
              form={form}
              name={"membership"}
              label={"العضوية"}
            />
            <div className=" col-span-2">
              <CustomChechBox name={"clientStatus"} form={form} label="فعال" />
            </div>
          </div>

          {/* Status and Save Button */}
          {/* <div className="flex justify-end items-center mt-8">
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
