//axiosMessages.ts
import { HttpMethodMudation, LanguageMessages } from "./ApiTypes";

// Messages object to handle different languages
export const messages: LanguageMessages = {
  en: {
    defaultTitle: "Something went wrong",
    genericErrorMessage: "Something went wrong, please try again later.",
    noResponseMessage: "No response from server, please try again later.",
    notAllowedMessage: "You are not allowed to perform this action."
  },
  ar: {
    defaultTitle: "حدث خطأ ما",
    genericErrorMessage: "هناك شئ خاطئ، يرجى المحاولة فى وقت لاحق.",
    noResponseMessage: "لا استجابة من الخادم، يرجى المحاولة مرة أخرى لاحقًا.",
    notAllowedMessage: "ليس لديك الصلاحيات للعمل على هذا الإجراء."
  },
};

export const successMessages: Record<
  HttpMethodMudation,
  Record<"en" | "ar", string>
> = {
  post: {
    en: "Added successfully!",
    ar: "تمت الإضافة بنجاح!",
  },
  put: {
    en: "Updated successfully!",
    ar: "تم التحديث بنجاح!",
  },
  patch: {
    en: "Updated successfully!",
    ar: "تم التحديث بنجاح!",
  },
  delete: {
    en: "Deleted successfully!",
    ar: "تم الحذف بنجاح!",
  },
};
