import { useTranslation } from "react-i18next";

function NoNotification() {
  const { t } = useTranslation("navbar");

  return (
    <p className="p-2 text-center text-sm">
      {t("navbar.notifications.noNotification")}
    </p>
  );
}

export default NoNotification;
