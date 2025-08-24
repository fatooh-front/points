import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

function DevelopBadge() {
  const { t } = useTranslation("navbar");

  return (
    <Badge className="bg-primary-500 py-2 rounded-md">
      {t("navbar.underDevelopment")}
    </Badge>
  );
}

export default DevelopBadge;
