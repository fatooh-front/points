import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSettingsStore from "@/main/global/store/settings/useSettingsStore";
import LogoIMG from "@/main/global/assets/logo/logo.svg";
function Logo() {
  const navigate = useNavigate();
  // const { t } = useTranslation("navbar");
  const { t: Tlicenses } = useTranslation("licenses");

  const getSettingsByName = useSettingsStore(
    (store) => store.getSettingsByName
  );

  return (
    <div
      className={`sticky justify-center flex items-center gap-2 w-maxsidebar   cursor-pointer `}
      onClick={() => navigate("/")}
    >
      <div className="flex justify-center mx-auto">
        <img
          className="w-[237px] h-auto "
          src={getSettingsByName("portal")?.logo || LogoIMG}
          alt=""
        />
      </div>
      {/* <p className="text-primary text-2xl font-bold text-center">LIMS</p> */}
      <p className="text-sm text-primary-600 h-full flex items-center font-semibold">
        {/* {t("navbar.logo.text")} */}
        {Tlicenses(getSettingsByName("portal")?.name)}
      </p>
      {/* <img
        className="block h-full"
        src={logoTextImg}
        alt="User Management logo"
      /> */}
    </div>
  );
}

export default Logo;
