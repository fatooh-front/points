import { i18n as I18nType } from 'i18next';

export function getLang() {
  return localStorage.getItem("i18nextLng");
}

export function getLangHeader(i18n: I18nType): string {
  return i18n.language === "ar" ? "ar" : "en-US";
}
