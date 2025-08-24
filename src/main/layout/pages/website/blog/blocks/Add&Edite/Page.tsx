import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import TextEditor from "@/main/common/components/TForm/TextEditor/TextEditor";
import { DatePicker } from "@/components/ui/date_picker";
import { useAddOrEditBlog } from "./hooks/UseAddOrEditDataOfPage";
import { useNavigate } from "react-router-dom";
import TFileField from "@/main/common/components/TForm/TFileField";
import { useState } from "react";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";

const Page = ({ type = "add" }: { type?: string }) => {
  const { t } = useTranslation("Blog");
  const [fileAr, setFileAr] = useState<any>(null);
  const { form, onSubmit } = useAddOrEditBlog();
  const router = useNavigate();

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full mx-auto rounded-lg shadow-lg p-6 bg-white">
            <div className="flex flex-col md:flex-row w-full gap-10 mb-4">
              <div className="flex-1 flex flex-col gap-4">
                {/* Title & Slug */}
                <div className="flex gap-4">
                  <div className=" flex-1">
                    <div className="flex flex-col gap-4">
                      <TFormField
                        className="h-[56px]"
                        typeField="input"
                        type="string"
                        form={form}
                        name="title"
                        label="العنوان"
                        placeholder="عنوان المدونة"
                      />
                      <TFormField
                        className="h-[56px]"
                        typeField="input"
                        type="string"
                        form={form}
                        name="slug"
                        label="الرابط (Slug)"
                        placeholder="blog-title"
                      />
                    </div>

                    {/* Short Text & Author */}
                    <div className=" flex flex-col mt-4 gap-4">
                      <TFormField
                        className="h-[56px]"
                        typeField="input"
                        type="string"
                        form={form}
                        name="shortText"
                        label="النص المختصر"
                        placeholder="ملخص المدونة"
                      />
                      <TFormField
                        className="h-[56px]"
                        typeField="input"
                        type="string"
                        form={form}
                        name="author"
                        label="الكاتب"
                        placeholder="اسم الكاتب"
                      />
                    </div>
                  </div>
                  <div className="w-[320px]  my-auto mx-7">
                    <TFileField
                      form={form}
                      name={"image"}
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
                          <span className="text-gray-400">[ الصور ]</span>
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
                    {/* Short Text & Author */}
                    <TFormField
                      typeField="input"
                      type="string"
                      form={form}
                      name="notes"
                      className="w-full mt-3"
                      label=""
                      placeholder=" وصف مختصر للصوره ( ALT )"
                    />
                  </div>
                </div>
                {/* Tags & Status */}
                <div className="flex gap-4">
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="tags"
                    label="الكلمات المفتاحية (Tags)"
                    placeholder="tag1, tag2"
                  />
                  <TReactSelect
                    className=" !h-[56px]"
                    labelClassName=""
                    typeField="select"
                    form={form}
                    name="status"
                    label="الحالة"
                    options={[
                      { label: "منشورة", value: 1 },
                      { label: "غير منشورة", value: 0 },
                    ]}
                    placeholder="اختر الحالة"
                  />
                </div>

                {/* SEO */}
                <div className="border rounded-lg p-4 bg-gray-50 mt-2">
                  <div className="font-semibold mb-2 text-gray-700">SEO</div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <TFormField
                      className="h-[56px]"
                      typeField="input"
                      type="string"
                      form={form}
                      name="metaTitle"
                      label="Meta Title"
                      placeholder="عنوان SEO"
                    />
                    <TFormField
                      className="h-[56px]"
                      typeField="input"
                      type="string"
                      form={form}
                      name="metaDescription"
                      label="Meta Description"
                      placeholder="وصف SEO"
                    />
                    <TFormField
                      className="h-[56px]"
                      typeField="input"
                      type="string"
                      form={form}
                      name="metaKeywords"
                      label="Meta Keywords"
                      placeholder="كلمات مفتاحية"
                    />
                  </div>
                </div>

                {/* Publish Date */}
                <DatePicker
                  form={form}
                  name="publishedAt"
                  className="h-[56px]"
                  label="تاريخ النشر"
                  placeholder="14/04/2025"
                />

                {/* Content */}
                <TextEditor
                  form={form}
                  name="content"
                  placeholder="المحتوى"
                  label="المحتوى"
                  readOnly={type === "view"}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full justify-end mt-6">
            <TButton
              type="reset"
              onClick={() => {
                router("/website/blog");

                form.reset();
              }}
              className="flex items-center mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
            >
              إلغاء
            </TButton>
            <TButton
              type="submit"
              className="flex items-center gap-2 w-[138px]"
            >
              <Save size={16} />
              <p>{t("حفظ")}</p>
            </TButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
