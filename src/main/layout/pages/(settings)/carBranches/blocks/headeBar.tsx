import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function HeadeBar() {
  const { t } = useTranslation("CarBranch");

  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-end md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      <Link to={"/settings/branches/add"}>
        <Button
          type="button"
          className={cn(
            " lg:flex  shadow-xl font-normal text-sm h-[48px]  gap-2 hover:opacity-70 w-full sm:w-fit"
          )}
        >
          + {t("CarBranch.form.addText")}
        </Button>{" "}
      </Link>
    </div>
  );
}
