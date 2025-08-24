import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

type TranslationResources = Record<string, Record<string, any>>;

// استيراد جميع ملفات الترجمة من مجلد locales
const loadAllLocales = async (): Promise<TranslationResources> => {
  const modules = import.meta.glob<{ default: any }>("/**/locales/*/*.json");

  console.log("modules", modules);
  const resources: TranslationResources = {};

  for (const path in modules) {
    const regex = /locales\/(\w+)\/(\w+)\.json$/;
    const match = regex.exec(path);
    if (match) {
      const [_, lng, ns] = match;
      const module = await modules[path]();

      if (!resources[lng]) resources[lng] = {};
      resources[lng][ns] = module.default;
    }
  }

  return resources;
};

const initializeI18n = async () => {
  const resources = await loadAllLocales();

  // استرجاع اللغة المحفوظة في localStorage
  const savedLanguage = "ar";

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage, // تعيين اللغة المحفوظة
      fallbackLng: "ar",
      supportedLngs: Object.keys(resources), // جعل اللغات المتاحة ديناميكية
      debug: true,
      interpolation: {
        escapeValue: false,
      },
    });
};

initializeI18n();

export default i18n;
