import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Blog } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteTypes";
import {
  useAddBlog,
  useGetBlog,
} from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteQuery";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const blogSchema = z.object({
  createdAt: z.any(),
  blogId: z.any(),
  title: z.string().min(1, "العنوان مطلوب"),
  slug: z.string().min(1, "الرابط (Slug) مطلوب"),
  shortText: z.string().min(1, "النص المختصر مطلوب"),
  content: z.string().min(1, "المحتوى مطلوب"),
  author: z.string().min(1, "اسم الكاتب مطلوب"),
  image: z.string().min(1, "رابط الصورة مطلوب"),
  metaTitle: z.string().min(1, "Meta Title مطلوب"),
  metaDescription: z.string().min(1, "Meta Description مطلوب"),
  metaKeywords: z.string().min(1, "Meta Keywords مطلوب"),
  tags: z.string().min(1, "الكلمات المفتاحية (Tags) مطلوبة"),
  status: z.number({ required_error: "الحالة مطلوبة" }),
  notes: z.string().min(1, "الملاحظات مطلوبة"),
  publishedAt: z.union([
    z.string({ required_error: "تاريخ النشر مطلوب" }),
    z.date({ required_error: "تاريخ النشر مطلوب" }),
  ]),
});

export const useAddOrEditBlog = () => {
  const router = useNavigate();
  const { id } = useParams();
  const form = useForm<Blog>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      shortText: "",
      content: "",
      author: "",
      image: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      tags: [],
      status: 0,
      notes: "",
      publishedAt: null,
    },
  });

  const addBlogMutation = useAddBlog();
  const blogData = useGetBlog(id);

  // لو تعديل نحط القيم القديمة
  React.useEffect(() => {
    if (blogData.data?.data) {
      console.log("blogData.data.data", blogData.data.data);

      form.reset(blogData.data.data);
    }
  }, [blogData.data]);

  const onSubmit = (data: Blog) => {
    addBlogMutation.mutate(data, {
      onSuccess: () => {
        router("/website/blog");
      },
    });
  };

  return { form, onSubmit, blogData, addBlogMutation };
};
