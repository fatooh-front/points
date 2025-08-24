import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Page = () => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit } = UseAddOrEditDataOfPage({});
  const { page } = useParams();
  const navigate = useNavigate();
  const pagesTitle = [
    "الرئيسية",
    "العروض",
    "الفروع",
    "المدونة",
    "الوظائف المتاحة",
    "تواصل شروط الإستخدام",
    "تواصل معنا",
    "سياسة الخصوصية",
    "شروط الإلغاء",
    "من نحن",
  ];
  useEffect(() => {
    if (!page || !pagesTitle.includes(page))
      navigate("/website/search-engines");
  }, []);
  return (
    <div className="box-border w-full flex items-center  flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex flex-col w-full gap-4  mx-auto rounded-lg shadow-lg p-6 bg-white">
            {/* Row 0: Membership Card Image */}
            <TFormField
              labelClassName="text-base"
              typeField="input"
              type="string"
              form={form}
              className="h-[56px] font-bold border bg-[#D0DADE]"
              readOnly={true}
              name="membershipName"
              label="اسم الصفحة"
              placeholder={page}
            />
            <TFormField
              labelClassName="text-base"
              typeField="input"
              type="number"
              form={form}
              className="h-[56px] "
              name="membershipStart"
              label=" Meta Title"
              placeholder="0"
              suffix="ر.س"
            />
            <TFormField
              labelClassName="text-base"
              typeField="input"
              type="number"
              form={form}
              className="h-[56px]"
              name="membershipEnd"
              label="  Meta Description"
              placeholder="10000"
              suffix="ر.س"
            />
            <TFormField
              labelClassName="text-base"
              typeField="input"
              type="number"
              form={form}
              className="h-[56px]"
              name="membershipEnd"
              label=" Meta Keywords"
              placeholder="10000"
              suffix="ر.س"
            />
          </div>

          {/* Submit Button */}
          <div className="flex w-full justify-end mt-6">
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
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
