import { getLang } from "./i18nUtils";

const hundelLoclize = (key: [ar: string, en: string]) => {
  const lang = getLang();
  return lang === "ar" ? key[0] : key[1];
};

export default hundelLoclize;
