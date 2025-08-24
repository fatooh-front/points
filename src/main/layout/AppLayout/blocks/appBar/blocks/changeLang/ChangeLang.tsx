import { Button } from "@/components/ui/button";
// import { Globe } from "lucide-react";
import icon from "./translation.svg";
import { useTranslation } from "react-i18next";
import useChangeLang from "./hooks/useChangeLang";

function ChangeLang() {
  const { t } = useTranslation("navbar");
  const { changeWebsiteLanguage } = useChangeLang();
  return (
    <Button
      type="button"
      role="button"
      variant="link"
      className="p-0 h-fit"
      onClick={changeWebsiteLanguage}
      title={t("navbar.changeLanguage")}
    >
      {" "}
      <img src={icon} className="h-[25px]  text-gray-500"></img>
      {/* <Globe className="h-5 w-5 text-gray-500" /> */}
    </Button>
  );
}

export default ChangeLang;
