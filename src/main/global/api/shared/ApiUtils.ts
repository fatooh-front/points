//i18nUtils.ts
import { i18n as I18nType } from "i18next";

import { toast } from "@/components/ui/use-toast";

import { successMessages } from "./apiMessages";
import { HttpMethodMudation } from "./ApiTypes";

// HttpMethodEnum.ts

export function messageApiInLang(message: string | null) {
  if (message?.includes("*#*"))
    return localStorage.getItem("i18nextLng") === "en"
      ? message?.split("*#*")[0]
      : message?.split("*#*")[1];

  return message;
}

export function getLang() {
  return localStorage.getItem("i18nextLng");
}

export function getLangHeader(
  i18n: I18nType,
  arlang = "ar",
  enlang = "en-US"
): string {
  return i18n.language === "ar" ? arlang : enlang;
}

export const displayToast = (
  variant: "default" | "destructive",
  title: string,
  description: string
) => {
  toast({
    variant,
    color: variant === "destructive" ? "white" : "black",
    title,
    description,
  });
};

// Function to handle success toasts
export const handleSuccessToast = (
  method: HttpMethodMudation,
  config?: any
) => {
  if (config?.skipSuccessToast) return;

  const language = (localStorage.getItem("i18nextLng") as "en" | "ar") || "en";
  const message = successMessages[method][language];

  displayToast("default", message, "");
};
