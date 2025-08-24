import { Form } from "@/components/ui/form";

import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfCarsForm";
import CarInformationForm from "./blocks/CarInformationForm";
import CarPricesForm from "./blocks/CarPricesForm";
import CarBranchesForm from "./blocks/CarBranchesForm";
import TButton from "@/main/common/components/TForm/TButton";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import CarKmForm from "./blocks/KM";
import { useNavigate } from "react-router-dom";
import TFileField from "@/main/common/components/TForm/TFileField";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const [step, setStep] = useState<string>("1");
  const navigate = useNavigate();

  const { form, onSubmit } = UseAddOrEditDataOfPage({ step, setStep });
  const [file, setFile] = useState<File | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [file4, setFile4] = useState<File | null>(null);

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* العمود الأيسر (الصورة + الأسعار) */}
            <div className=" h-full flex flex-col">
              <div className="flex mb-4 flex-col items-center rounded-lg mt-3 bg-white p-6 min-h-[414px] ">
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
              <CarPricesForm form={form} />
            </div>
            {/* العمود الأيمن (تفاصيل السيارة + الإضافات) */}
            <div className="space-y-4">
              {/* بيانات السيارة */}
              <CarInformationForm form={form}></CarInformationForm>

              {/* الإضافات */}
              <CarKmForm form={form}></CarKmForm>
            </div>

            {/* القسم السفلي - ملخص الدفع */}
            <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow-lg p-8 space-y-4">
              <CarBranchesForm form={form}></CarBranchesForm>
            </div>
          </div>

          <div className="flex gap-4 w-full justify-end mt-6">
            <div
              onClick={() => {
                navigate("/cars");

                form.reset();
              }}
              className="flex cursor-pointer hover:opacity-70  justify-center  text-white rounded-[8px]  items-center bg-[#B4B8BD] gap-2 w-[138px] "
            >
              الغاء
            </div>
            <TButton
              type="submit"
              className="flex items-center  gap-2 w-[138px] "
              // disabled={isPending}
            >
              {/* <Save size={16} /> */}
              الحفظ{" "}
            </TButton>
          </div>
        </form>
      </Form>{" "}
    </div>
  );
};

export default Page;
