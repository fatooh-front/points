import { useTranslation } from "react-i18next";

function useChangeLang() {
  const { i18n } = useTranslation("navbar");

  const changeWebsiteLanguage = () => {
    const currentLanguage = localStorage.getItem("i18nextLng");
    if (currentLanguage === "ar") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ar");
    }
  };

  return { changeWebsiteLanguage };
}

export default useChangeLang;
