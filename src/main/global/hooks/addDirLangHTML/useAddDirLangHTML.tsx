import { useEffect } from "react";
import { useTranslation } from "react-i18next";
function useAddDirLangHTML() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("lang", i18n.language);
    htmlElement.setAttribute("dir", i18n.dir(i18n.language));
  }, [i18n.language, i18n.dir, i18n]);
  return {};
}

export default useAddDirLangHTML;
