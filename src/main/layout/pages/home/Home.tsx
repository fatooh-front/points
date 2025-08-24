import usePageHeader from "@/main/common/hooks/pageHeader/usePageHeader";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("home");
  const { firstWord, otherWords } = usePageHeader({ title: t("home.title") });
  return (
    <div className="flex flex-col gap-20 h-100dvh-106px w-full justify-center items-center">
      <div className="flex flex-col gap-5 md:gap-10">
        <h1
          className={`text-3xl md:text-4xl lg:text-7xl font-bold text-center ${
            otherWords ? "text--customGray" : "text-primary"
          }`}
        >
          {firstWord + " "}
          <span className="text-primary">{otherWords}</span>
        </h1>
        <p className="text-center text-secondry-600 text-2xl md:text-3xl lg:text-5xl">
          {t("home.subtitle")}
        </p>
      </div>
    </div>
  );
}
