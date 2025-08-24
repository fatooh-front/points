import ErrorPage from "@/main/common/components/ErrorPage/ErrorPage";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation("notFound");
  return <ErrorPage statusCode={404} message={t("notFound.message")} />;
}
